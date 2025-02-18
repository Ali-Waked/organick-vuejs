import { defineStore } from "pinia";
import axiosClient from "../../axiosClient";
import { useRouter } from "vue-router";
import { inject } from "vue";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    categories: [],
    current_page: 1,
    last_page: 1,
    totalPage: 1,
    loading: false,
    router: useRouter(),
    filter: {},
    product: {
      name: "",
      description: "",
      is_active: 1,
      category_id: "",
      price: "",
      image: "",
      discount: "",
      low_stock_threshold: "5",
      is_featured: 0,
      tags: [],
    },
    errors: {},
    emitter: inject("emitter"),
  }),
  actions: {
    async fetchProduct(page = 1, filter = {}) {
      this.filter = { ...filter };
      this.filter.status = this.filter.status[0];
      this.filter.sort_by = this.filter.sort_by[0];
      // this.router.push({ name: "dashboard-categories" });
      await axiosClient
        .get(
          `/dashboard/products?page=${page}&filter=${JSON.stringify(
            this.filter
          )}`
        )
        .then((response) => {
          console.log(response);
          this.products = response.data.data;
          this.totalPage = response.data.meta.last_page;
          this.loading = false;
        })
        .catch((error) => console.error(error));
    },
    async fetchTrashedProduct(page = 1, filter = {}) {
      this.filter = { ...filter };
      this.filter.sort_by = this.filter.sort_by[0];
      delete this.filter.status;
      await axiosClient
        .get(
          `/dashboard/products/trash?page=${page}&filter=${JSON.stringify(
            this.filter
          )}`
        )
        .then((response) => {
          console.log(response.data.last_page);
          this.products = response.data.data;
          this.totalPage = response.data.last_page;
          this.loading = false;
        })
        .catch((error) => console.error(error));
    },

    async showProduct(slug) {
      await axiosClient
        .get(`/dashboard/products/${slug}`)
        .then((response) => {
          console.log("datais ", response.data);
          this.product = response.data;
        })
        .catch((error) => console.error("error not authorized"));
    },

    async addProduct(product) {
      // console.log(typeof category, category);
      this.loading = true;
      await axiosClient
        .post("/dashboard/products", product, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          this.emitter.emit("alert", [
            "success",
            "Add New Product Successflly",
          ]);
          this.router.push({ name: "dashboard-products" });
        })
        .catch((error) => {
          console.error(error);
          this.errors = error.response.data.errors ?? {};
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async updateProduct(product) {
      // console.log(typeof category, category);
      await axiosClient
        .post(`/dashboard/products/${this.product.slug}`, product, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          this.emitter.emit("alert", ["success", response.data.message]);
          this.router.push({ name: "dashboard-products" });
        })
        .catch((error) => {
          console.error(error);
          this.errors = error.response.data.errors ?? {};
        });
    },
    async deleteProduct(slug) {
      await axiosClient
        .delete(`/dashboard/products/${slug}`)
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
    async restoreProduct(id) {
      await axiosClient
        .put(`/dashboard/products/${id}/restore`)
        .then((response) => {
          this.emitter.emit("alert", ["success", response.data.message]);
          // this.router.push({ name: "dashboard-categories" });
        })
        .catch((error) => {
          console.error(error);
          this.errors = error.response.data.errors ?? {};
        });
    },
    async deleteProductForever(id) {
      await axiosClient
        .delete(`/dashboard/products/${id}/force-delete`)
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
  },
});
