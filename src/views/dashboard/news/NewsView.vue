<template>
  <div class="newss">
    <PageTitle title="News" :items />

    <FilterSection v-if="!loading" v-model:search="filter.search" search-label="Search For News"
      :addDataLoading="addNewsLoading" @add="addNews" btn-label="Add New News">
      <template #options>
        <div class="d-flex flex-column flex-sm-row align-start align-sm-center gr-4 mt-1 mt-md-3">
          <div class="ml-0 ml-md-6">
            <FilterOption :options="sortOptions" v-model:model-value="filter.sort_by" btn-id="filter_by"
              btn-label="Sort by" />
          </div>
          <div class="d-flex align-center">
            <div class="ml-0 ml-sm-6">
              <FilterOption :options="statusOption" v-model:model-value="filter.status" btn-id="status"
                btn-label="Status" />
            </div>
            <SortingButton v-model:sorting-order="filter.sortingOrder" />
          </div>
        </div>
      </template>
    </FilterSection>
    <v-row class="mt-4">
      <v-col cols="12" sm="6" md="6" lg="4" v-if="data.length" v-for="news in data" :key="news.id">
        <DataRecored :news>
          <template #actions>
            <ActionButton @edit="editNews($event)" @delete="deleteNews($event)" :news="news" />
          </template>
        </DataRecored>
      </v-col>
    </v-row>
  </div>
  <NoDataFound v-if="!loading && data.length == 0" />
  <DeleteAlert :title="alert.title" :text="alert.text" v-model:dialog="alert.dialog" :extra-data="alert.extraData"
    @delete="deleteNewsForever($event)" />
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
import { useNewsStore } from "@/stores/dashboard/news";
import { storeToRefs } from "pinia";
import FilterSection from "@/components/dashboard/global/FilterSection.vue";
import FilterOption from "@/components/dashboard/global/FilterOption.vue";
import SortingButton from "@/components/dashboard/global/SortingButton.vue";
import DataRecored from "@/components/dashboard/news/DataRecored.vue";
import debounce from "lodash.debounce";
import DeleteAlert from "@/components/dashboard/global/DeleteAlert.vue";
import ActionButton from "@/components/dashboard/news/ActionButton.vue";
import NoDataFound from "../../../components/dashboard/global/NoDataFound.vue";

const router = useRouter();
const route = useRoute();
const newsStore = useNewsStore();
const page = ref(1);
const { data, loading, totalPage } = storeToRefs(newsStore);
const emitter = inject("emitter");
const role = route.params.role;
const addNewsLoading = ref(false);
const filter = reactive({
  search: "",
  sort_by: ["Created at"],
  status: ["All"],
  sortingOrder: "desc",
});

const sortOptions = [
  { value: "Title", title: "Title" },
  { value: "Number Of Views", title: "Number Of Views" },
  { value: "Last Modified", title: "Last Modified" },
  { value: "Publish at", title: "Publish at" },
  { value: "Created at", title: "Created at" },
];

const statusOption = [
  { value: "All", title: "All" },
  { value: "Published", title: "Published" },
  { value: "Archived", title: "Archived" },
];

const items = [
  {
    title: "Dashboard",
    to: `/${role}/dashboard`,
  },
  {
    title: "News",
    to: `/${role}/dashboard/news`,
  }
];

const alert = reactive({});

const deleteNews = async ({ id, title, slug }) => {
  alert.title = `Confirmation Required`;
  alert.text = `<div class="mb-2">Are you sure you want to delete News <span class="text-red text-capitalize font-weight-bold text-decoration-underline">${title}</span>?</div>This action is permanent and cannot be undone`;
  alert.extraData = { id, slug };
  alert.dialog = true;
};

const addNews = () => {
  addNewsLoading.value = true;
  router.push({ name: "dashboard-add-news" });
};

const fetchNews = async () => {
  try {
    await newsStore.getNews(page.value, filter);
  } catch (e) {
    console.log("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const showNews = (slug) => {
  emitter.emit("showLoading", true);
  router.push({ name: "dashboard-show-category", params: { category: slug } });
};

const editNews = ({ slug }) => {
  emitter.emit("showLoading", true);
  router.push({ name: "dashboard-edit-news", query: { slug: slug } });
};

const deleteNewsForever = async ({ id, slug }) => {
  emitter.emit("showLoading", true);
  await newsStore.destroy({ id, slug });
  alert.dialog = false;
  emitter.emit("showLoading", false);
};

const updateRoute = (page) => {
  const query = {};

  if (filter.search) query.search = filter.search;

  if (filter.sort_by[0])
    query.sort_by = filter.sort_by[0].toLowerCase().replaceAll(" ", "_");

  if (filter.status[0] && filter.status[0] !== "All")
    query.status = filter.status[0].toLowerCase();

  if (filter.sortingOrder) query.sorting_order = filter.sortingOrder;

  if (page && totalPage.value > 1) query.page = page;

  router.push({ path: route.path, query: query });
};

const debouncedFetch = debounce(() => {
  fetchNews();
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

const shouldShowPagination = computed(() => {
  return (
    !loading.value &&
    totalPage.value > 1 &&
    (route.query.page ? Number(route.query.page) <= totalPage.value : true)
  );
});

onMounted(async () => {
  emitter.emit("showLoading", true);
  await debouncedFetch();
});
</script>
