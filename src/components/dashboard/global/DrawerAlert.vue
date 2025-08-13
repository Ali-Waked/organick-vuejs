<template>
  <v-dialog v-model="dialog">
    <v-card
      min-width="250"
      max-width="40%"
      class="mx-auto text-center pt-8 pb-4 px-4"
    >
      <v-card-title class="roboto text-h4 text-grey-darken-3">{{
        title
      }}</v-card-title>
      <v-card-text class="py-2 text-grey-darken-1" v-html="text"> </v-card-text>
      <v-card-actions class="pt-4">
        <v-btn @click="dialog = false" variant="tonal" color="grey"
          >cancel</v-btn
        >
        <slot name="action" :extraData="extraData" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  extraData: {
    type: Object,
    default: () => ({}),
  },
  dialog: {
    type: Boolean,
  },
});
// const dialog = ref(true);
const emit = defineEmits(["update:dialog"]);
const dialog = computed({
  get: () => props.dialog,
  set: (value) => emit("update:dialog", value),
});
</script>
