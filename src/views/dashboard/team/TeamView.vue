<template>
  <div class="team-member">
    <PageTitle title="Team Members" :items="breadcrumbItems" />
    <FilterSection
      v-if="!loading"
      v-model:search="filter.search"
      search-label="Search By Name Or Email"
      :addDataLoading="loading"
      @add="addMember"
      btn-label="Add New Member"
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

    <div v-if="!loading && data.length">
      <TableData :data :loading>
        <template #actions="{ item }">
          <ActionButtons
            @show="showMemberInfo(item)"
            @edit="editMember(item)"
            @delete="deleteMember($event, item.id)"
            :tooltip
          />
        </template>
      </TableData>
    </div>
    <v-pagination
      color="#7EB693"
      v-model="page"
      @update:model-value="changePage"
      :length="totalPage"
      rounded="circle"
      class="mt-8"
      v-if="shouldShowPagination"
    ></v-pagination>
    <NoDataFound v-if="!loading && data.length == 0" />
  </div>
</template>

<script setup>
import { inject, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { storeToRefs } from "pinia";
import NoDataFound from "../../../components/dashboard/global/NoDataFound.vue";
import { useTeamStore } from "../../../stores/dashboard/team";
import { computed } from "vue";
import FilterSection from "../../../components/dashboard/global/FilterSection.vue";
import ActionButtons from "../../../components/dashboard/global/ActionButtons.vue";
import SortingButton from "../../../components/dashboard/global/SortingButton.vue";
import FilterOption from "../../../components/dashboard/global/FilterOption.vue";
import TableData from "../../../components/dashboard/team/TableData.vue";
import debounce from "lodash.debounce";
// const PageTitle = defineAsyncComponent(() =>
//   import("@/components/dashboard/global/PageTitle.vue")
// );
const router = useRouter();
const route = useRoute();
const temaStore = useTeamStore();
const page = ref(1);
const { data, loading, totalPage } = storeToRefs(temaStore);
const emitter = inject("emitter");
const addMemberLoading = ref(false);
const filter = reactive({
  search: "",
  sort_by: ["Joined Time"],
  sortingOrder: "desc",
});
const tooltip = {
  show: "Show More Info",
  edit: "Edit Member Info",
  delete: "Delete Member",
};
const test = ref("");
const breadcrumbItems = [
  {
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    title: "Team Members",
  },
];

const sortOptions = [
  { value: "Name", title: "Name" },
  { value: "Last Active Time", title: "Last Active Time" },
  { value: "Joined Time", title: "Joined Time" },
];

const addMember = () => {
  addMemberLoading.value = true;
  router.push({ name: "dashboard-add-member" });
};

const changePage = async () => {
  router.push({ path: route.path, query: { page: page.value } });
  // await fetchTeamMembers(page.value);
};

const fetchTeamMembers = async () => {
  try {
    await temaStore.fetchTeamMembers(page.value, filter);
  } catch (e) {
    console.log("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const showMemberInfo = ({ first_name, last_name, email }) => {
  emitter.emit("showLoading", true);
  router.push({
    name: "dashboard-show-member-info",
    query: { name: `${first_name} ${last_name}`, email: email },
  });
};

const editMember = ({ first_name, last_name, email }) => {
  emitter.emit("showLoading", true);
  router.push({
    name: "dashboard-edit-member-info",
    query: { name: `${first_name} ${last_name}`, email: email },
  });
};

const deleteMember = async (event, slug) => {
  emitter.emit("showLoading", true);
  await temaStore.deleteMember(slug);
  data.value = data.value.filter((ele) => ele.slug !== slug);
  emitter.emit("showLoading", false);
};

const debouncedFetch = debounce(() => {
  fetchTeamMembers();
}, 750);

watch(
  () => ({ ...filter, page: page.value }),
  () => {
    emitter.emit("showLoading", true);
    debouncedFetch();
  },
  { deep: true }
);

const shouldShowPagination = computed(() => {
  return (
    !loading.value &&
    totalPage.value > 1 &&
    (route.query.page ? Number(route.query.page) <= totalPage.value : true)
  );
});

onBeforeUnmount(() => {
  debouncedFetch.cancel();
});

onMounted(async () => {
  emitter.emit("showLoading", true);
  const hasPageNumber = Number(route.query.page);
  if (!isNaN(hasPageNumber) && hasPageNumber > 0) {
    page.value = hasPageNumber;
  }
  await fetchTeamMembers();
  console.log(data.value);
});
</script>
