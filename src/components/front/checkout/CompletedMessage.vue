<template>
  <v-card
    elevation="0"
    color="#EFF6F1"
    class="text-center mx-auto my-auto pa-4"
    max-width="560"
  >
    <v-card-title class="roboto title"
      >Thank you for your purchase!</v-card-title
    >
    <v-card-text class="pa-0">
      <v-icon icon="mdi-check-circle-outline" color="#7EB693" class="text-h1" />
    </v-card-text>
    <v-card-text class="open-sans" style="color: #444">
      Your order has been successfully placed. We truly appreciate your trust in
      us and can't wait to deliver your items to you. A confirmation email with
      your order details has been sent to your email. If you have any questions
      or need assistance, feel free to reach out to our support team. Enjoy your
      new purchase!</v-card-text
    >
    <v-card-actions class="justify-center">
      <v-btn
        variant="flat"
        color="#274C5B"
        text="Continue Shopping"
        height="50px"
        width="200px"
        @click="showLoading"
      />
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useCheckoutStore } from "../../../stores/front/checkout";
import { storeToRefs } from "pinia";

const router = useRouter();
const { stepper } = storeToRefs(useCheckoutStore());

const showLoading = () => {
  router.push({ name: "home" });
  stepper.value = 1;
};
</script>
<style lang="scss">
.title {
  color: #274c5b;
  font-size: 28px;
  font-weight: 600;
  @media (max-width: 600px) {
    font-size: 20px;
  }
}
</style>
