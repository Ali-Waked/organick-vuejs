<template>
  <v-item-group
    selected-class="bg-blue-lighten-5 opacity-100"
    mandatory
    class="d-flex flex-wrap ga-4 align-center justify-center mt-12"
    v-model="method"
  >
    <template v-for="payMethod in paymentMethods" :key="payMethod.id">
      <v-item
        v-slot="{ isSelected, selectedClass, toggle }"
        :value="payMethod.slug"
      >
        {{ payMethod.slug }}
        <v-card
          variant="outlined"
          :color="isSelected ? 'blue-lighten-3' : 'grey'"
          :class="[
            'd-inline-flex align-center justify-center flex-column ga-2 card-method opacity-70',
            selectedClass,
          ]"
          @click="
            toggle;
            console.log(payMethod.slug);
          "
        >
          <img :src="payMethod.icon" :alt="payMethod.name" />
          <span
            :class="[
              'payment-name text-capitalize roboto',
              isSelected ? 'text-blue' : '',
            ]"
            >{{ payMethod.name }}</span
          >
        </v-card>
      </v-item>
    </template>
    {{ method }}
  </v-item-group>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axiosClient from "@/axiosClient";
import { useCheckoutStore } from "@/stores/front/checkout";
import { storeToRefs } from "pinia";

const { loading } = storeToRefs(useCheckoutStore());
// const payment_method = ref("cash");
const props = defineProps({
  paymentMethod: {
    type: String,
    default: "cod",
  },
});
const paymentMethods = ref([]);
const emit = defineEmits(["update:paymentMethod"]);
const method = computed({
  get: () => props.paymentMethod,
  set: (value) => emit("update:paymentMethod", value),
});

onMounted(async () => {
  loading.value = true;
  await axiosClient
    .get("/payment-methods")
    .then((response) => {
      console.log(response.data);
      paymentMethods.value = response.data;
    })
    .catch((e) => console.error(e))
    .finally(() => {
      loading.value = false;
    });
});
</script>

<style lang="scss" scoped>
.card-method {
  height: 130px;
  width: 180px;
  border-radius: 8px;
  .payment-name {
    color: $arapawa;
    font-size: 20px;
    font-weight: 500;
  }
  img {
    max-width: 70px;
    max-height: 45px;
  }
}
</style>
