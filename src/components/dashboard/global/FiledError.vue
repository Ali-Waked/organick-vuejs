<template>
  <small v-if="error.length" class="error position-absolute bottom-0">{{
    error[0]
  }}</small>
</template>

<script setup>
defineProps({
  error: {
    type: Array,
    default: [],
  },
});
</script>

<style lang="scss">
small.error {
  color: #b00020;
  left: 6px;
}
</style>
