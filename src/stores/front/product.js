import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axiosClient";
import { useRouter } from "vue-router";

export const useProductStore = defineStore("product-front", () => {
  const data = ref({});
  const search = ref({
    name: '',
  });
  const router = useRouter();
  const loading = ref(true);
  const totalPage = ref(1);
  const page = ref(1);
  const getProducts = async () => {
    loading.value = true;
    await axiosClient
      .get(`/products?filter=${JSON.stringify(search.value)}&page=${page.value}`)
      .then((response) => {
        console.log(response.data);
        data.value = response.data.data;
        page.value = response.data.current_page;
        totalPage.value = response.data.last_page;
      })
      .catch((e) => {
        console.error(e);
      });
    loading.value = false;
  };

  // const filterProducts = async () => {
  //   try {
  //     await axiosClient.get(`/products?filter=${JSON.stringify(search.value)}&page=${page.value}`)
  //       .then((response) => {
  //         data.value = response.data.data;
  //         page.value = response.data.current_page;
  //         totalPage.value = response.data.last_page;
  //       })
  //   } catch {

  //   } finally {
  //     loading.value = false;
  //   }
  // }
  const show = async (slug) => {
    await axiosClient
      .get(`/products/${slug}`)
      .then((response) => {
        console.log(response);
        data.value = response.data;
        loading.value = false;
      })
      .catch((e) => {
        // router.push({ name: "page-not-found" });
        console.error(e);
        // console.error("error", e);
      });
  };
  return {
    data,
    loading,
    search,
    totalPage,
    page,
    getProducts,
    // filterProducts,
    show,
  };
});
