<template>
  <div
    class="box open-sans main-transition justify-space-between"
    @click="$emit('login')"
  >
    <p>
      Continue With
      <span class="yellowtai d-inline-block text-capitalize">{{ driver }}</span>
    </p>
    <!-- <img src="@/assets/images/google.jpg" alt="" /> -->
    <slot name="logo" />
  </div>
</template>

<script setup>
defineProps({
  driver: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.box {
  border: 1px solid inherit;
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: space-around;
  padding: 11px;
  cursor: pointer;
  border-radius: 80px;
  max-width: 400px;
  min-height: 70px;
  padding: 12px 55px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.85;
  font-weight: 500;
  font-size: 17px;
  &.border {
    border: 1px solid currentColor !important;
  }
  &:hover {
    opacity: 1;
  }
  img {
    width: 35px;
    border-radius: 50%;
  }
}
</style>
