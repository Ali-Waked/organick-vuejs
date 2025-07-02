<template>
  <div class="banner-section d-flex position-relative">
    <h2 class="position-absolute roboto">{{ title }}</h2>
    <span class="shep"></span>
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
  background-color: #f1edee;
  height: 380px;

  @media (max-width: 959px) {
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

    @media screen and (max-width: 959px) {
      font-size: 36px;
    }

    @media screen and (max-width: 600px) {
      font-size: 28px;
    }
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
        left: -200px;
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
        left: -400px;
      }
    }
  }
}
</style>
