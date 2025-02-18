import { defineStore } from "pinia";
import axiosClient from "../../axiosClient";
import { ref } from "vue";

export const useSubscribeForNewsStore = defineStore(
  "subscribe-for-news",
  () => {
    const errors = ref({});
    const message = ref("");

    const subscribeForNews = async (email) => {
      axiosClient
        .post(
          "/subscription",
          JSON.stringify({
            email: email,
          })
        )
        .then((response) => {
          console.log("response", response);
          if (response.status == "200") {
            message.value = response.data.message;
          }
          errors.value = {};
        })
        .catch((error) => {
          console.log("error", error);
          errors.value = error.response.data.errors ?? {};
        });
    };

    return {
      errors,
      message,
      subscribeForNews,
    };
  }
);
