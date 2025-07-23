<template>
  <v-app-bar class="app-nav">
    <v-container class="d-flex justify-space-between align-center">
      <div class="logo d-flex align-center gc-1 cursor-pointer" @click="showLoading, router.push({ name: 'home' })">
        <AppLogo width="35" height="50" />
        <span class="roboto">Organick</span>
      </div>
      <ul class="links roboto d-flex justify-center align-center gc-6">
        <li>
          <router-link class="main-transition position-relative underline-on-hover" :to="{ name: 'home' }"
            @click="showLoading">home</router-link>
        </li>
        <li>
          <router-link class="main-transition position-relative underline-on-hover" :to="{ name: 'about' }"
            @click="showLoading">about</router-link>
        </li>
        <li>
          <router-link class="main-transition position-relative underline-on-hover" :to="{ name: 'shop' }"
            @click="showLoading">shop</router-link>
        </li>
        <!-- <li>
          <router-link
            class="main-transition position-relative underline-on-hover"
            :to="{ name: 'services' }"
            @click="showLoading"
            >services</router-link
          >
        </li> -->
        <li v-if="isAuth" class="open-sans">
          <button class="main-transition position-relative underline-on-hover d-flex align-center" id="pagesId"
            to="/my">
            <!-- :to="{ name: 'services' }"
            @click="showLoading" -->
            <span>My Account</span>
            <v-icon icon="mdi-chevron-down" style="font-size: 18px" />
          </button>
          <v-menu activator="#pagesId" location="bottom" width="140px">
            <v-list v-model:selected="selected" mandatory bg-color="#fff" elevation="1" class="mt-3">
              <template v-if="authStore.isCustomer">
                <v-list-item v-for="page in pages" :key="page.title" :to="page.link" class="pa-2 pl-4 list-item-link"
                  link>
                  <v-icon :icon="page.icon" class="mr-2" />
                  {{ page.title }}
                </v-list-item>
              </template>
              <v-list-item v-if="authStore.isAdmin"
                @click="router.push({ name: 'dashboard', params: { role: 'admin' } })" class="pa-2 pl-4 list-item-link"
                link>
                <v-icon icon="mdi-view-dashboard-outline" class="mr-3" />
                <span>Dashboard</span>
              </v-list-item>
              <v-list-item @click="logout" class="pa-2 pl-5 list-item-link" link>
                <v-icon icon="mdi-logout" class="mr-2" />
                logout
              </v-list-item>
            </v-list>
          </v-menu>
        </li>
        <li>
          <router-link class="main-transition position-relative underline-on-hover" :to="{ name: 'news' }"
            @click="showLoading">news</router-link>
        </li>
      </ul>
      <div class="d-flex justify-center align-center roboto">
        <div class="search position-relative" id="search">
          <input type="search" v-model="search" @input="getSearchData" />
          <v-icon icon="mdi-magnify" class="position-absolute"></v-icon>
        </div>
        <SearchResultsList id="#search" v-model:search="search" :loading :results />
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
        <div v-else
          class="login position-relative d-flex justify-start pl-3 align-center cursor-pointer main-transition"
          @click="router.push({ name: 'dashboard', params: { role: 'admin' } })">
          <span style="font-size: 13px; position: relative;left: -4px;">Dashboard</span>
          <v-icon icon="mdi-view-dashboard-outline" class="position-absolute main-transition"></v-icon>
        </div>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import AppLogo from "@/components/front/svgs/icons/AppLogo.vue";
import { storeToRefs } from "pinia";
import { inject, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/front/cart";
import { useAuthStore } from "@/stores/auth/auth";
import axiosClient from "../../../../axiosClient";
import SearchResultsList from "./SearchResultsList.vue";
import debounce from "lodash.debounce";
const { items } = storeToRefs(useCartStore());

const search = ref("");
const router = useRouter();
const emitter = inject("emitter");
const authStore = useAuthStore();
const { redirect } = storeToRefs(authStore);
const { isAuth } = storeToRefs(authStore);
const loading = ref(true);
const results = ref({});

const selected = ref("");

const pages = [
  {
    title: "Profile",
    link: "/my-profile",
    icon: "mdi-account-outline",
  },
  {
    title: "Orders",
    link: "/my-orders",
    icon: "mdi-truck-delivery-outline",
  },
  {
    title: "Favorite",
    link: "/my-favorites",
    icon: "mdi-heart-outline",
  },
  {
    title: "Live Chat",
    link: "/chat",
    icon: "mdi-chat-outline",
  },
];



// methods

const debouncedFetch = debounce(async () => {
  await axiosClient.get(`/search?q=${search.value}`).then(response => {
    results.value = response.data;
  }).catch(e => results.value = e.response.data.message).finally(() => loading.value = false);
}, 750);

const getSearchData = async () => {
  loading.value = true;
  debouncedFetch();
}
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

const logout = async () => {
  await authStore.logout();
  if (redirect) {
    router.push({ name: "home" });
  }
};
</script>

<style scoped lang="scss">
%icon-style {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: #fff;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.app-nav {
  padding: 12px 0;
  z-index: 1;

  .logo {
    :last-child {
      font-size: 35px;
      font-weight: bold;
      color: $arapawa;
    }
  }

  ul.links {

    a,
    button {
      font-weight: bold;
      font-size: 18px;
      text-transform: capitalize;
      color: $arapawa;

      &:hover {
        color: $green-sheen;
      }

      &.router-link-exact-active {
        pointer-events: none;
        color: $green-sheen;

        &::after {
          width: 100%;
        }
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
    width: 120px;
    border: 1px solid #e0e0e0;
    height: 48px;
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

.list-item-link {
  color: $arapawa;
}
</style>
