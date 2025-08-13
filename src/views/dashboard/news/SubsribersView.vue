<template>
  <PageTitle title="Newsletter Subscribers" :items />
  <div class="subscriber-view">
    <FilterSection
      v-if="!loading"
      v-model:search="filter.search"
      search-label="Search By email"
    >
      <template #options>
        <div
          class="d-flex flex-column flex-sm-row align-start align-sm-center gr-4 mt-1 mt-md-3"
        >
          <div class="ml-0 ml-md-6">
            <FilterOption
              :options="sort_by"
              v-model:model-value="filter.sort_by"
              btn-id="filter_by"
              btn-label="Sort By"
            />
          </div>
          <div class="d-flex align-center">
            <div class="ml-0 ml-sm-6">
              <FilterOption
                :options="status"
                v-model:model-value="filter.status"
                btn-id="is_active"
                btn-label="Status"
              />
            </div>
            <SortingButton v-model:sorting-order="filter.sortingOrder" />
          </div>
        </div>
      </template>
    </FilterSection>
    <TableData
      :subscribers="subscribers"
      :loading="loading"
      @changeStatus="changeStatus($event)"
      @showSubscriber="showSubscriberDialog($event)"
    />
    <NoDataFound v-if="!loading && !subscribers.length" />
    <v-pagination
      v-if="shouldShowPagination"
      v-model="page"
      :length="totalPage"
      @update:model-value="changePage"
      color="#7EB693"
      rounded="circle"
      class="mt-8"
    ></v-pagination>
    <DrawerAlert
      v-model:dialog="changeStatusAlert.dialog"
      :title="changeStatusAlert.title"
      :text="changeStatusAlert.text"
      :extra-data="changeStatusAlert.extraData"
    >
      <template #action="{ extraData }">
        <v-btn
          variant="tonal"
          color="green"
          @click="updateStatus(extraData)"
          append-icon="mdi-sync"
        >
          Change Status
        </v-btn>
      </template>
    </DrawerAlert>
    <ShowSubscriber
      v-model:dialog="showSubscriber.dialog"
      :subscriber="showSubscriber.subscriber"
    />
  </div>
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import FilterSection from "@/components/dashboard/global/FilterSection.vue";
import SortingButton from "@/components/dashboard/global/SortingButton.vue";
import TableData from "@/components/dashboard/news/TableData.vue";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import FilterOption from "@/components/dashboard/global/FilterOption.vue";
import DrawerAlert from "@/components/dashboard/global/DrawerAlert.vue";
import ShowSubscriber from "@/components/dashboard/news/ShowSubscriber.vue";
import { useRoute, useRouter } from "vue-router";
import debounce from "lodash.debounce";
import { toLower } from "lodash";
import formats from "@/mixins/formats";
import { onMounted, ref, reactive, onBeforeUnmount, watch, inject } from "vue";
import axiosClient from "../../../axiosClient";
const route = useRoute();
const role = route.params.role;
const subscribers = ref([]);
const loading = ref(false);
const page = ref(1);
const totalPage = ref(0);
const emitter = inject("emitter");
const dialog = ref(false);
const showSubscriber = reactive({
  dialog: false,
  subscriber: {},
});
const router = useRouter();
const { capitalizeFirstLetter } = formats();
const changeStatusAlert = reactive({
  title: "",
  text: "",
  extraData: {},
  dialog: false,
});

const filter = reactive({
  search: "",
  sort_by: ["Subscribed Date"],
  status: ["All"],
  sortingOrder: "desc",
});

const sort_by = [
  { value: "Email", title: "Email" },
  { value: "Subscribed Date", title: "Subscribed Date" },
];

const status = [
  { value: "All", title: "All" },
  { value: "Subscribed", title: "Subscribed" },
  { value: "Unsubscribed", title: "Unsubscribed" },
];
const items = [
  {
    title: "Dashboard",
    to: { name: "dashboard", params: { role: role } },
  },
  {
    title: "subscribers",
  },
];

const position = reactive({
  x: 0,
  y: 0,
});

const changeStatus = async (subscriber) => {
  changeStatusAlert.dialog = true;
  changeStatusAlert.extraData = subscriber;
  changeStatusAlert.title = `Confirmation Required`;
  changeStatusAlert.text = `<div class="mb-2">Are you sure you want to change the status of subscriber <span class="text-red text-capitalize font-weight-bold text-decoration-underline">${
    subscriber.email
  }</span> to ${
    subscriber.is_subscribed ? "subscribe" : "unsbscribe"
  }?</div>This action is permanent and cannot be undone`;
};

