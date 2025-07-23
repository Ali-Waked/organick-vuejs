<template>
  <div class="single-news">
    <NewsDetails :news="data" />
    <SubscribeSection />
  </div>
</template>

<script setup>
import SubscribeSection from "@/components/front/global/SubscribeSection.vue";
import NewsDetails from "@/components/front/single_news/NewsDetails.vue";
import { useLoadingStore } from "@/stores/loading";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axiosClient from '@/axiosClient';

const data = ref({});
const route = useRoute();

onMounted(() => {
  const newsId = route.params.news;
  axiosClient.get(`/news/${newsId}`).then(response => {
    data.value = response.data;
  }).catch(e => console.error(e)).finally(() => {
    useLoadingStore().stopLoading();
  });
});
</script>

<style lang="scss"></style>
