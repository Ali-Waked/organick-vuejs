import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axiosClient";

export const useCategoryStore = defineStore("category-front", () => {
  const categories = ref({});
  const getCategories = async () => {
    await axiosClient
      .get("/categories")
      .then((response) => {
        categories.value = response.data;
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return {
    categories,
    getCategories,
  };
});
