<template>
  <div class="banner-section d-flex position-relative">
    <div class="image"></div>
    <h2 class="position-absolute roboto">About Us</h2>
    <div class="image"></div>
    <span class="shep"></span>
    <span class="shep"></span>
    <span class="shep"></span>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.banner-section {
  background-color: #f1edee;
  min-height: 350px;
  overflow: hidden;
  .image {
    height: 380px;
    width: 100%;
    &:first-of-type {
      background: url("@/assets/images/about/about-banner-left.png");
      background-position: left;
      background-size: cover;
    }
    &:last-of-type {
      background: url("@/assets/images/about/about-banner-right.png");
      background-position: center;
      background-size: cover;
    }
    @media (max-width: 959px) {
      display: none;
    }
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
        content: url("@/assets/images/banner icon/Pattern-zero.png");
        position: absolute;
        bottom: -200px;
        left: -540px;
      }
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
        bottom: -200px;
        left: 80px;
      }
      &::before {
        content: url("@/assets/images/banner icon/Pattern-three.png");
        position: absolute;
        bottom: 40px;
        left: 300px;
      }
    }
    &:last-of-type {
      &::after {
        content: url("@/assets/images/banner icon/Pattern-five.png");
        position: absolute;
        bottom: 10px;
        left: -150px;
      }
    }
  }
}
</style>
