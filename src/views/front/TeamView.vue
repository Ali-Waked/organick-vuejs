<template>
  <div class="team">
    <BannerSection />
    <OurTeam :numbers="6" />
    <SubscribeSection />
  </div>
</template>

<script setup>
import OurTeam from "@/components/front/about_page/OurTeam.vue";
import SubscribeSection from "@/components/front/global/SubscribeSection.vue";
import BannerSection from "@/components/front/team_page/BannerSection.vue";
import { useLoadingStore } from "@/stores/loading";
import { onMounted } from "vue";
onMounted(() => {
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss"></style>
