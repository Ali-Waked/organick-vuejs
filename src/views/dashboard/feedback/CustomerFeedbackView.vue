<template>
  <PageTitle title="Customer Feedbacks" :items />
  <FilterSection
    v-if="!loading"
    v-model:search="filter.search"
    search-label="Search By Customer Name Or Email"
  >
    <template #options>
      <div
        class="d-flex flex-column flex-sm-row align-start align-sm-center gr-4 mt-1 mt-md-3"
      >
        <div class="d-flex align-center">
          <div class="ml-0 ml-sm-6">
            <FilterOption
              :options="status"
              v-model:model-value="filter.is_featured"
              btn-id="is_active"
              btn-label="status"
            />
          </div>
          <SortingButton v-model:sorting-order="filter.sortingOrder" />
        </div>
      </div>
    </template>
  </FilterSection>
  <TableData
    :feedbacks="feedbacks"
    :loading="loading"
    @changeStatus="changeStatusDialog($event)"
    @showFeedback="showFeedbackDialog($event)"
  />
  <NoDataFound v-if="!loading && !feedbacks.length" />
  <ShowCustomerFeedbackDialog
    v-model:dialog="showFeedback.dialog"
    :feedback="showFeedback.data"
  />
  <ChangeStatusAlert
    v-model:dialog="alert.dialog"
    :extra-data="alert.extraData"
    :text="alert.text"
    :title="alert.title"
    @changeStatus="changeStatus($event)"
  />
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import FilterSection from "@/components/dashboard/global/FilterSection.vue";
import SortingButton from "@/components/dashboard/global/SortingButton.vue";
import TableData from "@/components/dashboard/feedback/TableData.vue";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import ChangeStatusAlert from "@/components/dashboard/feedback/ChangeStatusAlert.vue";
import ShowCustomerFeedbackDialog from "@/components/dashboard/feedback/ShowCustomerFeedbackDialog.vue";
import FilterOption from "@/components/dashboard/global/FilterOption.vue";
import { useRoute, useRouter } from "vue-router";
import debounce from "lodash.debounce";
import { onMounted, ref, reactive, onBeforeUnmount, watch, inject } from "vue";
import axiosClient from "@/axiosClient";
import formats from "@/mixins/formats";
import { toLower } from "lodash";

const route = useRoute();
const role = route.params.role;
const feedbacks = ref([]);
const loading = ref(false);
const page = ref(1);
const totalPage = ref(0);
const emitter = inject("emitter");
const alert = reactive({});
const router = useRouter();
const showFeedback = reactive({
  dialog: false,
  data: {},
});
const position = reactive({
  x: 0,
  y: 0,
});
const { capitalizeFirstLetter } = formats();
const filter = reactive({
  search: "",
  is_featured: ["All"],
  sortingOrder: "desc",
});

const status = [
  { value: "All", title: "All" },
  { value: "Feature", title: "Feature" },
  { value: "Not Feature", title: "Not Feature" },
];

const items = [
  {
    title: "Dashboard",
    to: { name: "dashboard", params: { role: role } },
  },
  {
    title: "Customer Feedbacks",
  },
];

watch(
  () => showFeedback.dialog,
  (newVal) => {
    if (!newVal) {
      const query = { ...router.currentRoute.value.query };

      delete query.id;
      delete query.email;

      sessionStorage.setItem("scrollPosition", JSON.stringify(position));
      router.replace({ query });
    }
  }
);

const changeStatusDialog = (feedback) => {
  alert.dialog = true;
  alert.extraData = feedback.id;
  alert.text = `Are you sure you want to change the status of this feedback to <span class=${
    feedback.is_featured ? "text-orange" : "text-green"
  }> ${feedback.is_featured ? "Not Featured" : "Feacherd"}</span>?`;
  alert.title = `Change Status of Feedback`;
};
const changeStatus = async (feedbackId) => {
  console.log("feedbackId", feedbackId);
  emitter.emit("showLoading", true);
  await axiosClient
    .put(`/dashboard/customers-feedback/${feedbackId}/change-status`)
    .then((response) => {
      alert.dialog = false;
      emitter.emit("alert", ["success", "Status Changed Successfully"]);
      feedbacks.value = feedbacks.value.map((feedback) => {
        if (feedback.id === feedbackId) {
          feedback.is_featured = !feedback.is_featured;
        }
        return feedback;
      });
    })
    .catch((error) => {
      emitter.emit("showLoading", false);
      console.error("Error changing status:", error);
    })
    .finally(() => {
      emitter.emit("showLoading", false);
    });
};

const showFeedbackDialog = (feedback) => {
  position.x = window.scrollX;
  position.y = window.scrollY;
  sessionStorage.setItem("scrollPosition", JSON.stringify(position));
  router.replace({
    query: {
      ...router.currentRoute.value.query,
      email: feedback.customer.email,
      id: feedback.id,
    },
  });
  showFeedback.dialog = true;
  showFeedback.data = feedback;
};

const updateRoute = (page) => {
  const query = {};

  if (filter.search) query.search = filter.search;

  if (filter.is_featured[0])
    query.is_featured = filter.is_featured[0].toLowerCase().replace(" ", "_");

  if (filter.sortingOrder) query.sorting_order = filter.sortingOrder;

  if (page && totalPage.value > 1) query.page = page;
  if (route.query.id && route.query.email) {
    query.id = route.query.id;
    query.email = route.query.email;
  }

  router.push({ path: route.path, query: query });
};

const fetchFeedbacks = async () => {
  try {
    const dataFilter = {
      search: filter.search,
      sortingOrder: filter.sortingOrder,
    };
    if (filter.is_featured[0] !== "All") {
      dataFilter.is_featured =
        filter.is_featured[0].toLowerCase() == "feature" ? true : false;
    }
    await axiosClient
      .get(`/dashboard/customers-feedback?filter=${JSON.stringify(dataFilter)}`)
      .then((response) => {
        console.log("response", response.data.data);
        feedbacks.value = response.data.data;
        totalPage.value = response.data.last_page;
        isShowFeedback(feedbacks.value);
      });
  } catch (e) {
    console.log("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};
const debouncedFetch = debounce(async () => {
  await fetchFeedbacks();
  updateRoute(page.value);
}, 750);

watch(
  () => ({ ...filter }),
  async () => {
    emitter.emit("showLoading", true);
    page.value = 1;
    await debouncedFetch();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  debouncedFetch.cancel();
});

const isShowFeedback = (data) => {
  const id = route.query.id;
  const email = route.query.email;
  if (id && email) {
    const feedback = data.find((feed) => String(feed.id) === String(id));
    if (feedback) {
      showFeedbackDialog(feedback);
    }
  }
};

// const getFeedbacks = async () => {
//   emitter.emit("showLoading", true);
//   await fetchFeedbacks();
// };

onMounted(async () => {
  // await getFeedbacks();
  const hasPageNumber = +route.query.page;
  if (!isNaN(hasPageNumber)) {
    page.value = +route.query.page;
  }
  filter.search = route.query.search ?? "";

  filter.is_featured = ["all", "feature", "not_feature"].includes(
    toLower(route.query.is_featured)
  )
    ? [capitalizeFirstLetter(route.query.is_featured)]
    : ["All"];

  filter.sortingOrder = ["desc", "asc"].includes(
    toLower(route.query.sorting_order)
  )
    ? (filter.sortingOrder = route.query.sorting_order)
    : "desc";
});
</script>


<style lang="scss" scoped></style>