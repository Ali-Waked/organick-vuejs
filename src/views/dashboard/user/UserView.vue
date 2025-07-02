<template>
  <div class="users">
    <PageTitle :title :items />
    <FilterSection v-model:search="filter.search" search-label="Search By Name Or Email"
      :addDataLoading="addUserLoading" @add="addUser" :btn-label :show-button="isAdmin">
      <template #options>
        <div class="d-flex flex-column flex-sm-row align-start align-sm-center gr-4 mt-1 mt-md-3">
          <div class="ml-0 ml-md-6">
            <FilterOption :options="sortOptions" v-model:model-value="filter.sort_by" btn-id="filter_by"
              btn-label="Sort by" />
          </div>
          <div class="d-flex align-center">
            <!-- <div class="ml-0 ml-sm-6">
              <FilterOption
                :options="types"
                v-model:model-value="filter.type"
                btn-id="types"
                btn-label="Type"
              />
            </div> -->
            <SortingButton v-model:sorting-order="filter.sortingOrder" />
          </div>
        </div>
      </template>
    </FilterSection>
    <TableData v-if="data.length" :data :is-admin>
      <template #actions="{ item }">
        <ActionButton icon="mdi-eye" color="#4caf50" background-color="#e5f5e9" @click="ShowUserInfo(item)"
          tooltip="Show More Information" />
        <!-- <ActionButtons
          v-if="item.type != 'customer'"
          @show="showMemberInfo(item)"
          @edit="editMember(item)"
          @delete="deleteMember($event, item.id)"
          :tooltip
        /> -->
      </template>
    </TableData>
    <v-pagination color="#7EB693" v-model="page" @update:model-value="changePage" :length="totalPage" rounded="circle"
      class="mt-8" v-if="shouldShowPagination"></v-pagination>
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
import { storeToRefs } from "pinia";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import FilterSection from "@/components/dashboard/global/FilterSection.vue";
import FilterOption from "@/components/dashboard/global/FilterOption.vue";
import SortingButton from "@/components/dashboard/global/SortingButton.vue";
import debounce from "lodash.debounce";
import { useUserStore } from "@/stores/dashboard/user";
import { useAuthStore } from "@/stores/auth/auth";
import TableData from "@/components/dashboard/user/TableData.vue";
import ActionButton from "@/components/dashboard/global/ActionButton.vue";
import { toLower } from "lodash";
import ActionButtons from "@/components/dashboard/global/ActionButtons.vue";
import formats from "@/mixins/formats";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);
const page = ref(1);
const { data, totalPage } = storeToRefs(userStore);
const emitter = inject("emitter");
const addUserLoading = ref(false);
const title = ref("Customers");
const btnLabel = ref("");
const url = ref("/customers");
const { capitalizeFirstLetter, getSingularName } = formats();

const filter = reactive({
  search: "",
  sort_by: ["Join Time"],
  sortingOrder: "desc",
});

const sortOptions = [
  { value: "Name", title: "Name" },
  { value: "Email", title: "Email" },
  { value: "Last Active Date", title: "Last Active Date" },
  { value: "Join Time", title: "Join Time" },
];

const items = reactive([
  {
    title: "Dashboard",
    to: "/dashboard",
  },
]);

const isAdmin = computed(() => {
  return authUser.value.type == "admin";
});

const addUser = () => {
  addUserLoading.value = true;
  router.push({ name: `dashboard-add-${singularName.value}` });
};

const shouldShowPagination = computed(() => {
  return (
    totalPage.value > 1 &&
    (route.query.page ? Number(route.query.page) <= totalPage.value : true)
  );
});
const singularName = computed(() => {
  return getSingularName(url.value);
});

const changePage = async () => {
  emitter.emit("showLoading", true);
  router.push({ path: route.path, query: { page: page.value } });
  await debouncedFetch();
};

const fetchUsers = async () => {
  try {
    await userStore.fetchUsers(page.value, singularName.value, filter);
  } catch (e) {
    console.log("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const ShowUserInfo = ({ email, first_name, last_name }) => {
  emitter.emit("showLoading", true);
  const name = `${first_name} ${last_name}`;
  router.push({
    name: `dashboard-show-${singularName.value}-information`,
    query: { name: name, email: email },
  });
};

const updateRoute = (page) => {
  const query = {};

  if (filter.search) query.search = filter.search;

  if (filter.sort_by[0])
    query.sort_by = filter.sort_by[0].toLowerCase().replaceAll(" ", "_");

  if (filter.sortingOrder) query.sorting_order = filter.sortingOrder;

  if (page && totalPage.value > 1) query.page = page;

  router.push({ path: route.path, query: query });
};

const debouncedFetch = debounce(() => {
  fetchUsers();
  updateRoute(page.value);
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

watch(
  () => route.name,
  (newName) => {
    filter.search = "";
    filter.sort_by = ["Join Time"];
    filter.sortingOrder = "desc";

    switch (newName) {
      case "dashboard-customers":
        title.value = "Customers";
        btnLabel.value = "";
        url.value = "customers";
        items[1] = {
          title: "Customers",
          to: "/dashboard/customers",
        };
        break;
      case "dashboard-moderators":
        title.value = "Moderators";
        btnLabel.value = "Add New Moderator";
        url.value = "moderators";
        items[1] = {
          title: "Moderators",
          to: "/dashboard/moderators",
        };
        break;
      case "dashboard-drivers":
        title.value = "Drivers";
        btnLabel.value = "Add New Driver";
        url.value = "drivers";
        items[1] = {
          title: "Drivers",
          to: "/dashboard/drivers",
        };
        break;
    }
    // getUrlInfo();
  },
  { immediate: true }
);

// const addItemToBreadCrumb = (newItem) => {
//   if (items.length === 1) {
//     items.push(newItem);
//   } else if (items.length === 2) {
//     items[items.length - 1] = newItem;
// }
// }

onMounted(async () => {
  emitter.emit("showLoading", true);
  const query = route.query;
  const hasPageNumber = Number(query.page);
  if (!isNaN(hasPageNumber)) {
    page.value = +route.query.page;
  }
  // await fetchUsers();

  if (!isNaN(hasPageNumber)) {
    page.value = +route.query.page;
  }

  filter.name = route.query.search ?? "";

  filter.sort_by = [
    "created_at",
    "name",
    "email",
    "last_active_date",
    "Join_date",
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
