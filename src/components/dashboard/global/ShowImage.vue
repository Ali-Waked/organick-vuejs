<template>
  <v-dialog
    class="d-flex align-center justify-center"
    width="100vw"
    height="100vh"
    v-model="dialog"
  >
    <div class="d-flex align-center justify-center ma-auto dialog">
      <img :src="imageSrc" :alt="fullName + ' photo'" />
    </div>
    <v-btn
      icon="mdi-close"
      color="#00000094"
      width="35px"
      height="35px"
      class="position-absolute right-0 top-0 text-white"
      @click="dialog = false"
    />
  </v-dialog>
  <!-- <v-card>Laravel {{ "" + modelValue }}</v-card> -->
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style lang="scss" scoped>
.dialog {
  max-width: 80vw;
  max-height: 80vh;
  img {
    max-height: 100%;
    max-width: 100%;
  }
  button {
    font-size: 12px;
  }
}
</style>
