<template>
  <div class="Products">
    <PageTitle title="Products" :items />

    <FilterSection
      v-if="!loading"
      v-model:search="filter.name"
      search-label="Search By Product Name Category Name"
      :addDataLoading="addProductLoading"
      btn-icon="mdi-chevron-right"
      @add="viewAllProducts"
      btn-label="View All Products"
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

          <SortingButton v-model:sorting-order="filter.sortingOrder" />
        </div>
      </template>
    </FilterSection>
    <TableData
      v-if="!loading && products.length"
      :products="products"
      :is-trashed-page="true"
    >
      <template #action="{ product }">
        <TrashActionButtons
          @restore="restoreProduct(product.id)"
          @force-delete="showDeleteAlert(product)"
        />
      </template>
    </TableData>
    <v-pagination
      color="#7EB693"
      v-model="page"
      @update:model-value="cahngePage"
      :length="totalPage"
      rounded="circle"
      class="mt-8"
      v-if="
        !loading &&
        totalPage != 1 &&
        (route.query.page != undefined ? route.query.page <= totalPage : true)
      "
    ></v-pagination>
    <NoDataFound v-if="!loading && products.length == 0" />
  </div>
  <DeleteAlert
    :title="alert.title"
    :text="alert.text"
    v-model:dialog="alert.dialog"
    :extra-data="alert.extraData"
    @delete="deleteProductForever($event)"
  />
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import DeleteAlert from "@/components/dashboard/global/DeleteAlert.vue";
import {
  inject,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import { useProductStore } from "@/stores/dashboard/product";
import FilterSection from "@/components/dashboard/global/FilterSection.vue";
import FilterOption from "@/components/dashboard/global/FilterOption.vue";
import SortingButton from "@/components/dashboard/global/SortingButton.vue";
import TableData from "@/components/dashboard/product/TableData.vue";
import TrashActionButtons from "@/components/dashboard/global/TrashActionButtons.vue";
import debounce from "lodash.debounce";
import { toLower } from "lodash";
import formats from "@/mixins/formats";

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();
const page = ref(1);
const { products, loading, totalPage } = storeToRefs(productStore);
const emitter = inject("emitter");
const addProductLoading = ref(false);
const alert = reactive({});
const role = route.params.role;
const filter = reactive({
  name: "",
  sort_by: ["Created at"],
  sortingOrder: "desc",
});

const items = [
  {
    title: "Dashboard",
    to: `/${role}/dashboard`,
  },
  {
    title: "Products",
    to: `/${role}/dashboard/Products`,
  },
  {
    title: "Trash",
  },
];

const sortOptions = [
  { value: "Name", title: "Name" },
  { value: "Category Name", title: "Category Name" },
  { value: "Price", title: "Price" },
  { value: "Best Seller", title: "Best Seller" },
  { value: "Created at", title: "Created at" },
];

const { capitalizeFirstLetter } = formats();

const viewAllProducts = () => {
  addProductLoading.value = true;
  router.push({ name: "dashboard-products" });
};

onBeforeMount(() => {
  productStore.$reset();
});

const cahngePage = async () => {
  // router.push({ path: route.path, query: { page: page.value } });
  await fetchTrashedProduct(page.value);
};

const fetchTrashedProduct = async () => {
  await productStore.fetchTrashedProduct(page.value, filter);
  emitter.emit("showLoading", false);
  console.log("hi");
};

const restoreProduct = async (id) => {
  emitter.emit("showLoading", true);
  try {
    await productStore.restoreProduct(id);
    products.value = products.value.filter((ele) => ele.id !== id);
  } catch (e) {
    console.error("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const deleteProductForever = async (id) => {
  emitter.emit("showLoading", true);
  try {
    await productStore.deleteProductForever(id);
    products.value = products.value.filter((ele) => ele.id !== id);
  } catch (e) {
    console.log("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const showDeleteAlert = async ({ id, name }) => {
  alert.title = `Confirmation Required`;
  alert.text = `<div class="mb-2">Are you sure you want to delete Product <span class="text-red text-capitalize font-weight-bold text-decoration-underline">${name}</span>?</div>This action is permanent and cannot be undone`;
  alert.extraData = id;
  alert.dialog = true;
};

const updateRoute = (page) => {
  const query = {};

  if (filter.name) query.search = filter.name;

  if (filter.sort_by[0])
    query.sort_by = filter.sort_by[0].toLowerCase().replaceAll(" ", "_");

  if (filter.sortingOrder) query.sorting_order = filter.sortingOrder;

  if (page && totalPage.value > 1) query.page = page;

  router.push({ path: route.path, query: query });
};

const debouncedFetch = debounce(() => {
  fetchTrashedProduct();
  updateRoute();
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

onMounted(async () => {
  emitter.emit("showLoading", true);
  const hasPageNumber = +route.query.page;
  console.log(hasPageNumber);
  if (!isNaN(hasPageNumber)) {
    page.value = +route.query.page;
  }
  // await fetchTrashedProduct();
  filter.name = route.query.search ?? "";

  filter.sort_by = [
    "created_at",
    "name",
    "price",
    "best_seller",
    "category_name",
  ].includes(toLower(route.query.sort_by))
    ? [capitalizeFirstLetter(route.query.sort_by)]
    : ["Created at"];

  filter.sortingOrder = ["desc", "asc"].includes(
    toLower(route.query.sorting_order)
  )
    ? (filter.sortingOrder = route.query.sorting_order)
    : "desc";
});
</script>
