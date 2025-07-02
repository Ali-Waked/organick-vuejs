<template>
  <v-row justify="center" class="open-sans items">
    <v-col cols="2" lg="3"><img :src="item.product.image" :alt="item.product_name" /></v-col>
    <v-col cols="3" lg="3">
      <v-hover v-slot="{ isHovering, props }">
        <span v-bind="props" :class="['cursor-pointer', isHovering ? 'text-blue text-decoration-underline' : '']">
          {{ item.product_name }}
        </span>
      </v-hover>
    </v-col>
    <v-col cols="2" lg="2">{{ currencyFormat(item.price) }}</v-col>
    <v-col cols="2" lg="2" class="text-center">{{ item.quantity }}</v-col>
    <v-col cols="2" lg="2">{{ currencyFormat(item.price * item.quantity) }}</v-col>
  </v-row>
</template>

<script setup>
defineProps({ item: Object });
import formats from '@/mixins/formats';
const { currencyFormat } = formats();
</script>
<style lang="scss" scoped>
.items {
  color: $altamira;

  img {
    width: 50px;
  }
}
</style>