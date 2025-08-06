// stores/auth.js
import { defineStore } from "pinia";
import axiosClient from "@/axiosClient";
import { useRouter } from "vue-router";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {},
    loading: false,
    errors: "",
    // router: useRouter(),
    redirect: false,
    isAuth: false,
  }),
  getters: {
    isAdmin: (state) => state.user && state.user.type === 'admin',
    isDriver: (state) => state.user && state.user.type === 'driver',
    isModerator: (state) => state.user && state.user.type === 'moderator',
    isCustomer: (state) => state.user && state.user.type === 'customer',
    isAuthenticated: (state) => state.isAuth,
    getUser: (state) => state.user,
    getErrors: (state) => state.errors,
    isLoading: (state) => state.loading,
  },
  actions: {
    async login(credentials) {
      this.loading = true;
      await this.getCsrfToken();
      await axiosClient
        .post("/login", credentials)
        .then((response) => {
          if (response.status === 200) {
            this.isAuth = true;
            this.redirect = true;
          }
        })
        .catch((e) => {
          console.log(e);
          this.errors = e.response.data.errors;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async register(email, password, name) {
      try {
        const response = await axios.post("/api/register", {
          email,
          password,
          name,
        });
        this.user = response.data.user;
        this.token = response.data.token;
        this.errors = null;
        // Store the token in localStorage or cookies if needed
        localStorage.setItem("token", this.token);
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
    async forgotPassword(email) {
      try {
        await axios.post("/api/forgot-password", { email });
        // Handle success (e.g., show a message to the user)
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
    async resetPassword(token, password) {
      try {
        await axios.post("/api/reset-password", { token, password });
        // Handle success (e.g., redirect to login page)
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
    async logout() {
      await this.getCsrfToken();
      await axiosClient.post("/logout").then((response) => {
        if (response.status === 204) {
          this.user = null;
          this.isAuth = false;
          this.redirect = true;
          this.loading = false;
        }
      });
    },
    async getCsrfToken() {
      await axios
        .get("http://localhost/sanctum/csrf-cookie", {
          withCredentials: true,
        })
        .then((response) => { });
    },
    // isAdmin() {
    //   return this.isAuth && this.user.type == 'admin'
    // },
    // isDriver() {
    //   return this.isAuth && this.user.type == 'driver'
    // },
    // isModerator() {
    //   return this.isAuth && this.user.type == 'moderator'
    // },
    // isCustomer() {
    //   return this.isAuth && this.user.type == 'customer'
    // },
    // isAuth() {
    //   return localStorage.getItem("isAuth") ? true : false;
    // },
    async loginWith(driver) {
      await this.getCsrfToken();
      axiosClient
        .get(`/api/auth/${driver}/redirect`)
        .then((response) => {
          if (response.status === 200) {
            this.isAuth = true;
            this.redirect = true;
          }
        })
        .catch((e) => {
          console.error("error", e);
        });
    },
    async checkAuth() {
      try {
        await this.getCsrfToken();
        const response = await axiosClient.get("/auth/user");
        if (response.status === 200) {
          this.isAuth = true;
          this.user = response.data; // Assuming user data is returned
        }
      } catch (error) {
        this.isAuth = false; // If verification fails, set isAuth to false
        this.user = null;
      }
    },
  },
});
