<template>
  <v-card :class="['box', theam]">
    <v-icon :icon />
    <div class="flex-1-1 text-center">
      <span class="number roboto">{{ number }}</span>
      <p class="roboto text-capitalize">{{ title }}</p>
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  theam: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.box {
  height: 140px;
  display: flex;
  align-items: center;
  column-gap: 30px;
  max-width: 320px;
  // justify-content: center;
  // border-bottom: 2px solid black;
  padding: 12px;
  i {
    font-size: 64px;
  }
  span.number {
    font-size: 46px;
  }
  p {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
