<template>
  <div class="news">
    <BannerSection />
    <v-container>
      <v-row justify="center" class="gr-sm-16 gr-md-0 gr-lg-12 my-12">
        <v-col cols="12" sm="8" md="8" lg="6" v-for="n in data" :key="n.id" class="mb-sm-4 mb-md-0">
          <SingleNews :news="n" />
        </v-col>
      </v-row>
      <pre>
      {{ data }}
      </pre>
    </v-container>
    <SubscribeSection />
  </div>
</template>

<script setup>
import BannerSection from "@/components/front/news_page/BannerSection.vue";
import SingleNews from "@/components/front/global/SingleNews.vue";
import SubscribeSection from "@/components/front/global/SubscribeSection.vue";
import { useLoadingStore } from "@/stores/loading";
import { onMounted, ref } from "vue";
import axiosClient from '@/axiosClient';
const data = ref({});
onMounted(() => {
  axiosClient.get('/news').then(response => {
    data.value = response.data.data;
  }).catch(e => console.error(e)).finally(() => {
    useLoadingStore().stopLoading();
  })
});
</script>

<style lang="scss"></style>
