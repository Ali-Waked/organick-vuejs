<template>
  <div class="Products">
    <PageTitle
      title="Products"
      :items
      urlTrash="dashboard-products-trash"
      urlTrashTitle="GoTo Trahed"
    />
    <FilterSection
      v-if="!loading"
      v-model:search="filter.name"
      search-label="Search By Product Name Category Name"
      :addDataLoading="addProductLoading"
      @add="addProduct"
      btn-label="Add New Product"
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
                :options="statusOption"
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
    <TableData v-if="!loading && products.length" :products="products">
      <template #action="{ product }">
        <ActionButtons
          @show="showProduct(product.slug)"
          @edit="editProduct(product.slug)"
          @delete="showDeleteAlert(product)"
          :tooltip
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
    <DeleteAlert
      :title="alert.title"
      :text="alert.text"
      v-model:dialog="alert.dialog"
      :extra-data="alert.extraData"
      delete-button-label="Delete"
      @delete="deleteProduct($event)"
    />
  </div>
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { inject, onMounted, onBeforeUnmount, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import { useProductStore } from "@/stores/dashboard/product";
import ActionButtons from "@/components/dashboard/global/ActionButtons.vue";
import FilterOption from "@/components/dashboard/global/FilterOption.vue";
import FilterSection from "@/components/dashboard/global/FilterSection.vue";
import SortingButton from "@/components/dashboard/global/SortingButton.vue";
import TableData from "@/components/dashboard/product/TableData.vue";
import debounce from "lodash.debounce";
import DeleteAlert from "@/components/dashboard/global/DeleteAlert.vue";
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
  status: ["All"],
  sortingType: "desc",
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
];

const sortOptions = [
  { value: "Name", title: "Name" },
  { value: "Category name", title: "Category name" },
  { value: "Price", title: "Price" },
  { value: "Best seller", title: "Best seller" },
  { value: "Created at", title: "Created at" },
];

const statusOption = [
  { value: "All", title: "All" },
  { value: "Active", title: "Active" },
  { value: "Archived", title: "Archived" },
];

const tooltip = {
  show: "Show Product",
  edit: "Edit Product",
  delete: "Delete Product",
};

const { capitalizeFirstLetter } = formats();

const addProduct = () => {
  addProductLoading.value = true;
  router.push({ name: "dashboard-add-product" });
};

const cahngePage = async () => {
  // router.push({ path: route.path, query: { page: page.value } });
  await fetchProduct(page.value);
};

// fetch all Products
const fetchProduct = async () => {
  try {
    await productStore.fetchProduct(page.value, filter);
  } catch (e) {
    console.error("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

// Show Product
const showProduct = (slug) => {
  emitter.emit("showLoading", true);
  router.push({ name: "dashboard-show-product", params: { product: slug } });
};

// Edit Product
const editProduct = (slug) => {
  emitter.emit("showLoading", true);
  router.push({ name: "dashboard-edit-product", params: { product: slug } });
};

const showDeleteAlert = async ({ slug, name }) => {
  alert.title = `Confirmation Required`;
  alert.text = `<div class="mb-2">Are you sure you want to delete Product <span class="text-red text-capitalize font-weight-bold text-decoration-underline">${name}</span>?</div>This action is move product into trash`;
  alert.extraData = slug;
  alert.dialog = true;
};

// Delete Product
const deleteProduct = async (slug) => {
  emitter.emit("showLoading", true);
  await productStore.deleteProduct(slug);
  products.value = products.value.filter((ele) => ele.slug !== slug);
  alert.dialog = false;
  emitter.emit("showLoading", false);
};

const updateRoute = (page) => {
  const query = {};

  if (filter.name) query.search = filter.name;

  if (filter.sort_by[0])
    query.sort_by = filter.sort_by[0].toLowerCase().replaceAll(" ", "_");

  if (filter.status[0] && filter.status[0] !== "All")
    query.status = filter.status[0].toLowerCase();

  if (filter.sortingOrder) query.sorting_order = filter.sortingOrder;

  if (page && totalPage.value > 1) query.page = page;

  router.push({ path: route.path, query: query });
};

const debouncedFetch = debounce(() => {
  fetchProduct();
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
  if (!isNaN(hasPageNumber)) {
    page.value = +route.query.page;
  }
  filter.name = route.query.search ?? "";
  // filter.status = [route.query.status ?? "All"];
  // filter.sort_by = [route.query.sort_by ?? "Created_at"];
  filter.sort_by = [
    "created_at",
    "name",
    "price",
    "best_seller",
    "category_name",
  ].includes(toLower(route.query.sort_by))
    ? [capitalizeFirstLetter(route.query.sort_by)]
    : ["Created at"];

  filter.status = ["all", "active", "archived"].includes(
    toLower(route.query.status)
  )
    ? [capitalizeFirstLetter(route.query.status)]
    : ["All"];

  filter.sortingOrder = ["desc", "asc"].includes(
    toLower(route.query.sorting_order)
  )
    ? (filter.sortingOrder = route.query.sorting_order)
    : "desc";
});
</script>
