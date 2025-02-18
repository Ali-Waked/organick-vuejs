<template>
  <v-card :color="backgroundColor" class="position-fixed card">
    <v-icon :icon />
    <span class="text-capitalize">{{ message }}</span>
  </v-card>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: "mdi-check-circle",
  },
  backgroundColor: {
    type: String,
    default: "green",
  },
  message: {
    type: String,
    required: true,
  },
});
</script>
<style scoped lang="scss">
.card {
  padding: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 2000000000000;
  top: 12px;
  right: -100%;
  transition: 1s;
  &.active {
    right: 4px;
  }
}
</style>
