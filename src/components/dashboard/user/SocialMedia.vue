<template>
  <span class="social-media d-flex align-center gc-2">
    <v-hover v-slot="{ isHovering, props }" v-if="socials.instagram">
      <v-icon
        :class="['main-transition', isHovering ? 'active' : '']"
        icon="mdi-instagram"
        style="--color-on-hover: #c13584"
        v-bind="props"
        @click="goTo(socials.instagram)"
      ></v-icon>
    </v-hover>

    <v-hover v-slot="{ isHovering, props }" v-if="socials.x">
      <v-icon
        :class="['main-transition x', isHovering ? 'active' : '']"
        icon="mdi-alpha-x-box"
        style="--color-on-hover: black"
        v-bind="props"
        @click="goTo(socials.x)"
      ></v-icon>
    </v-hover>

    <v-hover v-slot="{ isHovering, props }" v-if="socials.facebook">
      <v-icon
        :class="['main-transition', isHovering ? 'active' : '']"
        icon="mdi-facebook"
        style="--color-on-hover: #3b5998"
        v-bind="props"
        @click="goTo(socials.facebook)"
      ></v-icon>
    </v-hover>
  </span>
</template>

<script setup>
defineProps({
  socials: {
    type: Object,
    required: true,
  },
});

const goTo = (link) => {
  window.location.href = link;
};
</script>

<style lang="scss" scoped>
i {
  color: $arapawa;
  font-size: 24px;
  cursor: pointer;
  &.x {
    font-size: 26px;
  }
  &.active {
    color: var(--color-on-hover);
    rotate: 360deg;
  }
}
</style>
