<template>
  <div class="single-portfolio">
    <PortfolioDetails />
    <SubscribeSection />
  </div>
</template>

<script setup>
import SubscribeSection from "@/components/front/global/SubscribeSection.vue";
import PortfolioDetails from "@/components/front/single_portfolio_page/PortfolioDetails.vue";
import { useLoadingStore } from "@/stores/loading";
import { onMounted } from "vue";
onMounted(() => {
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss"></style>
