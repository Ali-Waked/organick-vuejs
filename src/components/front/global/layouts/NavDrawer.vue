<template>
  <v-navigation-drawer temporary v-model="navDrawer" width="320">
    <v-sheet class="has-scroll">
      <div class="logo d-flex align-center pl-5 py-6 gc-1 cursor-pointer" @click="router.push({ name: 'home' })">
        <AppLogo width="35" height="40" />
        <span class="roboto">Organick</span>
      </div>
      <v-divider />
      <ul class="links roboto d-flex flex-column justify-center gc-6">
        <li class="main-transition position-relative underline-on-hover cursor-pointer">
          <router-link class="main-transition" :to="{ name: 'home' }" @click="showLoading">
            <v-icon icon="mdi-home" class="mr-2" />
            home
          </router-link>
        </li>
        <li class="main-transition position-relative underline-on-hover cursor-pointer">
          <router-link class="main-transition" :to="{ name: 'about' }" @click="showLoading">
            <v-icon icon="mdi-information-outline" class="mr-2" />
            about
          </router-link>
        </li>
        <li class="main-transition position-relative underline-on-hover cursor-pointer">
          <router-link class="main-transition" :to="{ name: 'shop' }" @click="showLoading">
            <v-icon icon="mdi-cart-outline" class="mr-2" />
            shop
          </router-link>
        </li>
        <template v-if="isAuth">

          <template v-if="authStore.isCustomer">
            <li v-for="page in pages" :key="page.title"
              class="open-sans main-transition position-relative underline-on-hover d-flex align-center cursor-pointer">
              <router-link class="main-transition" :to="page.link" @click="showLoading">
                <v-icon :icon="page.icon" class="mr-2" />
                {{ page.title }}
              </router-link>
            </li>
          </template>
          <li class="open-sans main-transition position-relative underline-on-hover d-flex align-center cursor-pointer"
            v-if="authStore.isAdmin">
            <router-link class="main-transition" :to="{ name: 'dashboard', params: { role: 'admin' } }"
              @click="showLoading">
              <v-icon icon="mdi-view-dashboard-outline" class="mr-2" />
              Dashboard
            </router-link>

          </li>
          <li class="main-transition position-relative underline-on-hover cursor-pointer"
            @click="showLoading(); logout()">

            <span class="logout"><v-icon icon="mdi-logout" class="mr-2" /> logout</span>

          </li>
        </template>
        <li class="main-transition position-relative underline-on-hover cursor-pointer">
          <router-link class="main-transition" :to="{ name: 'news' }" @click="showLoading">
            <v-icon icon="mdi-newspaper" class="mr-2" />
            news
          </router-link>
        </li>
      </ul>
    </v-sheet>
  </v-navigation-drawer>
</template>

<script setup>
import AppLogo from "@/components/front/svgs/icons/AppLogo.vue";
import { useAuthStore } from "@/stores/auth/auth";
import { storeToRefs } from "pinia";
import { inject, onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import { useLoadingStore } from "@/stores/loading";
const emitter = inject("emitter");
const navDrawer = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const { redirect } = storeToRefs(authStore);
const { isAuth } = storeToRefs(authStore);
const showLoading = () => {
  emitter.emit("showLoading");
  window.scrollTo(0, 0);
};
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
const logout = async () => {
  await authStore.logout();
  useLoadingStore().stopLoading();
  if (redirect) {
    router.push({ name: "home" });
  }
};
onMounted(() => {
  emitter.on("showLinks", () => {
    navDrawer.value = !navDrawer.value;
  });
});
</script>

<style lang="scss">
.v-navigation-drawer__content {
  &::-webkit-scrollbar {
    width: 2px !important;
    border-radius: 12px !important;
  }

  &::-webkit-scrollbar-track {
    background: $hint-of-green;
  }

  &::-webkit-scrollbar-thumb {
    background: $light-gray;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: $green-sheen;
  }
}
</style>
<style lang="scss" scoped>
.logo {
  :last-child {
    font-size: 26px;
    font-weight: 600;
    color: $arapawa;
  }
}

ul.links {
  li {
    padding: 16px 25px;
    border-bottom: 1px solid #274c5b2e;

    a,
    .logout {
      font-weight: 500;
      font-size: 18px;
      text-transform: capitalize;
      color: $arapawa;
      display: block;

      &.router-link-exact-active {
        pointer-events: none;
        color: $green-sheen;
        cursor: default;
      }
    }

    &:hover {
      a {
        color: $green-sheen;
      }
    }

    &::after {
      bottom: -2px;
      left: 0%;
      transform: translateX(0);
    }

    &:has(a.router-link-exact-active) {
      &::after {
        width: 100%;
      }
    }
  }
}
</style>
