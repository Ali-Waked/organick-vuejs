<template>
  <BannerSection title="Favorites" />
</template>

<script setup>
import BannerSection from "@/components/front/services_page/BannerSection.vue";
import { useLoadingStore } from "@/stores/loading";
import { onMounted } from "vue";
onMounted(() => {
  useLoadingStore().stopLoading();
});
</script>
