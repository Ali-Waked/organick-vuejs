<template>
  <div class="service-box-info">
    <div class="box text-right">
      <div
        class="icon position-relative d-flex align-center justify-end ml-auto"
      >
        <img :src="icon" class="position-relative" alt="" />
      </div>
      <div class="title">{{ title }}</div>
      <div class="description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  description: String,
});
</script>

<style lang="scss" scoped>
.service-box-info {
  .box {
    .icon {
      // background-color: $cultured;
      border-radius: 16px;
      width: 60px;
      height: 60px;
      // margin: auto;
      &::after {
        content: "";
        position: absolute;
        top: 55%;
        left: 68%;
        background-color: #fef1c2;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        z-index: 1;
      }
      img {
        z-index: 5;
      }
    }
    .title {
      color: $arapawa;
      font-size: 22px;
      font-weight: 500;
    }
    .description {
      color: $altamira;
      font-size: 15px;
    }
  }
}
</style>
