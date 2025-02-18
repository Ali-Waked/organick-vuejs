<template>
  <span class="social-media d-flex align-center gc-2">
    <v-icon
      :class="['main-transition', isHovering ? 'active' : '']"
      icon="mdi-instagram"
      style="--color-on-hover: #c13584"
    ></v-icon>
    <v-icon
      :class="['main-transition', isHovering ? 'active' : '']"
      icon="mdi-twitter"
      style="--color-on-hover: #33ccff"
    ></v-icon>
    <v-icon
      :class="['main-transition', isHovering ? 'active' : '']"
      icon="mdi-facebook"
      style="--color-on-hover: #3b5998"
    ></v-icon>
  </span>
</template>

<script setup>
defineProps({
  isHovering: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
i {
  color: $arapawa;
  font-size: 22px;
  &.active {
    color: var(--color-on-hover);
    rotate: 360deg;
  }
}
</style>
