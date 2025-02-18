<template>
  <div class="billing-address" v-if="data">
    <h3>Billing Address</h3>
    <div>
      <div>
        <span>Phone Number</span>
        <span>{{ data.phone_number }}</span>
      </div>
      <div>
        <span>Street</span>
        <span>{{ data.street }}</span>
      </div>
      <div>
        <span>City</span>
        <span>{{ data.city }}</span>
      </div>
      <div>
        <span>Note</span>
        <span>{{ data.note }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
