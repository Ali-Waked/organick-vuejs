import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axiosClient";
import { useCartStore } from "./cart";
import { loadStripe } from "@stripe/stripe-js";

export const useCheckoutStore = defineStore("checkout", () => {
  const orderAddress = ref({});
  const stepper = ref(1);
  const pay_method = ref("cod");

  const errors = ref({});
  const loading = ref(false);
  const checkout = async () => {
    try {
      loading.value = true;
      const response = await axiosClient.post("/checkout", {
        ...orderAddress.value,
        country: orderAddress.value.country.value,
        pay_method: pay_method.value,
      });
      // .then((response) => {
      console.log(response);
      if ((response.status = 201)) {
        // useCartStore().empty();
        if (response.data.payment_method_details.name == "stripe") {
          const stripe = await new loadStripe(
            response.data.payment_method_details.publishable_key
          );
          const result = await stripe.redirectToCheckout({
            sessionId: response.data.payment_method_details.transaction_id,
          });
          if (result.error) {
            console.error(result.error.message);
          }
        }
        if (response.data.payment_method_details.name == "paypal") {
          window.location.href =
            response.data.payment_method_details.transaction_url;
        }

        errors.value = {};
        orderAddress.value = {};
        stepper.value = 3;
      }
    } catch (error) {
      console.error("error", error);
      stepper.value = 1;
      errors.value = error.response.data.errors;
    } finally {
      loading.value = false;
    }
    // })
    // .catch((error) => {
    //   console.error("error", error);
    //   stepper.value = 1;
    //   errors.value = error.response.data.errors;
    // });
  };
  return {
    orderAddress,
    stepper,
    checkout,
    pay_method,
    errors,
    loading,
  };
});
