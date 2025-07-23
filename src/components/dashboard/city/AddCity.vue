<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition">
    <v-card min-width="350" max-width="40%" class="mx-auto text-center pt-8 pb-4 px-4">
      <v-card-title class="roboto text-h4 text-grey-darken-3">{{
        option.title
        }}</v-card-title>
      <v-card-text>
        <v-text-field variant="outlined" type="text" required label="City Name" :error-messages="errors.name"
          v-model="city.name" class="text-left" color="#525C60"></v-text-field>
        <v-text-field variant="outlined" type="number" required label="Dirvery Price"
          :error-messages="errors.driver_price" v-model="city.driver_price" color="#525C60"
          class="text-left"></v-text-field>
      </v-card-text>
      <v-card-actions class="pt-4">
        <v-btn @click="submit" variant="tonal" :loading :color="option.btnColor">{{ option.btnLabel }}</v-btn>
        <v-btn @click="$emit('update:dialog', false)" variant="tonal" color="grey">cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, inject, onMounted, reactive, ref, watch } from "vue";
import LoadingProgressLinear from "../global/LoadingProgressLinear.vue";
import axiosClient from "@/axiosClient";

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
});

const city = reactive({
  id: "",
  name: "",
  driver_price: "",
});

const emitter = inject("emitter");
const errors = ref([]);
const loading = ref(false);
const isAddPage = computed(() => isNaN(props.data.id));

// const dialog = ref(true);
const emit = defineEmits(["update:dialog", "fetchCities"]);
const dialog = computed({
  get: () => props.dialog,
  set: (value) => emit("update:dialog", value),
});

const option = computed(() => {
  console.log("isupdate city" + isAddPage.value + props.data.id);
  return {
    title: isAddPage.value ? "Add City" : "Update City",
    btnLabel: isAddPage.value ? "Add Now" : "Update Now",
    btnColor: isAddPage.value ? "green" : "orange",
  };
});

watch(
  () => props.data,
  (newData) => {
    city.id = newData.id || "";
    city.name = newData.name || "";
    city.driver_price = newData.driver_price || "";
    errors.value = [];
  },
  { immediate: true }
);

const submit = () => {
  loading.value = true;
  if (isAddPage.value) {
    addCity();
  } else {
    updateCity();
  }
};

const addCity = () => {
  axiosClient
    .post("/dashboard/cities", JSON.stringify(city))
    .then((response) => {
      emit("update:dialog", false);
      emit("fetchCities");
      emitter.emit("alert", ["success", "Add New City Successflly"]);
    })
    .catch((e) => {
      errors.value = e.response.data.errors;
    })
    .finally(() => {
      loading.value = false;
    });
};

const updateCity = () => {
  axiosClient
    .put(`/dashboard/cities/${city.id}`, JSON.stringify(city))
    .then((response) => {
      emit("update:dialog", false);
      emit("fetchCities");
      emitter.emit("alert", ["success", "Update City Successflly"]);
    })
    .catch((e) => {
      errors.value = e.response.data.errors;
      console.error(e);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
