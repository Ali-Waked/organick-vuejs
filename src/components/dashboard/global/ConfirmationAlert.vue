<template>
  <v-dialog v-model="dialog">
    <v-card class="mx-auto text-center pt-8 pb-4 card-dialog">
      <v-card-title class="roboto text-h4 text-grey-darken-3">{{
        title
      }}</v-card-title>
      <v-card-text class="py-2 text-grey-darken-1">
        {{ text }}
      </v-card-text>
      <v-card-actions class="pt-4">
        <v-btn @click="dialog = false" variant="tonal" color="grey"
          >cancel</v-btn
        >
        <slot name="action" :data="extraData" />
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
    default: "",
  },
  dialog: {
    type: Boolean,
  },
});
// const dialog = ref(true);
const emit = defineEmits("update:dialog");
const dialog = computed({
  get: () => props.dialog,
  set: (value) => emit("update:dialog", value),
});
</script>

<style lang="scss" scoped>
.card-dialog {
  min-width: 40%;
  padding: 25px;
  min-height: 250px;
  @media (max-width: 600px) {
    min-width: unset;
    padding: 8px;
  }
}
</style>
