<template>
  <div class="content open-sans pl-4">
    <div
      class="box d-flex align-center justify-space-between mb-2"
      v-for="item in items"
      :key="item.product_id"
    >
      <div class="d-flex align-center gc-3">
        <div class="image">
          <img :src="item.product.image" alt="" />
          <span class="quan">{{ item.quantity }}</span>
        </div>
        <div>
          <p class="name roboto">{{ item.product.name }}</p>
          <p class="category">{{ item.product.category.name }}</p>
        </div>
      </div>
      <div>
        <span class="price roboto">{{
          currencyFormat(item.product.price)
        }}</span>
      </div>
    </div>
    <v-divider class="mt-6"></v-divider>
    <v-divider class="mb-4"></v-divider>
    <div class="d-flex align-center justify-space-between total roboto">
      <span>Total</span>
      <span>{{ currencyFormat(total) }}</span>
    </div>
  </div>
</template>

<script setup>
import formats from "@/mixins/formats.js";
defineProps({
  items: {
    type: Object,
    requried: true,
  },
  total: {
    type: Number,
    requried: true,
  },
});
const { currencyFormat } = formats();
</script>

<style lang="scss" scoped>
.content {
  width: 74%;
  @media (max-width: 959px) {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  .box {
    .image {
      width: 80px;
      height: 60px;
      border: 2px solid rgba(128, 128, 128, 0.781);
      border-radius: 4px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        padding: 2px;
      }
      .quan {
        position: absolute;
        right: -8px;
        top: -9px;
        background-color: rgba(128, 128, 128, 0.781);
        color: #ddd;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 9px;
        cursor: default;
        user-select: none;
      }
    }
    .name {
      color: $arapawa;
    }
    .category {
      font-size: 12px;
      color: rgba(128, 128, 128, 0.795);
    }
    .price {
      color: $altamira;
      font-size: 13px;
      font-weight: bold;
    }
  }
  .total {
    color: $arapawa;
    font-weight: bold;
    font-size: 20px;
  }
}
</style>
