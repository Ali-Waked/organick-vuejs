<template>
  <div class="cities">
    <PageTitle title="Cities" :items />
    <FilterSection
      v-if="!loading"
      v-model:search="filter.name"
      search-label="Search By City Name"
      @add="addCity"
      btn-label="Add New City"
    />
    <TableData :data="cities" v-if="cities.length">
      <template #actions="{ item }">
        <ActionButtons
          @delete="deleteCity(item)"
          @edit="editCity(item.id)"
          @show="showCity(item)"
          :tooltip
        />
      </template>
    </TableData>
    <DeleteAlert
      :title="alert.title"
      :text="alert.text"
      v-model:dialog="alert.dialog"
      :extra-data="alert.extraData"
      @delete="deleteCityForever($event)"
    />
    <AddCity
      :data="city.data"
      v-model:dialog="city.dialog"
      @fetchCities="getCities"
    />
    <NoDataFound v-if="!loading && cities.length == 0" />
    <ShowCity :city="data.city" v-model:dialog="data.dialog" />
  </div>
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { inject, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import FilterSection from "@/components/dashboard/global/FilterSection.vue";
import TableData from "@/components/dashboard/city/TableData.vue";
import debounce from "lodash.debounce";
import axiosClient from "@/axiosClient";
import DeleteAlert from "@/components/dashboard/global/DeleteAlert.vue";
import ActionButtons from "@/components/dashboard/global/ActionButtons.vue";
import AddCity from "../../../components/dashboard/city/AddCity.vue";
import ShowCity from "../../../components/dashboard/city/ShowCity.vue";

const router = useRouter();
const emitter = inject("emitter");
const cities = ref([]);
const route = useRoute();
const filter = reactive({
  name: "",
});
const position = reactive({
  x: 0,
  y: 0,
});
// const addDialog = ref(true);
const city = reactive({
  id: "",
  dialog: false,
  data: {},
});
const data = reactive({
  city: {},
  dialog: false,
});
const showCity = async ({ id, name }) => {
  emitter.emit("showLoading", true);
  try {
    await axiosClient.get(`/dashboard/cities/${id}`).then((response) => {
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
      data.city = response.data;
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
const alert = reactive({});
const role = route.params.role;
const items = [
  {
    title: "Dashboard",
    to: `/${role}/dashboard`,
  },
  {
    title: "Cities",
    to: `/${role}/dashboard/cities`,
  },
];
const tooltip = {
  show: "Show City",
  edit: "Edit City",
  delete: "Delete City",
};

const addCity = () => {
  // addCityLoading.value = true;
  // router.push({ name: "dashboard-add-role" });
  city.data = {};
  city.id = "";
  city.dialog = true;
};

const editCity = async (id) => {
  emitter.emit("showLoading", true);
  await axiosClient
    .get(`/dashboard/cities/${id}`)
    .then((response) => {
      console.log(response);
      city.data = response.data;
      city.dialog = true;
    })
    .catch((e) => {
      console.error(e);
    });
  emitter.emit("showLoading", false);
};

const deleteCity = async ({ id, name }) => {
  alert.title = `Confirmation Required`;
  alert.text = `<div class="mb-2">Are you sure you want to delete City <span class="text-red text-capitalize font-weight-bold text-decoration-underline">${name}</span>?</div>This action is permanent and cannot be undone`;
  alert.extraData = id;
  alert.dialog = true;
};
const deleteCityForever = async (id) => {
  console.log(id);
  emitter.emit("showLoading", true);
  try {
    await axiosClient.delete(`/dashboard/cities/${id}`).then((response) => {
      alert.dialog = false;
      cities.value = cities.value.filter((ele) => ele.id !== id);
      emitter.emit("alert", ["error", "deleted City Successflly"]);
    });
  } catch (e) {
    console.error(e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const fetchCities = async () => {
  try {
    await axiosClient
      .get(`/dashboard/cities?filter=${JSON.stringify(filter)}`)
      .then((response) => {
        cities.value = response.data;
        console.log(cities.value);
      });
  } catch (e) {
    console.log("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const debouncedFetch = debounce(async () => {
  await fetchCities();
  const query = { ...router.currentRoute.value.query };
  if (filter.name) {
    query.search = filter.name;
  } else {
    delete query.search;
  }
  router.replace({ query: query });
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

const getCities = () => {
  emitter.emit("showLoading", true);
  fetchCities();
};

onMounted(async () => {
  emitter.emit("showLoading", true);
  filter.name = route.query.search ?? "";
  if (route.query.name && route.query.id) {
    await showCity(route.query);
  }
  // await debouncedFetch();
});
</script>
