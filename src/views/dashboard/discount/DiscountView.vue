<template>
  <PageTitle title="Discounts" :items />
  <div class="discount-view">
    <FilterSection
      v-if="!loading"
      v-model:search="filter.search"
      search-label="Search By Discount Name Or Description"
      :addDataLoading="addDiscountLoading"
      @add="addDiscount"
      btn-label="Add New Discount"
    >
      <template #options>
        <div
          class="d-flex flex-column flex-sm-row align-start align-sm-center gr-4 mt-1 mt-md-3"
        >
          <div class="ml-0 ml-md-6">
            <FilterOption
              :options="discountMode"
              v-model:model-value="filter.discount_mode"
              btn-id="filter_by"
              btn-label="Discount Mode"
            />
          </div>
          <div class="d-flex align-center">
            <div class="ml-0 ml-sm-6">
              <FilterOption
                :options="discountFor"
                v-model:model-value="filter.discount_for"
                btn-id="is_active"
                btn-label="Discount For"
              />
            </div>
            <SortingButton v-model:sorting-order="filter.sortingOrder" />
          </div>
        </div>
      </template>
    </FilterSection>
    <TableData
      :discounts="discounts"
      :loading="loading"
      @editDiscount="editDiscount($event)"
      @deleteDiscount="deleteDiscount($event)"
      @showDiscount="showDiscount($event)"
    />
    <NoDataFound v-if="!loading && !discounts.length" />
    <v-pagination
      v-if="shouldShowPagination"
      v-model="page"
      :length="totalPage"
      @update:model-value="changePage"
      color="#7EB693"
      rounded="circle"
      class="mt-8"
    ></v-pagination>
    <DeleteAlert
      :title="alert.title"
      :text="alert.text"
      v-model:dialog="alert.dialog"
      :extra-data="alert.extraData"
      @delete="deleteDiscountForever($event)"
    />
    <AddDiscountDialog
      :data="discount"
      v-model:dialog="dialog"
      @fetchDiscounts="getDiscounts"
    />
    <ShowDiscount :discount="data.discount" v-model:dialog="data.dialog" />
  </div>
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import FilterSection from "@/components/dashboard/global/FilterSection.vue";
import SortingButton from "@/components/dashboard/global/SortingButton.vue";
import TableData from "@/components/dashboard/Discount/TableData.vue";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import DeleteAlert from "@/components/dashboard/global/DeleteAlert.vue";
import AddDiscountDialog from "@/components/dashboard/discount/AddDiscountDialog.vue";
import FilterOption from "@/components/dashboard/global/FilterOption.vue";
import ShowDiscount from "@/components/dashboard/discount/ShowDiscount.vue";
import { useRoute, useRouter } from "vue-router";
import debounce from "lodash.debounce";
import { toLower } from "lodash";
import formats from "@/mixins/formats";
import { onMounted, ref, reactive, onBeforeUnmount, watch, inject } from "vue";
import axiosClient from "../../../axiosClient";
const route = useRoute();
const role = route.params.role;
const discounts = ref([]);
const loading = ref(false);
const addDiscountLoading = ref(false);
const page = ref(1);
const totalPage = ref(0);
const discount = ref({});
const emitter = inject("emitter");
const dialog = ref(false);
const alert = reactive({});
const router = useRouter();
const { capitalizeFirstLetter } = formats();

const filter = reactive({
  search: "",
  discount_mode: ["All"],
  discount_for: ["All"],
  sortingOrder: "desc",
});
// const sortOptions = [
//   { value: "Name", title: "Name" },
//   { value: "Number Of Active Product", title: "Number Of Active Product" },
//   { value: "Created at", title: "Created at" },
// ];
// const discountTypes = [
//   { value: 'All', title: 'All' },
//   { value: "percentage", title: "Percentage" },
//   { value: "fixed", title: "Fixed Amount" },
// ];
const discountMode = [
  { value: "All", title: "All" },
  { value: "Fixed", title: "Fixed Amount" },
  { value: "Ranged", title: "Ranged Amount" },
];
const discountFor = [
  { value: "All", title: "All" },
  { value: "Order", title: "Order" },
  { value: "Product", title: "Product" },
];
// const statusOption = [
//   { value: "All", title: "All" },
//   { value: "Active", title: "Active" },
//   { value: "Archived", title: "Archived" },
// ];
const items = [
  {
    title: "Dashboard",
    to: { name: "dashboard", params: { role: role } },
  },
  {
    title: "Discounts",
  },
];

const position = reactive({
  x: 0,
  y: 0,
});

