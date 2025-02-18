<template>
  <div class="shop-products">
    <v-container>
      <v-row class="py-16" justify="center">
        <v-col cols="9" sm="6" md="4" lg="3" v-for="num in 12" :key="num">
          <ProductItem
            :rating="4.5"
            category-name="vegetable"
            product-name="Calabrese Broccoli"
            :old-price="20.0"
            :new-price="13.0"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import ProductItem from "@/components/front/global/ProductItem.vue";
</script>

<style lang="scss"></style>
