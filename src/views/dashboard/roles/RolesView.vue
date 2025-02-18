<template>
  <div class="roles">
    <PageTitle title="Roles" :items />
    <FilterSection
      v-if="!loading"
      v-model:search="filter.name"
      search-label="Search By Role Name"
      :addDataLoading="addRoleLoading"
      @add="addRole"
      btn-label="Add New Role"
    />
    <TableData :data="roles" v-if="roles.length">
      <template #actions="{ item }">
        <ActionButtons
          @delete="deleteRole(item)"
          @edit="editRole(item.slug)"
          :tooltip
        />
      </template>
    </TableData>
    <DeleteAlert
      :title="alert.title"
      :text="alert.text"
      v-model:dialog="alert.dialog"
      :extra-data="alert.extraData"
      @delete="deleteRoleForever($event)"
    />
    <NoDataFound v-if="!loading && roles.length == 0" />
  </div>
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { inject, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import ActionButton from "@/components/dashboard/global/ActionButton.vue";
import FilterSection from "@/components/dashboard/global/FilterSection.vue";
import TableData from "@/components/dashboard/role/TableData.vue";
import debounce from "lodash.debounce";
import axiosClient from "@/axiosClient";
import DeleteAlert from "@/components/dashboard/global/DeleteAlert.vue";
import ActionButtons from "@/components/dashboard/global/ActionButtons.vue";

const router = useRouter();
const emitter = inject("emitter");
const addRoleLoading = ref(false);
const roles = ref([]);
const route = useRoute();
const filter = reactive({
  name: "",
});
const alert = reactive({});
const items = [
  {
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    title: "Roles",
    to: "/dashboard/roles",
  },
];
const tooltip = {
  show: "Show Role Abilites",
  edit: "Edit Role",
  delete: "Delete Role",
};

const addRole = () => {
  addRoleLoading.value = true;
  router.push({ name: "dashboard-add-role" });
};

const editRole = (slug) => {
  emitter.emit("showLoading", true);
  router.push({ name: "dashboard-edit-role", params: { role: slug } });
};

const deleteRole = async ({ slug, name }) => {
  alert.title = `Confirmation Required`;
  alert.text = `<div class="mb-2">Are you sure you want to delete Role <span class="text-red text-capitalize font-weight-bold text-decoration-underline">${name}</span>?</div>This action is permanent and cannot be undone`;
  alert.extraData = slug;
  alert.dialog = true;
};
const deleteRoleForever = async ({ slug }) => {
  emitter.emit("showLoading", true);
  try {
    await axiosClient.delete(`/dashboard/roles/${slug}`).then((response) => {
      alert.dialog = false;
      roles.value = roles.value.filter((ele) => ele.slug !== slug);
      emitter.emit("alert", ["error", "deleted Role Successflly"]);
    });
  } catch (e) {
    console.error(e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const fetchRoles = async () => {
  try {
    await axiosClient
      .get(`/dashboard/roles?filter=${filter.name}`)
      .then((response) => {
        roles.value = response.data;
        console.log(roles.value);
      });
  } catch (e) {
    console.log("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const debouncedFetch = debounce(() => {
  fetchRoles();
  const query = {};
  if (filter.name) query.search = filter.name;
  router.push({ path: route.fullPath, query: query });
}, 750);

watch(
  () => filter,
  () => {
    emitter.emit("showLoading", true);
    debouncedFetch();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  debouncedFetch.cancel();
});

onMounted(async () => {
  emitter.emit("showLoading", true);
  filter.name = route.query.search ?? "";
  await fetchRoles();
});
</script>
