<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition">
    <v-card min-width="350" max-width="40%" class="mx-auto text-center pt-8 pb-4 px-4">
      <v-card-title class="roboto text-h4 text-grey-darken-3">{{
        option.title
      }}</v-card-title>
      <v-card-text>
        <v-select variant="outlined" type="text" required label="Select Driver" :error-messages="errors.driver_id"
          v-model="driver" :items="drivers" class="text-left" color="#525C60"></v-select>
        <!-- <v-text-field variant="outlined" type="number" required label="Dirvery Price"
          :error-messages="errors.driver_price" v-model="city.driver_price" color="#525C60"
          class="text-left"></v-text-field> -->
      </v-card-text>
      <v-card-actions class="mt-n5">
        <v-btn @click="submit" variant="tonal" :loading :color="option.btnColor">{{ option.btnLabel }}</v-btn>
        <v-btn @click="$emit('update:dialog', false)" variant="tonal" color="grey">cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, inject, isVNode, onMounted, reactive, ref, watch } from "vue";
import LoadingProgressLinear from "../global/LoadingProgressLinear.vue";
import axiosClient from "@/axiosClient";
import { useUserStore } from "../../../stores/dashboard/user";
import { useAuthStore } from "../../../stores/auth/auth";
import { storeToRefs } from "pinia";

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
  },
  driverId: {
    type: Number,
    default: null,
  },
});

const drivers = ref({});

const emitter = inject("emitter");
const errors = ref([]);
const loading = ref(false);
const isAddPage = computed(() => isNaN(parseInt(props.driverId)));
const driver = ref(null);

// const dialog = ref(true);
const emit = defineEmits(["update:dialog", "fetchOrder"]);
const dialog = computed({
  get: () => props.dialog,
  set: (value) => emit("update:dialog", value),
});

const option = computed(() => {
  driver.value = props.driverId;

  return {
    title: isAddPage.value ? "Assign To Driver" : "Driver Appointment Update",
    btnLabel: isAddPage.value ? "Assign" : "Update",
    btnColor: isAddPage.value ? "green" : "orange",
  };
});

// watch(
//   () => props.data,
//   (newData) => {
//     city.id = newData.id || "";
//     city.name = newData.name || "";
//     city.driver_price = newData.driver_price || "";
//     errors.value = [];
//   },
//   { immediate: true }
// );

const submit = () => {
  loading.value = true;
  // if (isAddPage.value) {
  assignToDriver();
  // } else {
  // updateDriver();
  // }
};

const assignToDriver = () => {
  axiosClient
    .post(`/dashboard/orders/${props.orderNumber}/assign-to-driver`, JSON.stringify({
      _method: 'PUT',
      driver_id: driver.value,
    }))
    .then((response) => {
      emit("update:dialog", false);
      emit("fetchOrder");
      emitter.emit("alert", ["success", isAddPage.value ? 'Assigned To Driver Succssflly' : 'Update Appointment To Driver Succssflly']);
    })
    .catch((e) => {
      errors.value = e.response.data.errors;
    })
    .finally(() => {
      loading.value = false;
    });
};

// const updateDriver = () => {
//   axiosClient
//     .put(`/dashboard/cities/${city.id}`, JSON.stringify(city))
//     .then((response) => {
//       emit("update:dialog", false);
//       emit("fetchCities");
//       emitter.emit("alert", ["success", "Update City Successflly"]);
//     })
//     .catch((e) => {
//       errors.value = e.response.data.errors;
//       console.error(e);
//     })
//     .finally(() => {
//       loading.value = false;
//     });
// };

onMounted(() => {
  driver.value = props.driverId;
  console.log("Driver ID:", props.driverId, typeof props.driverId);
  axiosClient.get('/dashboard/users/driver/fetch-all').then((response) => {
    drivers.value = [];
    response.data.forEach(driver => {
      drivers.value.push({
        title: `${driver.first_name} ${driver.last_name}`,
        value: driver.id,
      });
    });
    console.log(response, props.driverId, drivers.value);
  }).catch((error) => {
    console.error("Error fetching drivers:", error);
  });
})
</script>
