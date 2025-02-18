<template>
  <div class="banner-section d-flex position-relative">
    <h2 class="position-absolute roboto">Shop Single</h2>
    <span class="shep"></span>
    <span class="shep"></span>
    <span class="shep"></span>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.banner-section {
  overflow: hidden;
  background-color: #f3f2f7;
  background-image: url("@/assets/images/single-shop.png");
  background-position: center;
  background-size: cover;
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
      &::before {
        content: url("@/assets/images/banner icon/Pattern.png");
        position: absolute;
        bottom: -200px;
        left: -100px;
      }
    }
    &:nth-of-type(2) {
      &::after {
        content: url("@/assets/images/banner icon/Pattern-two.png");
        position: absolute;
        bottom: -180px;
        left: 200px;
      }
      &::before {
        content: url("@/assets/images/banner icon/Pattern-three.png");
        position: absolute;
        bottom: 40px;
        left: 280px;
      }
    }
    &:last-of-type {
      &::after {
        content: url("@/assets/images/banner icon/Pattern-five.png");
        position: absolute;
        bottom: 10px;
        left: -200px;
      }
    }
  }
}
</style>
