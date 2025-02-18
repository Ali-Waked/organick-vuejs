<template>
  <div class="organic-only-videos section-padding position-relative">
    <div class="text text-center mx-auto">
      <HeaderSection
        header="Organic Only"
        title="Everyday Fresh & Clean"
        class="text-center"
      />
      <p class="open-sans mt-3">
        Simply dummy text of the printing and typesetting industry. Lorem had
        ceased to been the industry's standard dummy text ever since the
      </p>
    </div>
    <v-btn
      icon="mdi-play"
      color="#7EB693"
      width="72"
      height="72"
      elevation="12"
      class="position-absolute"
    ></v-btn>
  </div>
</template>

<script setup>
import HeaderSection from "@/components/front/global/HeaderSection.vue";
</script>

<style lang="scss">
.organic-only-videos {
  background-image: url("@/assets/images/video.jpg");
  background-size: cover;
  background-position: bottom;
  height: 600px;
  @media (max-width: 600px) {
    height: 500px;
  }
  .text {
    width: 45%;
    p {
      color: $arapawa;
      font-size: 15px;
    }
    @media (max-width: 1120px) {
      width: 60%;
    }
    @media (max-width: 720px) {
      width: 80%;
    }
    @media (max-width: 520px) {
      width: 90%;
    }
  }
  button {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    i {
      font-size: 42px;
    }
  }
}
</style>
