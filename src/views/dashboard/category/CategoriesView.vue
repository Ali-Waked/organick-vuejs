<template>
  <div class="categories">
    <PageTitle title="Categories" :items />
    <FilterSection
      v-if="!loading"
      v-model:search="filter.name"
      search-label="Search By Category Name"
      :addDataLoading="addCategoryLoading"
      @add="addCategory"
      btn-label="Add New Category"
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
                btn-id="is_active"
                btn-label="Status"
              />
            </div>
            <SortingButton v-model:sorting-order="filter.sortingOrder" />
          </div>
        </div>
      </template>
    </FilterSection>
    <TableData :categories="categories">
      <template #actions="{ category }">
        <ActionButtons
          @show="showCategory(category.slug)"
          @edit="editCategory(category.slug)"
          @delete="deleteCategory(category)"
          :tooltip
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
    <NoDataFound v-if="!loading && categories.length == 0" />
    <DeleteAlert
      :title="alert.title"
      :text="alert.text"
      v-model:dialog="alert.dialog"
      :extra-data="alert.extraData"
      @delete="deleteCategoryForever($event)"
    />
  </div>
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import {
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
  computed,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCategoryStore } from "../../../stores/dashboard/category";
import { storeToRefs } from "pinia";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import ActionButtons from "@/components/dashboard/global/ActionButtons.vue";
import FilterSection from "@/components/dashboard/global/FilterSection.vue";
import FilterOption from "@/components/dashboard/global/FilterOption.vue";
import SortingButton from "@/components/dashboard/global/SortingButton.vue";
import TableData from "@/components/dashboard/category/TableData.vue";
import debounce from "lodash.debounce";
import DeleteAlert from "@/components/dashboard/global/DeleteAlert.vue";
import { toLower } from "lodash";
import formats from "@/mixins/formats";

const router = useRouter();
const route = useRoute();
const categoryStore = useCategoryStore();
const page = ref(1);
const { categories, loading, totalPage } = storeToRefs(categoryStore);
const emitter = inject("emitter");
const addCategoryLoading = ref(false);
const role = route.params.role;

const filter = reactive({
  name: "",
  sort_by: ["Created at"],
  status: ["All"],
  sortingOrder: "desc",
});

const sortOptions = [
  { value: "Name", title: "Name" },
  { value: "Number Of Active Product", title: "Number Of Active Product" },
  { value: "Created at", title: "Created at" },
];

const statusOption = [
  { value: "All", title: "All" },
  { value: "Active", title: "Active" },
  { value: "Archived", title: "Archived" },
];
const items = [
  {
    title: "Dashboard",
    to: `/${role}/dashboard`,
  },
  {
    title: "Categories",
    to: `/${role}/dashboard/categories`,
  },
];

const { capitalizeFirstLetter } = formats();

const tooltip = {
  show: "Show Category",
  edit: "Edit Category",
  delete: "Delete Category",
};

const alert = reactive({});
const addCategory = () => {
  addCategoryLoading.value = true;
  router.push({ name: "dashboard-add-category" });
};

const changePage = async () => {
  await debouncedFetch();
};

const fetchCategories = async () => {
  try {
    await categoryStore.fetchCategories(page.value, filter);
  } catch (e) {
    console.log("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const showCategory = (slug) => {
  emitter.emit("showLoading", true);
  router.push({ name: "dashboard-show-category", params: { category: slug } });
};

const editCategory = (slug) => {
  emitter.emit("showLoading", true);
  router.push({ name: "dashboard-edit-category", params: { category: slug } });
};

const deleteCategory = async ({ slug, name }) => {
  alert.title = `Confirmation Required`;
  alert.text = `<div class="mb-2">Are you sure you want to delete category <span class="text-red text-capitalize font-weight-bold text-decoration-underline">${name}</span>?</div>This action is permanent and cannot be undone`;
  alert.extraData = slug;
  alert.dialog = true;
};

const deleteCategoryForever = async (slug) => {
  alert.dialog = false;
  emitter.emit("showLoading", true);
  await categoryStore.deleteCategory(slug);
  categories.value = categories.value.filter((ele) => ele.slug !== slug);
  emitter.emit("showLoading", false);
};

const shouldShowPagination = computed(() => {
  return (
    !loading.value &&
    totalPage.value > 1 &&
    (route.query.page ? Number(route.query.page) <= totalPage.value : true)
  );
});

const debouncedFetch = debounce(async () => {
  await fetchCategories();
  updateRoute(page.value);
}, 750);

const updateRoute = (page) => {
  const query = {};

  if (filter.name) query.search = filter.name;

  if (filter.sort_by[0])
    query.sort_by = filter.sort_by[0].toLowerCase().replaceAll(" ", "_");

  if (filter.status[0]) query.status = filter.status[0].toLowerCase();

  if (filter.sortingOrder) query.sorting_order = filter.sortingOrder;

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
  const hasPageNumber = +route.query.page;
  console.log(hasPageNumber);
  if (!isNaN(hasPageNumber)) {
    page.value = +route.query.page;
  }
  filter.name = route.query.search ?? "";
  // filter.status = [route.query.status ?? "all"];
  // filter.sort_by = [route.query.sort_by ?? "created_at"];
  // filter.sortingOrder = route.query.sorting_order ?? "desc";
  // await fetchCategories();

  filter.sort_by = ["created_at", "name", "number_of_active_product"].includes(
    toLower(route.query.sort_by)
  )
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
