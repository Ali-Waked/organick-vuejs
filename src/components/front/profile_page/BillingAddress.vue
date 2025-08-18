<template>
  <div class="billing-address" v-if="data">
    <h3 class="open-sans">Billing Address</h3>
    <div class="box mx-auto">
      <div class="row">
        <span class="roboto">Phone Number:</span>
        <span class="open-sans">{{ data.phone_number ?? "UN" }}</span>
      </div>
      <div class="row">
        <span class="roboto">Street:</span>
        <span class="open-sans">{{ data.street ?? "UN" }}</span>
      </div>
      <div class="row">
        <span class="roboto">City:</span>
        <span class="open-sans">{{ data.city.name ?? "UN" }}</span>
      </div>
      <div class="row">
        <span class="roboto">Note:</span>
        <span class="open-sans">{{ data.notes ?? "UN" }}</span>
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

<style lang="scss" scoped>
.billing-address {
  margin-top: 20px;
  h3 {
    font-size: 26px;
    margin-bottom: 10px;
    color: $green-sheen;
    font-weight: 500;
    text-align: center;
    margin: 20px 0;
    position: relative;
    letter-spacing: 2px;
    // background-color: #fff;
    &::after {
      content: "";
      position: absolute;
      height: 2px;
      width: 100%;
      background-color: $green-sheen;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -2;
      @media (min-width: 769px) {
        width: 500px;
      }
    }
    &::before {
      content: "";
      position: absolute;
      height: 2px;
      width: 220px;
      background-color: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
    }
  }
  div.box {
    @media (min-width: 769px) {
      width: 500px;
      // width: 600px;
    }
  }
  div.row {
    &:not(:last-of-type) {
      border-bottom: 1px solid #55555526;
    }
    padding: 12px 8px;
    cursor: default;
    position: relative;
    transition: 0.5s;
    &::after {
      content: "";
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      width: 0px;
      transition: 0.5s;
      background-color: #99999914;
    }
    &:hover::after {
      width: 100%;
    }
  }
  span.roboto {
    color: $arapawa;
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 4px;
    display: inline-block;
    width: 150px;
  }
  span.open-sans {
    color: $altamira;
    font-size: 18px;
  }
}
</style>
