<template>
  <div class="related-products">
    <v-container>
      <HeaderSection title="Related Products" class="text-center" />
      <v-row class="py-16" justify="center">
        <v-col cols="9" sm="6" md="4" lg="3" v-for="num in 4" :key="num">
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
import HeaderSection from "@/components/front/global/HeaderSection.vue";
import ProductItem from "@/components/front/global/ProductItem.vue";
</script>

<style lang="scss"></style>
