<template>
  <div class="header-section">
    <span class="yellowtail">{{ header }}</span>
    <h3 class="roboto" :style="{ color: titleColor }">{{ title }}</h3>
  </div>
</template>

<script setup>
defineProps({
  header: String,
  title: String,
  titleColor: {
    type: String,
    default: "#274C5B",
  },
});
</script>
<style scoped lang="scss">
.header-section {
  span {
    color: $green-sheen;
    font-size: 30px;
  }
  h3 {
    // color: $arapawa;
    font-size: 44px;
    // line-height: 1.4;
  }
}
// media

@media (max-width: 959px) {
  .header-section {
    span {
      font-size: 28px;
    }
    h3 {
      font-size: 40px;
      // line-height: 1.4;
    }
  }
}
@media (max-width: 600px) {
  .header-section {
    span {
      font-size: 23px;
    }
    h3 {
      font-size: 28px;
      // line-height: 1.4;
    }
  }
}
</style>
