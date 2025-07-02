<template>
  <div class="shop roboto">
    <BannerSection />
    <ShopProducts />
    <SubscribeSection />
  </div>
</template>

<script setup>
import SubscribeSection from "@/components/front/global/SubscribeSection.vue";
import BannerSection from "@/components/front/shop_page/BannerSection.vue";
import ShopProducts from "@/components/front/shop_page/ShopProducts.vue";
import { useLoadingStore } from "@/stores/loading";
import { onMounted } from "vue";

onMounted(() => {
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss"></style>
