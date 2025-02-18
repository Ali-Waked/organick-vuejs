<template>
  <div class="single-service">
    <BannerSection />
    <ContentOfService />
    <SubscribeSection />
  </div>
</template>

<script setup>
import SubscribeSection from "@/components/front/global/SubscribeSection.vue";
import BannerSection from "@/components/front/single_service_page/BannerSection.vue";
import ContentOfService from "@/components/front/single_service_page/ContentOfService.vue";
import { useLoadingStore } from "@/stores/loading";
import { onMounted } from "vue";
onMounted(() => {
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss"></style>
