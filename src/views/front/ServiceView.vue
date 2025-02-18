<template>
  <div class="service">
    <BannerSection />
    <OrganicServicesInformation />
    <OrganicOnlyVideos />
  </div>
</template>

<script setup>
import BannerSection from "@/components/front/services_page/BannerSection.vue";
import OrganicOnlyVideos from "@/components/front/services_page/OrganicOnlyVideos.vue";
import OrganicServicesInformation from "@/components/front/services_page/OrganicServicesInformation.vue";
import { useLoadingStore } from "@/stores/loading";
import { onMounted } from "vue";
onMounted(() => {
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss"></style>
