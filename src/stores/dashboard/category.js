import { defineStore } from "pinia";
import axiosClient from "../../axiosClient";
import { useRouter } from "vue-router";
import { inject } from "vue";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [],
    allCategories: [],
    current_page: 1,
    last_page: 1,
    totalPage: 1,
    loading: false,
    router: useRouter(),
    filter: {},
    category: {
      name: "",
      description: "",
      is_active: 1,
      parent_id: "",
      image: "",
    },
    errors: {},
    emitter: inject("emitter"),
  }),
  actions: {
    async fetchCategories(page = 1, filter = {}) {
      this.filter = { ...filter };
      this.filter.status = this.filter.status[0];
      this.filter.sort_by = this.filter.sort_by[0];
      // this.router.push({ name: "dashboard-categories" });
      await axiosClient
        .get(
          `/dashboard/categories?page=${page}&filter=${JSON.stringify(
            this.filter
          )}`
        )
        .then((response) => {
          console.log("response", response);
          this.categories = response.data.data;
          this.totalPage = response.data.last_page;
          this.loading = false;
        })
        .catch((error) => console.error(error));
    },

    async showCategory(slug) {
      console.log("category geting ....");
      await axiosClient
        .get(`/dashboard/categories/${slug}`)
        .then((response) => {
          console.log("datais ", response.data);
          this.category = response.data;
        })
        .catch((error) => console.error("error not authorized"));
    },

    async addCategory(category) {
      this.loading = true;
      await axiosClient
        .post("/dashboard/categories", category, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          this.emitter.emit("alert", [
            "success",
            "Add New Category Successflly",
          ]);
          this.router.push({ name: "dashboard-categories" });
        })
        .catch((error) => {
          console.error(error);
          this.errors = error.response.data.errors ?? {};
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async updateCategory(category) {
      this.loading = true;
      await axiosClient
        .post(`/dashboard/categories/${this.category.slug}`, category, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          this.emitter.emit("alert", ["success", response.data.message]);
          this.router.push({ name: "dashboard-categories" });
        })
        .catch((error) => {
          console.error(error);
          this.errors = error.response.data.errors ?? {};
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async deleteCategory(slug) {
      await axiosClient
        .delete(`/dashboard/categories/${slug}`)
        .then((response) => {
          console.log(response.data);
          this.emitter.emit("alert", ["error", response.data.message]);
          // this.router.push({ name: "dashboard-categories" });
        })
        .catch((error) => {
          console.error(error);
          this.errors = error.response.data.errors ?? {};
        });
    },
    async getAllCategories(id = 0) {
      await axiosClient
        .get(`/dashboard/categories/all?except=${id}`)
        .then((response) => {
          this.allCategories = response.data;
        })
        .catch((error) => {
          console.error(error);
          this.errors = error.response.data.errors ?? {};
        });
    },
  },
});
