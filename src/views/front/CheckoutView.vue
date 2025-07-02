<template>
  <div class="checkout mt-3">
    <v-row class="flex-column-reverse flex-md-row">
      <v-col cols="12" md="7" class="content-info">
        <v-stepper alt-labels v-model="stepper" elevation="0">
          <v-stepper-header class="elevation-0">
            <template v-for="(step, index) in steps" :key="index">
              <v-stepper-item :title="step.title" class="text-body-2" :color="getStepperColor(index)"
                :complete="stepper > step.value" :value="step.value"></v-stepper-item>
              <v-divider v-if="index < steps.length - 1" />
            </template>
          </v-stepper-header>
          <v-stepper-window class="window">
            <v-stepper-window-item :value="1">
              <ShippingAddressForm :errors :address="orderAddress" v-model:driveryPrice="driveryPrice" />
            </v-stepper-window-item>
            <v-stepper-window-item :value="2">
              <PaymentMethod v-model:method="pay_method" />
            </v-stepper-window-item>
            <v-stepper-window-item :value="3">
              <CompletedMessage />
            </v-stepper-window-item>
          </v-stepper-window>
          <div class="action d-flex justify-space-between align-center pb-4">
            <v-btn class="d-inline-block mr-auto ml-8 elevation-2" color="#274C5B" variant="flat" @click="stepper--"
              v-if="stepper == 2">Prev</v-btn>
            <v-btn class="d-inline-block ml-auto mr-8 elevation-2" color="#274C5B" variant="flat" v-if="stepper < 3"
              @click="nextStep" :loading>Next</v-btn>
          </div>
        </v-stepper>
        <v-divider v-for="n in 2" :key="n"></v-divider>
        <span class="copyrigth ml-8 d-block mt-4">All Rights Reserved Organick</span>
      </v-col>
      <v-col cols="12" md="5" class="bg-grey-lighten-2 pt-12" style="max-height: 100vh; overflow: auto">
        <CartSummary :items="cartItems" :total="totalPrice" :driveryPrice />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useLoadingStore } from "@/stores/loading";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/front/cart";
import { storeToRefs } from "pinia";
import { useCheckoutStore } from "@/stores/front/checkout";
import ShippingAddressForm from "@/components/front/checkout/ShippingAddressForm.vue";
import PaymentMethod from "@/components/front/checkout/PaymentMethod.vue";
import CartSummary from "@/components/front/checkout/CartSummary.vue";
import CompletedMessage from "../../components/front/checkout/CompletedMessage.vue";

const cartStore = useCartStore();
const { items, total } = storeToRefs(cartStore);
const checkoutStore = useCheckoutStore();
const { errors, orderAddress, pay_method, stepper, loading } =
  storeToRefs(checkoutStore);
const cartItems = ref([]);
const totalPrice = ref(0);
const driveryPrice = ref(0);
const router = useRouter();
const getStepperColor = (index) => {
  return stepper.value === index
    ? "#274C5B"
    : stepper.value > index
      ? "#7EB693"
      : "";
};

const steps = [
  { title: "Shipping Address", value: 1 },
  { title: "Payment Method", value: 2 },
  { title: "Completed", value: 3 },
];
const nextStep = async () => {
  // loading.value = true;
  if (stepper.value == 2) {
    return await checkout();
  }
  stepper.value++;
};
const checkout = async () => {
  await checkoutStore.checkout();
};

onMounted(async () => {
  stepper.value = 1;
  await cartStore.getItems();
  // console.log("cartitems", cartItems.value.length);
  // if (cartItems.value.length == 0) {
  //   return router.push({ name: "login" });
  //   return;
  // }
  totalPrice.value = JSON.parse(JSON.stringify(total.value));
  cartItems.value = JSON.parse(JSON.stringify(items.value));
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss" scoped>
.checkout {
  .content-info {
    min-height: 100vh;
  }

  .copyrigth {
    font-size: 10px;
    color: $altamira;
  }

  .window {
    height: 380px;

    @media (max-width: 599px) {
      height: unset;
      min-height: 380px;
    }
  }
}
</style>
