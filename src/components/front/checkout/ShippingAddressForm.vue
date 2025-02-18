<template>
  <div class="px-0 px-sm-8" v-if="!loading">
    <h2 class="roboto mb-4">Shipping Address</h2>
    <div class="d-flex flex-column flex-sm-row ga-4 open-sans mb-2 mt-8">
      <v-text-field
        variant="outlined"
        type="number"
        required
        label="Phone Number"
        v-model="address.phone_number"
        :error-messages="errors.phone_number"
        color="#525C60"
        class="input-filed"
      />
      <v-combobox
        variant="outlined"
        required
        label="Country"
        v-model="address.country"
        :error-messages="errors.country"
        color="#525C60"
        :items
        class="input-filed"
      />
    </div>
    <div class="d-flex flex-column flex-sm-row ga-4 open-sans mb-2">
      <v-text-field
        variant="outlined"
        type="text"
        required
        label="City"
        v-model="address.city"
        :error-messages="errors.city"
        color="#525C60"
        class="input-filed"
      />
      <v-text-field
        variant="outlined"
        type="text"
        required
        label="State"
        v-model="address.state"
        :error-messages="errors.state"
        color="#525C60"
        class="input-filed"
      />
    </div>
    <div class="d-flex flex-column flex-sm-row ga-4 open-sans mb-2">
      <v-text-field
        variant="outlined"
        type="text"
        required
        label="Street"
        v-model="address.street"
        :error-messages="errors.street"
        color="#525C60"
        class="input-filed"
      />
      <v-text-field
        variant="outlined"
        type="text"
        required
        label="Postal Code"
        v-model="address.postal_code"
        :error-messages="errors.postal_code"
        color="#525C60"
        class="input-filed"
      />
    </div>
  </div>
  <LoadingProgressLinear v-if="loading" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import axiosClient from "@/axiosClient";
import LoadingProgressLinear from "@/components/dashboard/global/LoadingProgressLinear.vue";

const props = defineProps({
  address: {
    type: Object,
    default: {},
  },
  errors: {
    type: Object,
    default: {},
  },
});

const items = ref([]);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  await axiosClient
    .get("/countries")
    .then((response) => {
      // Object.keys(response.data.countries).forEach
      const countries = response.data.countries;
      // const country = ref([]);
      for (let key in response.data.countries) {
        // if (response.data.userInfrmation?.country == key) {
        //   country.value = countries[key];
        // }
        items.value.push({
          title: countries[key],
          value: key,
        });
      }
      props.address.city = response.data.userInfrmation?.city ?? null;
      if (response.data.userInfrmation?.country) {
        props.address.country = {
          title: countries[response.data.userInfrmation.country] ?? null,
          value: response.data.userInfrmation.country ?? null,
        };
      }
    })
    .catch((e) => {
      console.error(e);
      // window.location.reload();
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>

<style lang="scss" scoped>
h2 {
  color: $arapawa;
}
.input-filed {
  width: 50%;
  @media (max-width: 600px) {
    width: 100%;
  }
}
</style>
