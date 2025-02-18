<template>
  <div class="portfolio">
    <BannerSection />
    <AllItems />
    <SubscribeSection />
  </div>
</template>

<script setup>
import SubscribeSection from "@/components/front/global/SubscribeSection.vue";
import AllItems from "@/components/front/portfolio_page/AllItems.vue";
import BannerSection from "@/components/front/portfolio_page/BannerSection.vue";
import { useLoadingStore } from "@/stores/loading";
import { onMounted } from "vue";
onMounted(() => {
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss"></style>
