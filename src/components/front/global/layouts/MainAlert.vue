<template>
  <div :class="['alert',text?'show':'']">
    {{ text }}
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  }
})
</script>

<style scoped lang="scss">
.alert {
  background-color: #000000de;
  padding: 18px 24px 18px 10px;
  color: white;
  display: inline-block;
  min-width: 260px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  position: fixed;
  bottom: 8px;
  left: -100%;
  z-index: 10000;
  box-shadow: 1px 2px 13px 2px #00000036;
  text-transform: capitalize;
  cursor: default;
  transition: 0.5s;
  &.show{
    left:0px;
  }
}
</style>