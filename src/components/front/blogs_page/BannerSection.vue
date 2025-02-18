<template>
  <div class="banner-section d-flex position-relative">
    <h2 class="position-absolute roboto">Recent News</h2>
    <span class="shep"></span>
    <span class="shep"></span>
    <span class="shep"></span>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.banner-section {
  background: url("@/assets/images/blogs.png");
  background-color: #f8f8fa;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  height: 380px;
  @media (max-width: 959px) {
    background-color: #f1edee;
    height: 350px;
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
        bottom: -220px;
        left: 300px;
      }
      &::before {
        content: url("@/assets/images/banner icon/Pattern-three.png");
        position: absolute;
        bottom: 40px;
        left: 200px;
      }
    }
    &:last-of-type {
      &::after {
        content: url("@/assets/images/banner icon/Pattern-five.png");
        position: absolute;
        bottom: 10px;
        left: -380px;
      }
    }
  }
}
</style>
