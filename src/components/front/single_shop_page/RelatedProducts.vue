<template>
  <div class="related-products">
    <v-container>
      <HeaderSection title="Related Products" class="text-center" />
      <v-row class="py-16" justify="center" v-if="products && products.length">
        <v-col cols="9" sm="6" md="4" lg="3" v-for="product in products" :key="product.id">
          <ProductItem :rating="product.averageRating" :category-name="product.category.name"
            :product-name="product.name" :old-price="product.price" :new-price="13.0" :slug="product.slug"
            :image="product.image" :product-id="product.id" :is-favorite="product.isFavorite" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import HeaderSection from "@/components/front/global/HeaderSection.vue";
import ProductItem from "@/components/front/global/ProductItem.vue";
import axiosClient from "@/axiosClient";
import { onMounted, ref } from "vue";
const route = useRoute();
import { useRoute } from "vue-router";
const products = ref({});
onMounted(async () => {
  await axiosClient.get(`/products/${route.params.product}/related`)
    .then(response => {
      products.value = response.data.data.slice(0, 4);
    }).catch(e => {
      console.error(e);
    })
})
</script>

<style lang="scss"></style>
