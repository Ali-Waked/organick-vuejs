<template>
  <div class="filter-option">
    <v-btn
      :id="btnId"
      class="text-none rounded-pill"
      elevation="0"
      color="#525C60"
      height="54"
      variant="outlined"
      rounded="bill"
      >{{ btnLabel }}: <span class="">{{ modelValue[0] }}</span></v-btn
    >
    <v-menu :activator="`#${btnId}`" location="bottom">
      <v-list
        v-model:selected="dataSelected"
        color="#525C60"
        mandatory
        bg-color="#F9F8F8"
      >
        <v-list-item
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :title="option.title"
          link
        ></v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  btnId: {
    type: String,
    required: true,
  },
  btnLabel: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:sortBy"]);

// selectedSortBy: String,
// const sortBy = props.sortBy;
const dataSelected = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style lang="scss" scoped>
button {
  font-size: 16px;
}
</style>
