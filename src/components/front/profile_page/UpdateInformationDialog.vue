<template>
  <v-dialog v-model="dialog" max-width="600px" v-if="cities.length">
    <v-card class="has-scroll">
      <v-card-title class="headline">{{ option.title }}</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="submit">
          <AvatarFiled
            :image="data.avatar_url"
            v-model:model-value="data.avatar"
            v-model:avatar-url="avatarUrl"
          />
          <v-text-field
            variant="outlined"
            type="text"
            required
            label="Frist Name"
            :error-messages="errors.first_name"
            v-model="data.first_name"
            class="text-left"
            color="#525C60"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            type="text"
            required
            label="Last Name"
            :error-messages="errors.last_name"
            v-model="data.last_name"
            class="text-left"
            color="#525C60"
          ></v-text-field>
          <v-select
            variant="outlined"
            type="text"
            required
            label="Gender"
            :error-messages="errors.gender"
            v-model="data.gender"
            class="text-left"
            :items="genderOptions"
            color="#525C60"
          ></v-select>
          <v-text-field
            variant="outlined"
            type="number"
            required
            label="Phone Number"
            :error-messages="errors['billing_address.phone_number']"
            v-model="data.billing_address.phone_number"
            class="text-left"
            color="#525C60"
          ></v-text-field>
          <v-select
            variant="outlined"
            type="text"
            required
            label="City"
            :error-messages="errors.city"
            v-model="cityId"
            class="text-left"
            :items="cities"
            color="#525C60"
          ></v-select>
          <v-text-field
            variant="outlined"
            type="text"
            required
            label="Street Address"
            :error-messages="errors['billing_address.street']"
            v-model="data.billing_address.street"
            class="text-left"
            color="#525C60"
          ></v-text-field>
          <v-textarea
            variant="outlined"
            type="text"
            required
            label="Note"
            :error-messages="errors['billing_address.notes']"
            v-model="data.billing_address.notes"
            class="text-left"
            color="#525C60"
            noResize
            rows="3"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="submit" :loading="loading">
          Update
        </v-btn>
        <v-btn text @click="dialog = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive, computed, onMounted, inject } from "vue";
import axiosClient from "@/axiosClient";
import { useCityStore } from "@/stores/front/city";
import { storeToRefs } from "pinia";
import AvatarFiled from "../../dashboard/global/AvatarFiled.vue";

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

const avatarUrl = ref("");
const emitter = inject("emitter");
const cityStore = useCityStore();
const { cities } = storeToRefs(cityStore);
const emit = defineEmits(["update:dialog", "fetch-profile"]);
const cityId = computed({
  get: () => props.data.billing_address?.city?.id ?? null,
  set: (val) => (props.data.billing_address.city.id = val),
});
const loading = ref(false);
const genderOptions = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
];
const option = {
  title: "Update Your Information",
  btnLabel: "Update",
  btnColor: "primary",
};
const dialog = computed({
  get: () => props.dialog,
  set: (value) => emit("update:dialog", value),
});
const form = ref(null);
const errors = ref([]);
const submit = async () => {
  loading.value = true;
  asignNullToEmptyFiled(props.data);
  try {
    props.data.billing_address.city_id = cityId.value;
    await axiosClient
      .post(
        "/profile",
        {
          _method: "PATCH",
          ...props.data,
        },
        {
          headers: { "content-type": "multipart/form-data" },
        }
      )
      .then((response) => {
        props.data.billing_address.city = getCityName(cityId.value);
        emitter.emit("showAlert", response.data.message);
      });
    emit("fetch-profile");
    emit("update:dialog", false);
    if (avatarUrl.value) {
      props.data.avatar_url = avatarUrl.value;
    }
  } catch (error) {
    // console.error(error);
    console.error(error, error.response.data.errors);
    errors.value = error.response.data.errors;
  } finally {
    loading.value = false;
  }
};
const getCityName = (cityId) => {
  const city = cities.value.find((opt) => opt.value === cityId);
  if (!city) return null;

  return { id: cityId, name: city.title.split("-")[0] };
};

const asignNullToEmptyFiled = (data) => {
  Object.keys(data).forEach((ele) => {
    if (data[ele] == "") {
      data[ele] = null;
    }
    if (typeof data[ele] == "object" && data[ele]) {
      asignNullToEmptyFiled(data[ele]);
    }
  });
};

onMounted(async () => {
  await cityStore.getCities();
  props.data.avatar = null;
  cityId.value = props.data.billing_address?.city?.id;
});
</script>

<style lang="scss" scoped>
.v-dialog {
  .v-card {
    padding: 16px;
  }

  .v-card-title {
    font-weight: bold;
    color: $arapawa;
    font-size: 24px;
  }

  .v-card-text {
    padding: 16px;
  }

  .v-card-actions {
    justify-content: space-between;
  }
}
</style>