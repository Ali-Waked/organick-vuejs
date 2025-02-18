<template>
  <div class="action-buttons d-flex align-center justify-center">
    <div>
      <v-icon
        icon="mdi-autorenew"
        style="--color: #ff9500; --background-color: #fff3e0"
        class="cursor-pointer main-transition"
        @click="$emit('restore')"
      />
      <v-tooltip activator="parent" location="top">{{
        tooltip.restore
      }}</v-tooltip>
    </div>
    <div>
      <v-icon
        icon="mdi-delete-forever"
        style="--color: #f44336; --background-color: #ffebee"
        class="cursor-pointer main-transition"
        @click="$emit('force-delete')"
      />
      <v-tooltip activator="parent" location="top">{{
        tooltip.forceDelete
      }}</v-tooltip>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tooltip: {
    type: Object,
    default: {
      restore: "Restore",
      forceDelete: "Delete Forever",
    },
  },
});
</script>
