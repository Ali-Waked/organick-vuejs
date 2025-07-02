<template>
  <div class="home">
    <Banner />
    <OfferBanner />
    <AboutUs />
    <CategoriesSection />
    <TestimonialAndCounter />
    <ObberOfferOrganic />
    <WhoWeAre />
    <GallerySection />
    <!-- <NewsSection /> -->
    <SubscribeSection />
  </div>
</template>

<script setup>
import SubscribeSection from "@/components/front/global/SubscribeSection.vue";
import AboutUs from "@/components/front/home_page/AboutUs.vue";
import Banner from "@/components/front/home_page/Banner.vue";
import CategoriesSection from "@/components/front/home_page/CategoriesSection.vue";
import GallerySection from "@/components/front/home_page/GallerySection.vue";
import NewsSection from "@/components/front/home_page/NewsSection.vue";
import ObberOfferOrganic from "@/components/front/home_page/ObberOfferOrganic.vue";
import OfferBanner from "@/components/front/home_page/OfferBanner.vue";
import TestimonialAndCounter from "@/components/front/home_page/TestimonialAndCounter.vue";
import WhoWeAre from "@/components/front/home_page/WhoWeAre.vue";
import { useLoadingStore } from "@/stores/loading";
import { onMounted } from "vue";
onMounted(() => {
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss">
.home {
}
</style>
