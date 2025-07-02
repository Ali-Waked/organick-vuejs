<template>
  <div class="px-0 px-sm-8" v-if="!loading">
    <h2 class="roboto mb-4">Shipping Address</h2>
    <div class="d-flex flex-column flex-sm-row ga-4 open-sans mb-2 mt-8">
      <v-text-field variant="outlined" type="number" required label="Phone Number" v-model="address.phone_number"
        :error-messages="errors.phone_number" color="#525C60" class="input-filed" />
    </div>
    <div class="d-flex flex-column flex-sm-row ga-4 open-sans mb-2">
      <v-combobox variant="outlined" required label="City" v-model="address.city_id" :error-messages="errors.city_id"
        color="#525C60" :items="cities" class="input-filed" />
      <v-text-field variant="outlined" type="text" required label="Street" v-model="address.street"
        :error-messages="errors.street" color="#525C60" class="input-filed" />
    </div>
    <div class="d-flex flex-column flex-sm-row ga-4 open-sans mb-2">
      <v-textarea variant="outlined" type="text" required label="Note" :error-messages="errors.note"
        v-model="address.note" class="text-left" color="#525C60" noResize rows="3"></v-textarea>
    </div>
  </div>
  <LoadingProgressLinear v-if="loading" />
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import LoadingProgressLinear from "@/components/dashboard/global/LoadingProgressLinear.vue";
import { useCityStore } from "@/stores/front/city";
import { storeToRefs } from "pinia";

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

const cityStore = useCityStore();
const { cities, loading } = storeToRefs(cityStore);
const emit = defineEmits('update:driveryPrice');

watch(
  () => props.address.city_id,
  (newval) => {
    if (isNaN(newval) && newval != undefined) {
      console.log('newVal', newval);
      const match = newval.title.match(/\d+/);
      const number = match ? Number(match[0]) : null;
      emit('update:driveryPrice', number);
    }
  }
)

onMounted(async () => {
  await cityStore.getCities();
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
