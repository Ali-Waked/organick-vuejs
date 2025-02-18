<template>
  <div class="banner-section d-flex position-relative">
    <h2 class="position-absolute roboto">Our Team</h2>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.banner-section {
  background-color: #e3f1e9;
  height: 350px;
  background: url("@/assets/images/our-team-image.jpg");
  background-size: cover;
  background-position: center;
  h2 {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 58px;
    color: $arapawa;
    font-weight: 900;
  }
}
</style>
