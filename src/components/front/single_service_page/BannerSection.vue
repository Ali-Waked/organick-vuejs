<template>
  <div class="banner-section d-flex position-relative">
    <h2 class="position-absolute roboto">Quality Standard</h2>
    <span class="shep"></span>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.banner-section {
  overflow: hidden;
  background-color: #e3f1e9;
  min-height: 350px;
  background: url("@/assets/images/single_service/quality-standerd.png");
  background-size: cover;
  background-position: center;
  height: 380px;
  @media (max-width: 959px) {
    height: 350px;
    background-color: #f1edee;
    background-image: unset;
  }
  h2 {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 58px;
    color: $arapawa;
    font-weight: 900;
    text-wrap: nowrap;
  }
  span.shep {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &:first-of-type {
      &::after {
        content: url("@/assets/images/banner icon/Pattern-two.png");
        position: absolute;
        bottom: -140px;
        left: 280px;
      }
      &::before {
        content: url("@/assets/images/banner icon/Pattern.png");
        position: absolute;
        bottom: 20px;
        left: -380px;
      }
    }
  }
}
</style>
