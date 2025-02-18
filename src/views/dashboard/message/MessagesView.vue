<template>
  <div class="message">
    <PageTitle title="Contact Messages" :items />
    <FilterSection
      v-model:search="filter.search"
      search-label="Search By Name Or Email"
    >
      <template #options
        ><div
          class="d-flex flex-column flex-sm-row align-start align-sm-center gr-4 mt-1 mt-md-3"
        >
          <div class="ml-0 ml-md-6">
            <FilterOption
              :options="sortOptions"
              v-model:model-value="filter.sort_by"
              btn-id="filter_by"
              btn-label="Sort by"
            />
          </div>
          <div class="d-flex align-center">
            <div class="ml-0 ml-sm-6">
              <FilterOption
                :options="status"
                v-model:model-value="filter.status"
                btn-id="status"
                btn-label="Status"
              />
            </div>
            <SortingButton v-model:sorting-order="filter.sortingOrder" />
          </div>
        </div>
      </template>
    </FilterSection>
    <TableData v-if="data.length" :data>
      <template #actions="{ item }">
        <ActionButton
          icon="mdi-eye"
          color="#4caf50"
          background-color="#e5f5e9"
          @click="showContactMessage(item)"
          tooltip="Show Message"
        />
      </template>
    </TableData>
    <v-pagination
      color="#7EB693"
      v-model="page"
      @update:model-value="changePage"
      :length="totalPage"
      rounded="circle"
      class="mt-8"
      v-if="shouldShowPagination"
    ></v-pagination>
    <NoDataFound v-if="data.length == 0" />
  </div>
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import FilterSection from "@/components/dashboard/global/FilterSection.vue";
import FilterOption from "@/components/dashboard/global/FilterOption.vue";
import SortingButton from "@/components/dashboard/global/SortingButton.vue";
import debounce from "lodash.debounce";
import { useUserStore } from "../../../stores/dashboard/user";
import TableData from "../../../components/dashboard/contactMessage/TableData.vue";
import ActionButton from "../../../components/dashboard/global/ActionButton.vue";
import axiosClient from "@/axiosClient";
import { toLower } from "lodash";

const emitter = inject("emitter");
const data = ref([]);
const totalPage = ref(1);
const route = useRoute();
const router = useRouter();
const page = ref(1);
const filter = reactive({
  search: "",
  sort_by: ["Send Date"],
  status: ["All"],
  sortingOrder: "desc",
});

const sortOptions = [
  { value: "Email", title: "Email" },
  { value: "Send Date", title: "Send Date" },
];

const status = [
  { value: "All", title: "All" },
  { value: "Resolved Message", title: "Resolved Message" },
  { value: "Unresolved Message", title: "Unresolved Message" },
];
const items = [
  {
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    title: "Contact Messages",
  },
];

const fetchContacts = async () => {
  try {
    const dataFilter = {
      ...filter,
      sort_by:
        toLower(filter.sort_by[0]) == "email"
          ? filter.sort_by[0]
          : "created_at",
      is_resolved:
        toLower(filter.status[0]) == "resolved message" ? true : false,
    };
    await axiosClient
      .get(`/dashboard/contacts?filter=${JSON.stringify(dataFilter)}`)
      .then((response) => {
        console.log(response);
        data.value = response.data.data;
      });
  } catch (e) {
    console.log("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const showContactMessage = ({ id, subject }) => {
  emitter.emit("showLoading", true);
  router.push({
    name: "dashboard-message-show",
    query: { subject: subject, id: id },
  });
};

const shouldShowPagination = computed(() => {
  return (
    totalPage.value > 1 &&
    (route.query.page ? Number(route.query.page) <= totalPage.value : true)
  );
});
const debouncedFetch = debounce(() => {
  fetchContacts();
}, 750);
watch(
  () => ({ ...filter }),
  () => {
    emitter.emit("showLoading", true);
    page.value = 1;
    debouncedFetch();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  debouncedFetch.cancel();
});

const changePage = async () => {
  emitter.emit("showLoading", true);
  router.push({ path: route.path, query: { page: page.value } });
  await debouncedFetch();
};

onMounted(async () => {
  emitter.emit("showLoading", true);
  const hasPageNumber = Number(route.query.page);
  if (!isNaN(hasPageNumber)) {
    page.value = +route.query.page;
  }
  await fetchContacts();
});
</script>

<style lang="scss" scoped></style>
