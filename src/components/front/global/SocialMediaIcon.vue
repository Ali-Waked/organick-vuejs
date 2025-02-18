<template>
  <ul class="d-flex justify-center align-center ga-2" v-if="socials">
    <li v-if="socials.instagram">
      <v-icon
        class="main-transition"
        icon="mdi-instagram"
        style="--color-on-hover: #c13584"
        @click="goTo(socials.instagram)"
      ></v-icon>
    </li>
    <li v-if="socials.x">
      <v-icon
        class="main-transition"
        icon="mdi-twitter"
        style="--color-on-hover: #33ccff"
        @click="goTo(socials.x)"
      ></v-icon>
    </li>
    <li v-if="socials.facebook">
      <v-icon
        class="main-transition"
        icon="mdi-facebook"
        style="--color-on-hover: #3b5998"
        @click="goTo(socials.facebook)"
      ></v-icon>
    </li>
    <li v-if="socials.pinterest">
      <v-icon
        class="main-transition"
        icon="mdi-pinterest"
        style="--color-on-hover: #910101"
        @click="goTo(socials.pinterest)"
      ></v-icon>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  socials: {
    type: Object,
    default: {},
  },
});

const goTo = (link) => {
  window.location.href = link;
};
</script>

<style lang="scss" scoped>
ul {
  li {
    i {
      background-color: $hint-of-green;
      color: $arapawa;
      font-size: 22px;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        color: var(--color-on-hover);
        // transform: rotate(360deg);
        transform: rotate(360deg);
        background-color: unset;
        border: 1px solid var(--color-on-hover);
      }
    }
  }
}
</style>
