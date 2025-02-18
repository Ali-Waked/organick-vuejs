import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axiosClient";
import { useRouter } from "vue-router";

export const useProductStore = defineStore("product-front", () => {
  const data = ref({});
  const router = useRouter();
  const loading = ref(true);
  const getProducts = async () => {
    await axiosClient
      .get("/products")
      .then((response) => {
        // console.log(response.data);
        data.value = response.data.data;
      })
      .catch((e) => {
        console.error(e);
      });
    loading.value = false;
  };
  const show = async (slug) => {
    await axiosClient
      .get(`/products/${slug}`)
      .then((response) => {
        console.log(response);
        data.value = response.data;
        loading.value = false;
      })
      .catch((e) => {
        router.push({ name: "page-not-found" });
        // console.error("error", e);
      });
  };
  return {
    data,
    loading,
    getProducts,
    show,
  };
});
