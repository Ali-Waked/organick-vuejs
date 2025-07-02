<template>
  <v-layout class="position-relative">
    <NavDrawer v-if="showResponsiveNav" />
    <CartDrawer />
    <AppNav
      v-if="!showResponsiveNav"
      :class="
        isFixed ? 'position-fixed elevation-6' : 'position-absolute elevation-0'
      "
    />
    <ResponsiveAppNav
      v-if="showResponsiveNav"
      :class="
        isFixed ? 'position-fixed elevation-6' : 'position-absolute elevation-0'
      "
    />
    <v-main>
      <v-dialog v-model="loading" persistent fullscreen>
        <v-progress-circular
          indeterminate
          color="#7EB693"
          bg-color="#525C60"
          size="80"
          width="6"
          class="position-absolute"
          style="
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 100006;
          "
          v-if="loading"
        ></v-progress-circular>
      </v-dialog>
      <slot></slot>
      <MainAlert :text />
    </v-main>
    <AppFooter />
  </v-layout>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import AppFooter from "./AppFooter.vue";
import AppNav from "./AppNav.vue";
import ResponsiveAppNav from "./ResponsiveAppNav.vue";
import NavDrawer from "./NavDrawer.vue";
import CartDrawer from "./CartDrawer.vue";
import { useLoadingStore } from "@/stores/loading";
import { storeToRefs } from "pinia";
import MainAlert from "./MainAlert.vue";

const loadingStore = useLoadingStore();
const { loading } = storeToRefs(loadingStore);
const isFixed = ref(false);

const text = ref('');

// const loading = false;
const emitter = inject("emitter");
const showResponsiveNav = ref(false);

const resizeWindow = () => {
  if (window.innerWidth <= 1160) {
    showResponsiveNav.value = true;
  } else {
    showResponsiveNav.value = false;
  }
};
const scrollWindow = () => {
  if (window.scrollY >= 100) {
    isFixed.value = true;
  } else {
    isFixed.value = false;
  }
};
onMounted(() => {
  resizeWindow();
  window.addEventListener("resize", resizeWindow);
  window.addEventListener("scroll", scrollWindow);
  emitter.on("showLoading", () => {
    loadingStore.startLoading();
    // getCurrentInstance().appContext.config.globalProperties.loading =
    // loading.value = true;
  });
  emitter.on('showAlert',(value)=>{
    text.value = value;
    setTimeout(() => {
      text.value = ''
    }, 8000);
  })
});
</script>

<style lang="scss"></style>
