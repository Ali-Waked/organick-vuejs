<template>
  <div class="about">
    <BannerSection />
    <AboutUs />
    <WhyChooseUs />
    <OurTeam />
    <WhatWeOfferforYou />
    <SubscribeSection />
  </div>
</template>

<script setup>
import AboutUs from "@/components/front/about_page/AboutUs.vue";
import BannerSection from "@/components/front/about_page/BannerSection.vue";
import OurTeam from "@/components/front/about_page/OurTeam.vue";
import WhatWeOfferforYou from "@/components/front/about_page/WhatWeOfferforYou.vue";
import WhyChooseUs from "@/components/front/about_page/WhyChooseUs.vue";
import SubscribeSection from "@/components/front/global/SubscribeSection.vue";
import { useLoadingStore } from "@/stores/loading";
import { onMounted } from "vue";
onMounted(() => {
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss"></style>
