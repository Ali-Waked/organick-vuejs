<template>
  <div class="orders">
    <PageTitle title="Orders" :items />
    <FilterSection v-if="!loading" v-model:search="filter.search" search-label="Search By Order Number Or Address"
      :show-button="false">
      <template #options>
        <div class="d-flex flex-column flex-sm-row align-start align-sm-center gr-4 mt-1 mt-md-3">
          <div class="ml-0 ml-md-6">
            <FilterOption :options="sortOptions" v-model:model-value="filter.sort_by" btn-id="filter_by"
              btn-label="Sort by" />
          </div>
          <div class="d-flex align-center">
            <div class="ml-0 ml-sm-6">
              <FilterOption :options="statusOption" v-model:model-value="filter.status" btn-label="Status"
                btn-id="status" />
            </div>
            <SortingButton v-model:sorting-order="filter.sorting_order" />
          </div>
        </div>
      </template>
    </FilterSection>
    <TableData v-if="!loading && orders.length" :orders>
      <template #actions="{ order }">
        <div>
          <v-icon icon="mdi-eye" style="--color: #4caf50; --background-color: #e5f5e9"
            class="cursor-pointer main-transition" @click="viewOrder(order.number)" />
          <v-tooltip activator="parent" location="top">Show Order</v-tooltip>
        </div>
      </template>
    </TableData>
    <v-pagination color="#7EB693" v-model="page" @update:model-value="changePage" :length="totalPage" rounded="circle"
      class="mt-8" v-if="shouldShowPagination"></v-pagination>
    <NoDataFound v-if="!loading && orders.length == 0" />
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
import { storeToRefs } from "pinia";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import FilterSection from "@/components/dashboard/global/FilterSection.vue";
import FilterOption from "@/components/dashboard/global/FilterOption.vue";
import SortingButton from "@/components/dashboard/global/SortingButton.vue";
import TableData from "@/components/dashboard/order/TableData.vue";
import debounce from "lodash.debounce";
import { useOrderStore } from "@/stores/dashboard/order";
import { toLower } from "lodash";

const router = useRouter();
const route = useRoute();
const orderStore = useOrderStore();
const page = ref(1);
const { orders, loading, totalPage } = storeToRefs(orderStore);
const emitter = inject("emitter");

const filter = reactive({
  search: "",
  sort_by: ["Order Date"],
  status: ["All"],
  sorting_order: "desc",
});

const sortOptions = [
  { value: "Number", title: "Number" },
  { value: "Total Price", title: "Total Price" },
  { value: "Order Date", title: "Order Date" },
];

const statusOption = [
  { value: "All", title: "All" },
  { value: "Pending", title: "Pending" },
  { value: "Processing", title: "Processing" },
  { value: "Driving", title: "Driving" },
  { value: "Completed", title: "Completed" },
  { value: "Canceled", title: "Canceled" },
  { value: "Refunded", title: "Refunded" },
];
const items = [
  {
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    title: "Orders",
    to: "/dashboard/orders",
  },
];

const shouldShowPagination = computed(() => {
  return (
    totalPage.value > 1 &&
    (route.query.page ? Number(route.query.page) <= totalPage.value : true)
  );
});

const changePage = async () => {
  emitter.emit("showLoading", true);
  // router.push({ path: route.path, query: { page: page.value } });
  await debouncedFetch();
};

const fetchOrders = async () => {
  try {
    const filterData = {
      ...filter,
      sorting_by:
        toLower(filter.sort_by[0]) == "order date"
          ? "created_at"
          : filter.sort_by[0],
      status: filter.status[0],
    };
    await orderStore.fetchOrders(page.value, filterData);
  } catch (e) {
    console.log("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const viewOrder = (number) => {
  emitter.emit("showLoading", true);
  router.push({ name: "dashboard-show-order", params: { order: number } });
};
const debouncedFetch = debounce(() => {
  fetchOrders();
  updateRoute();
}, 750);

const updateRoute = (page) => {
  const query = {};

  if (filter.search) query.search = filter.search;

  if (filter.sort_by[0])
    query.sort_by = filter.sort_by[0].toLowerCase().replaceAll(" ", "_");

  if (filter.status[0] && filter.status[0] !== "All")
    query.status = filter.status[0].toLowerCase();

  if (filter.sorting_order) query.sorting_order = filter.sorting_order;

  if (page && totalPage.value > 1) query.page = page;

  router.push({ path: route.path, query: query });
};

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

onMounted(async () => {
  emitter.emit("showLoading", true);
  const hasPageNumber = Number(route.query.page);
  console.log(hasPageNumber);
  // const filterData = {
  //   // search: filter.search,
  //   ...filter,
  //   sort_by: filter.sort_by[0],
  //   status: filter.status[0],
  //   // sortingType: "desc",
  //   // sortingOrder: "desc",
  // };

  if (!isNaN(hasPageNumber)) {
    page.value = +route.query.page;
  }
  filter.search = route.query.search ?? "";
  filter.status = [route.query.status ?? "all"];
  filter.sort_by = [route.query.sort_by ?? "created_at"];
  filter.sorting_order = route.query.sorting_order ?? "desc";
  // await fetchOrders();
});
</script>
