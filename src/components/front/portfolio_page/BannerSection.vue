<template>
  <div class="banner-section d-flex position-relative">
    <div class="image"></div>
    <h2 class="position-absolute roboto">{{ title }}</h2>
    <div class="image"></div>
    <span class="shep"></span>
    <span class="shep"></span>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.banner-section {
  overflow: hidden;
  .image {
    height: 380px;
    width: 100%;
    &:first-of-type {
      background: url("@/assets/images/portfolio-left-image.png");
      background-position: left;
      background-size: cover;
    }
    &:last-of-type {
      background: url("@/assets/images/portfolio-right-image.png");
      background-position: right center;
      background-size: cover;
    }
    @media (max-width: 959px) {
      display: none;
    }
  }
  @media (max-width: 959px) {
    height: 350px;
    background-color: #f1edee;
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
        bottom: -200px;
        left: 120px;
      }
      &::before {
        content: url("@/assets/images/banner icon/Pattern.png");
        position: absolute;
        bottom: 20px;
        left: -250px;
      }
    }
    &:last-of-type {
      &::after {
        content: url("@/assets/images/banner icon/Pattern-five.png");
        position: absolute;
        bottom: -220px;
        left: -220px;
      }
    }
  }
}
</style>
