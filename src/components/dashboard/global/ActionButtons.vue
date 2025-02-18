<template>
  <div class="action-buttons d-flex align-center justify-center">
    <div>
      <v-icon
        icon="mdi-eye"
        style="--color: #4caf50; --background-color: #e5f5e9"
        class="cursor-pointer main-transition"
        @click="$emit('show')"
      />
      <v-tooltip activator="parent" location="top">{{
        tooltip.show
      }}</v-tooltip>
    </div>
    <div>
      <v-icon
        icon="mdi-pen"
        style="--color: #ff9500; --background-color: #fff3e0"
        class="cursor-pointer main-transition"
        @click="$emit('edit')"
      />
      <v-tooltip activator="parent" location="top">{{
        tooltip.edit
      }}</v-tooltip>
    </div>
    <div>
      <v-icon
        icon="mdi-delete"
        style="--color: #f44336; --background-color: #ffebee"
        class="cursor-pointer main-transition"
        @click="$emit('delete')"
      />
      <v-tooltip activator="parent" location="top">{{
        tooltip.delete
      }}</v-tooltip>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tooltip: {
    type: Object,
    default: {
      show: "Show",
      edit: "Edit",
      delete: "Delete",
    },
  },
});
</script>