const data = reactive({
  discount: {},
  dialog: false,
});
const showDiscount = async ({ id, name }) => {
  emitter.emit("showLoading", true);
  try {
    await axiosClient.get(`/dashboard/discounts/${id}`).then((response) => {
      position.x = window.scrollX;
      position.y = window.scrollY;
      sessionStorage.setItem("scrollPosition", JSON.stringify(position));
      router.replace({
        query: {
          ...router.currentRoute.value.query,
          name: name,
          id: id,
        },
      });
      data.discount = response.data;
      data.dialog = true;
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

const addDiscount = async () => {
  // addDiscountLoading.value = true;
  discount.value = {};
  dialog.value = true;
};
const editDiscount = async (id) => {
  emitter.emit("showLoading", true);
  await axiosClient
    .get(`/dashboard/discounts/${id}`)
    .then((response) => {
      console.log("is_active", response.data.is_active);
      const data = response.data;
      console.log(data.products.map((product) => product.id));

      discount.value = {
        id: data.id,
        name: data.name,
        discount_type: data.discount_type,
        discount_mode: data.type,
        value: data.discount_value,
        is_active: +data.is_active,
        description: data.description,
        discounts_for: data.discount_for,
        starts_at: data.started_at?.slice(0, 10),
        ends_at: data.ended_at?.slice(0, 10),
        product_ids: data.products.map((product) => product.id),
        ranges: data.ranges.map((range) => ({
          min: range.min_price,
          max: range.max_price,
          value: range.value,
          type: range.type,
        })),
      };
      console.log(discount.value);
      dialog.value = true;
    })
    .catch((e) => {
      console.error(e);
    });
  emitter.emit("showLoading", false);
};

const deleteDiscount = async ({ id, name }) => {
  alert.title = `Confirmation Required`;
  alert.text = `<div class="mb-2">Are you sure you want to delete Discount <span class="text-red text-capitalize font-weight-bold text-decoration-underline">${name}</span>?</div>This action is permanent and cannot be undone`;
  alert.extraData = id;
  alert.dialog = true;
};

const deleteDiscountForever = async (id) => {
  console.log(id);
  emitter.emit("showLoading", true);
  try {
    await axiosClient.delete(`/dashboard/discounts/${id}`).then((response) => {
      alert.dialog = false;
      discounts.value = discounts.value.filter((ele) => ele.id !== id);
      emitter.emit("alert", ["error", "deleted Discount Successflly"]);
    });
  } catch (e) {
    console.error(e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const updateRoute = (page) => {
  const query = {};

  if (filter.search) query.search = filter.search;

  if (filter.discount_for[0])
    query.discount_for = filter.discount_for[0].toLowerCase();

  if (filter.discount_mode[0])
    query.discount_mode = filter.discount_mode[0].toLowerCase();

  if (filter.sortingOrder) query.sorting_order = filter.sortingOrder;

  if (route.query.id && route.query.name) {
    query.id = route.query.id;
    query.name = route.query.name;
  }

  if (page && totalPage.value > 1) query.page = page;

  router.push({ path: route.path, query: query });
};

const fetchDiscounts = async () => {
  try {
    const dataFilter = JSON.stringify({
      search: filter.search,
      discount_mode: filter.discount_mode[0],
      discount_for: filter.discount_for[0],
      sortingOrder: filter.sortingOrder,
    });
    await axiosClient
      .get(`/dashboard/discounts?filter=${dataFilter}`)
      .then((response) => {
        discounts.value = response.data.data;
        totalPage.value = response.data.last_page;
        isShowDiscount();
      });
  } catch (e) {
    console.log("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};
const debouncedFetch = debounce(async () => {
  await fetchDiscounts();

  updateRoute(page.value);
}, 750);

watch(
  () => filter,
  () => {
    emitter.emit("showLoading", true);
    debouncedFetch();
  },
  { deep: true, immediate: true }
);
onBeforeUnmount(() => {
  debouncedFetch.cancel();
});

const getDiscounts = async () => {
  emitter.emit("showLoading", true);
  await fetchDiscounts();
};

const isShowDiscount = async (data) => {
  if (route.query.id && route.query.name) {
    await showDiscount(route.query);
  }
};

onMounted(async () => {
  const hasPageNumber = +route.query.page;
  if (!isNaN(hasPageNumber)) {
    page.value = +route.query.page;
  }
  filter.search = route.query.search ?? "";

  filter.discount_mode = ["all", "fixed", "ranged"].includes(
    toLower(route.query.discount_mode)
  )
    ? [capitalizeFirstLetter(route.query.discount_mode)]
    : ["All"];
  filter.discount_for = ["all", "order", "product"].includes(
    toLower(route.query.discount_for)
  )
    ? [capitalizeFirstLetter(route.query.discount_for)]
    : ["All"];

  filter.sortingOrder = ["desc", "asc"].includes(
    toLower(route.query.sorting_order)
  )
    ? (filter.sortingOrder = route.query.sorting_order)
    : "desc";
  // if (route.query.id && route.query.name) {
  //   await showDiscount(route.query);
  // }
  // await debouncedFetch();
});
</script>

<style scoped lang="scss"></style>