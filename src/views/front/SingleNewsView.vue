<template>
  <div class="single-news">
    <NewsDetails />
    <SubscribeSection />
  </div>
</template>

<script setup>
import SubscribeSection from "@/components/front/global/SubscribeSection.vue";
import NewsDetails from "@/components/front/single_news/NewsDetails.vue";
import { useLoadingStore } from "@/stores/loading";
import { onMounted } from "vue";
onMounted(() => {
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss"></style>
