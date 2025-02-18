<template>
  <div>
    <v-icon
      :icon
      :style="getStyle"
      class="cursor-pointer main-transition"
      @click="$emit('click')"
    />
    <v-tooltip activator="parent" location="top" v-if="tooltip">{{
      tooltip
    }}</v-tooltip>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  tooltip: {
    type: String,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    required: true,
  },
});
const getStyle = computed(() => {
  return {
    "--color": props.color,
    "--background-color": props.backgroundColor,
  };
});
</script>
