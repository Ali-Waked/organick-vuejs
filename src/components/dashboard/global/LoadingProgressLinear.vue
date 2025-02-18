<template>
  <div class="loading text-center">
    <v-progress-linear indeterminate></v-progress-linear>
    <span class="text-h6 mt-2 d-block roboto">Loading...</span>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  position: absolute;
  width: 140px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 140px;
  color: $altamira;
}
</style>
