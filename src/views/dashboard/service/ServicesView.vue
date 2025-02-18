<template>
  <div class="services">
    <PageTitle title="Services" :items />
    <FilterSection
      v-if="!loading"
      v-model:search="filter.name"
      search-label="Search By Service Name"
      :show-button="false"
    />
    <TableData :data="services" v-if="services.length">
      <template #actions="{ item }">
        <ActionButton
          icon="mdi-wrench"
          color="#274C5B"
          background-color="#274c5b17"
          @click="editService(item.slug)"
          tooltip="Edit Service Configration"
        />
      </template>
    </TableData>

    <NoDataFound v-if="!loading && services.length == 0" />
  </div>
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { inject, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import FilterSection from "@/components/dashboard/global/FilterSection.vue";
import TableData from "@/components/dashboard/service/TableData.vue";
import debounce from "lodash.debounce";
import axiosClient from "@/axiosClient";
import ActionButton from "@/components/dashboard/global/ActionButton.vue";

const router = useRouter();
const emitter = inject("emitter");
const services = ref([]);
const route = useRoute();
const filter = reactive({
  name: "",
});
const items = [
  {
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    title: "Services",
  },
];

const editService = (slug) => {
  emitter.emit("showLoading", true);
  router.push({ name: "dashboard-edit-service", params: { service: slug } });
};

const fetchServices = async () => {
  try {
    await axiosClient
      .get(
        `/dashboard/services?filter=${JSON.stringify({ search: filter.name })}`
      )
      .then((response) => {
        services.value = response.data;
        console.log(services.value);
      });
  } catch (e) {
    console.log("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const debouncedFetch = debounce(() => {
  fetchServices();
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
  await fetchServices();
});
</script>
