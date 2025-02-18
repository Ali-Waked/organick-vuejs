<template>
  <DrawerAlert v-model:dialog="dialog" :title="title" :text="text">
    <template #action>
      <v-btn
        variant="outlined"
        color="red"
        append-icon="mdi-delete-forever"
        @click="$emit('delete', extraData)"
        >{{ deleteButtonLabel }}</v-btn
      >
    </template>
  </DrawerAlert>
</template>

<script setup>
import { computed, ref } from "vue";
import DrawerAlert from "./DrawerAlert.vue";

const props = defineProps({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  extraData: {
    type: Object,
  },
  dialog: {
    type: Boolean,
  },
  deleteButtonLabel: {
    type: String,
    default: "Delete Forever",
  },
});
// const dialog = ref(true);
const emit = defineEmits("update:dialog");
const dialog = computed({
  get: () => props.dialog,
  set: (value) => emit("update:dialog", value),
});
</script>
