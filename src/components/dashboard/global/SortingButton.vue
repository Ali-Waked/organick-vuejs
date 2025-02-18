<template>
  <div class="d-flex align-center">
    <div class="ml-12 roboto">
      <button class="button-sort" @click="toggleSorting">
        <v-icon
          icon="mdi-arrow-up"
          :class="{ active: sortingOrder === 'asc' }"
        ></v-icon>
        <v-icon
          icon="mdi-arrow-down"
          :class="{ active: sortingOrder === 'desc' }"
        ></v-icon>
        <span class="text-uppercase">{{ sortingOrder }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sortingOrder: {
    type: String,
    default: "desc",
  },
});
const emit = defineEmits(["update:sortingOrder"]);
const toggleSorting = () => {
  emit("update:sortingOrder", props.sortingOrder === "asc" ? "desc" : "asc");
};
</script>

<style lang="scss" scoped>
.button-sort {
  span {
    color: $altamira;
    font-weight: 500;
    display: inline-block;
    margin-left: 4px;
  }
  i {
    color: $light-gray;
    font-size: 14px;
    padding: 0;
    margin: 0;
    &:last-of-type {
      margin-left: -4px;
    }
    &.active {
      color: $arapawa;
    }
  }
}
</style>
