<template>
  <v-app-bar class="responisve-app-nav">
    <v-container class="d-flex justify-space-between align-center">
      <v-app-bar-nav-icon class="nav-icon" @click="showLinks" />
      <div class="logo d-flex align-center gc-1 cursor-pointer" @click="showLoading, router.push({ name: 'home' })">
        <AppLogo width="35" height="35" />
        <span class="roboto">Organick</span>
      </div>

      <div v-if="authStore.isCustomer"
        class="cart position-relative d-flex justify-end pr-3 align-center cursor-pointer main-transition"
        @click="openCart">
        <v-icon icon="mdi-cart" class="position-absolute main-transition"></v-icon>
        <span>Cart ({{ items.length }})</span>
      </div>
      <div v-else-if="!isAuth"
        class="login position-relative d-flex justify-start pl-3 align-center cursor-pointer main-transition"
        @click="singIn">
        <span>Sign In</span>
        <v-icon icon="mdi-login" class="position-absolute main-transition"></v-icon>
      </div>
      <div v-else class="login position-relative d-flex justify-start pl-3 align-center cursor-pointer main-transition"
        @click="router.push({ name: 'dashboard', params: { role: 'admin' } })">
        <span style="font-size: 13px; position: relative;left: -4px;">Dashboard</span>
        <v-icon icon="mdi-view-dashboard-outline" class="position-absolute main-transition"></v-icon>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import AppLogo from "@/components/front/svgs/icons/AppLogo.vue";
import { storeToRefs } from "pinia";
import { inject } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth/auth";
import { useCartStore } from "../../../../stores/front/cart";

const router = useRouter();
const emitter = inject("emitter");
const { items } = storeToRefs(useCartStore());
const authStore = useAuthStore();
const { redirect, isAuth } = storeToRefs(authStore);
const showLinks = () => {
  emitter.emit("showLinks");
};
const openCart = () => {
  emitter.emit("openCart");
};
const singIn = () => {
  router.push({ name: "login" });
};
const showLoading = () => {
  emitter.emit("showLoading");
  window.scrollTo(0, 0);
};
</script>
<style lang="scss">
%icon-style {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #fff;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.responisve-app-nav {
  z-index: 1;

  .nav-icon {
    color: #274c5b;
    font-size: 18px;
  }

  .logo {
    :last-child {
      font-size: 28px;
      font-weight: bold;
      color: $arapawa;
    }
  }

  ul.links {
    a {
      font-weight: bold;
      font-size: 18px;
      text-transform: capitalize;
      color: $arapawa;

      &:hover {
        color: $green-sheen;
      }
    }
  }

  .search {
    width: 370px;

    input {
      width: 100%;
      height: 48px;
      background-color: #fafafa;
      border-radius: 25px;
      padding: 6px 45px 6px 18px;
      outline: none;
      color: $green-sheen;
    }

    i {
      @extend %icon-style;
      background-color: $green-sheen;
      right: 5px;
      font-size: 22px;
    }
  }

  .cart,
  .login {
    width: 112px;
    border: 1px solid #e0e0e0;
    height: 42px;
    border-radius: 25px;
    color: $arapawa;
    font-size: 16px;
    font-weight: 500;

    i {
      @extend %icon-style;
      background-color: $arapawa;
      font-size: 19px;
    }


    &:hover {
      color: $green-sheen;
    }

    &:hover i {
      background-color: $green-sheen;
    }
  }

  .cart {
    i {
      left: 5px;
    }
  }

  .login {
    i {
      right: 6px;
    }
  }
}
</style>
