<template>
  <v-navigation-drawer temporary v-model="navDrawer" width="320">
    <v-sheet>
      <div class="logo d-flex align-center pl-5 py-6 gc-1 cursor-pointer" @click="router.push({ name: 'home' })">
        <AppLogo width="35" height="40" />
        <span class="roboto">Organick</span>
      </div>
      <v-divider />
      <ul class="links roboto d-flex flex-column justify-center gc-6">
        <li class="main-transition position-relative underline-on-hover cursor-pointer">
          <router-link class="main-transition" :to="{ name: 'home' }" @click="showLoading">home</router-link>
        </li>
        <li class="main-transition position-relative underline-on-hover cursor-pointer">
          <router-link class="main-transition" :to="{ name: 'about' }" @click="showLoading">about</router-link>
        </li>
        <li class="main-transition position-relative underline-on-hover cursor-pointer">
          <router-link class="main-transition" :to="{ name: 'shop' }" @click="showLoading">shop</router-link>
        </li>
        <!-- <li
          class="main-transition position-relative underline-on-hover cursor-pointer"
        >
          <router-link
            class="main-transition"
            :to="{ name: 'services' }"
            @click="showLoading"
            >services</router-link
          >
        </li> -->
        <li class="main-transition position-relative underline-on-hover cursor-pointer">
          <router-link class="main-transition" :to="{ name: 'news' }" @click="showLoading">news</router-link>
        </li>
      </ul>
    </v-sheet>
  </v-navigation-drawer>
</template>

<script setup>
import AppLogo from "@/components/front/svgs/icons/AppLogo.vue";
import { inject, onMounted, ref } from "vue";
const emitter = inject("emitter");
const navDrawer = ref(false);
const showLoading = () => {
  emitter.emit("showLoading");
  window.scrollTo(0, 0);
};
onMounted(() => {
  emitter.on("showLinks", () => {
    navDrawer.value = !navDrawer.value;
  });
});
</script>

<style scoped lang="scss">
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

    a {
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
