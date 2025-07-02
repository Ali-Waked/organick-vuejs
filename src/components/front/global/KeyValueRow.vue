<template>
  <v-row>
    <v-col class="roboto title font-weight-bold" cols="6">{{ label }}</v-col>
    <v-col class="open-sans" cols="6">
      <slot />
    </v-col>
  </v-row>
</template>

<script setup>
defineProps({
  label: String,
});
</script>

<style lang="scss" scoped>
.roboto {
  &.title {
    font-weight: 500;
    color: $arapawa;
  }

  +.open-sans {
    color: $altamira;
  }
}

.info .v-row {
  &:not(:last-of-type) {
    border-bottom: 1px solid #55555526;
  }

  padding: 12px 8px;
  cursor: default;
  position: relative;
  transition: 0.5s;

  &::after {
    content: "";
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    width: 0px;
    transition: 0.5s;
    background-color: #99999914;
  }

  &:hover::after {
    width: 100%;
  }
}
</style>