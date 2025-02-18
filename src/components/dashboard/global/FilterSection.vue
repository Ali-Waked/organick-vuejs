<template>
  <div class="filter-section">
    <div
      class="filter d-flex flex-column-reverse flex-lg-row align-start align-lg-center justify-space-between"
    >
      <div
        class="d-flex flex-column flex-md-row align-start align-md-center justify-space-between mt-n2 mt-lg-0"
      >
        <v-text-field
          :label="searchLabel"
          variant="outlined"
          color="#525C60"
          class="mt-8"
          style="width: 350px"
          v-model="searchValue"
          type="search"
        ></v-text-field>
        <slot name="options" />
      </div>
      <v-btn
        v-if="showButton && btnLabel"
        :text="btnLabel"
        :append-icon="btnIcon"
        class="text-none mt-4 mt-lg-0"
        color="#274C5B"
        height="56px"
        :loading="addDataLoading"
        @click="$emit('add')"
      ></v-btn>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  search: {
    type: String,
    default: "",
  },
  searchLabel: {
    type: String,
    default: "search",
  },
  btnLabel: {
    type: String,
    default: null,
  },
  btnIcon: {
    type: String,
    default: "mdi-plus",
  },
  addDataLoading: Boolean,
  showButton: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["update:search"]);

const searchValue = computed({
  get: () => props.search,
  set: (value) => emit("update:search", value),
});
</script>

<style lang="scss" scoped>
.filter {
  button {
    font-size: 16px;
  }
}
</style>