const updateStatus = async (subscriber) => {
  console.log(subscriber);
  emitter.emit("showLoading", true);
  try {
    await axiosClient
      .put(`/dashboard/news/subscribers/${subscriber.id}`, {
        is_subscribed: !subscriber.is_subscribed,
      })
      .then(() => {
        changeStatusAlert.dialog = false;
        getsubscribers();
      });
  } catch (e) {
    console.error(e);
  } finally {
    emitter.emit("showLoading", false);
  }
};
const data = reactive({
  discount: {},
  dialog: false,
});
const showSubscriberDialog = async ({ id }, notify_id = null) => {
  emitter.emit("showLoading", true);
  try {
    await axiosClient
      .get(`/dashboard/news/subscribers/${id}?notify_id=${notify_id}`)
      .then((response) => {
        position.x = window.scrollX;
        position.y = window.scrollY;
        sessionStorage.setItem("scrollPosition", JSON.stringify(position));
        router.replace({
          query: {
            ...router.currentRoute.value.query,
            email: response.data.email,
            id: id,
          },
        });
        showSubscriber.subscriber = response.data;
        showSubscriber.dialog = true;
      });
  } catch (e) {
    console.error(e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

watch(
  () => data.dialog,
  (newVal) => {
    if (!newVal) {
      const query = { ...router.currentRoute.value.query };

      delete query.id;
      delete query.name;

      sessionStorage.setItem("scrollPosition", JSON.stringify(position));
      router.replace({ query });
    }
  }
);

const updateRoute = (page) => {
  const query = {};

  if (filter.search) query.search = filter.search;

  if (filter.sort_by[0])
    query.sort_by = filter.sort_by[0].toLowerCase().replace(" ", "_");

  if (filter.status[0]) query.status = filter.status[0].toLowerCase();

  if (filter.sortingOrder) query.sorting_order = filter.sortingOrder;

  if (route.query.id && route.query.email) {
    query.id = route.query.id;
    query.email = route.query.email;
  }

  if (page && totalPage.value > 1) query.page = page;

  router.push({ path: route.path, query: query });
};

const fetchsubscribers = async () => {
  try {
    const dataFilter = JSON.stringify({
      search: filter.search,
      status: filter.status[0],
      sort_by: filter.sort_by[0] == "email" ? "email" : "created_at",
      sortingOrder: filter.sortingOrder,
    });
    await axiosClient
      .get(`/dashboard/news/subscribers?filter=${dataFilter}`)
      .then((response) => {
        subscribers.value = response.data.data;
        totalPage.value = response.data.last_page;
        isShowSubscriber();
      });
  } catch (e) {
    console.log("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};
const debouncedFetch = debounce(async () => {
  await fetchsubscribers();

  updateRoute(page.value);
}, 750);
watch(
  () => showSubscriber.dialog,
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
watch(
  () => filter,
  () => {
    emitter.emit("showLoading", true);
    debouncedFetch();
  },
  { deep: true, immediate: true }
);
watch(
  () => route.query.notify,
  async (newVal, oldVal) => {
    if (newVal == oldVal) {
      return;
    }
    emitter.emit("showLoading", true);
    const notify = route.query.notify;
    const id = route.query.id;
    const email = route.query.email;
    if (notify && id && email) {
      await showSubscriberDialog({ id: id }, notify);
    }
    emitter.emit("showLoading", false);
  }
);
onBeforeUnmount(() => {
  debouncedFetch.cancel();
});

const getsubscribers = async () => {
  emitter.emit("showLoading", true);
  await fetchsubscribers();
};

const isShowSubscriber = async () => {
  if (route.query.id && route.query.email) {
    await showSubscriberDialog(route.query);
  }
};

onMounted(async () => {
  const hasPageNumber = +route.query.page;
  if (!isNaN(hasPageNumber)) {
    page.value = +route.query.page;
  }
  filter.search = route.query.search ?? "";

  filter.status = ["all", "subscribed", "unsubscribed"].includes(
    toLower(route.query.status)
  )
    ? [capitalizeFirstLetter(route.query.status)]
    : ["All"];
  filter.sort_by = ["subscribed_date", "email"].includes(
    toLower(route.query.sort_by)
  )
    ? [capitalizeFirstLetter(route.query.sort_by)]
    : ["Subscribed Date"];

  filter.sortingOrder = ["desc", "asc"].includes(
    toLower(route.query.sorting_order)
  )
    ? (filter.sortingOrder = route.query.sorting_order)
    : "desc";
});
</script>

<style scoped lang="scss"></style>