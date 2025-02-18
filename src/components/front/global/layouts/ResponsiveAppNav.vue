<template>
  <v-app-bar class="responisve-app-nav">
    <v-container class="d-flex justify-space-between align-center">
      <v-app-bar-nav-icon class="nav-icon" @click="showLinks" />
      <div
        class="logo d-flex align-center gc-1 cursor-pointer"
        @click="showLoading, router.push({ name: 'home' })"
      >
        <AppLogo width="35" height="35" />
        <span class="roboto">Organick</span>
      </div>
      <div
        class="cart position-relative d-flex justify-end pr-3 align-center cursor-pointer main-transition"
        @click="openCart"
      >
        <v-icon icon="mdi-cart" class="position-absolute"></v-icon>
        <span>Cart ({{ items.length }})</span>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import AppLogo from "@/components/front/svgs/icons/AppLogo.vue";
import { storeToRefs } from "pinia";
import { inject } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../../../../stores/front/cart";

const router = useRouter();
const emitter = inject("emitter");
const { items } = storeToRefs(useCartStore());
const showLinks = () => {
  emitter.emit("showLinks");
};
const openCart = () => {
  emitter.emit("openCart");
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
  .cart {
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
      left: 5px;
    }
    &:hover {
      color: $green-sheen;
    }
    &:hover i {
      background-color: $green-sheen;
    }
  }
}
</style>
