<template>
    <v-container class="roboto" >
      <v-row class="has-scroll mx-auto my-12" v-if="products.length">
        <v-col cols="12">
          <v-row justify="center" class="roboto row-head">
            <v-col cols="2">Product</v-col>
            <v-col cols="2" class="pl-8">Name</v-col>
            <v-col cols="2" class="text-center">Price</v-col>
            <v-col cols="2" lg="1">Category</v-col>
            <!-- <v-col cols="2" lg="1">Items</v-col> -->
            <v-col cols="2" lg="1">Actions</v-col>
          </v-row>
        </v-col>
         <v-col cols="12">
          <v-row
            justify="center"
            class="open-sans row-items"
            v-for="data in products"
            :key="data.id"
          >
            <v-col
              cols="2"
              style="color: #274c5b"
              >
              <img :src="data.product.image" :alt="data.product.name" width="80px" />
              </v-col
            >
            <v-col cols="2" class="d-flex align-center justify-center">{{ data.product.name }}</v-col>
            <v-col cols="2" class="d-flex align-center justify-center"
              ><span
                :class="[
                  'd-inline-block text-center py-1 px-3 rounded cursor-default status ',
                ]"
                >{{ currencyFormat(data.product.price) }}</span
              ></v-col
            >
            <v-col cols="2" lg="1" class="d-flex align-center justify-center">{{ data.product.category.name }}</v-col>
            <!-- <v-col cols="2" lg="1">{{
              getItemsCount(order.items_count)
            }}</v-col> -->
            <v-col cols="2" lg="1" class="d-flex align-center justify-center">
              <v-hover v-slot="{isHovering,props}">
                <v-icon :color="isHovering?'red-darken-1':'red-lighten-1'" class="cursor-pointer main-transition" @click="removeFromFavorite(data.product.id)" v-bind="props">mdi-close-circle-outline</v-icon>
              </v-hover>
            </v-col>
          </v-row>
        </v-col> 
      </v-row>
      <!-- <pre>
         {{products}}
      </pre> -->
      <v-row v-else class="justify-center mt-12 text-red-darken-1 font-weight-bold text-h5">
        <v-col cols="12" class="text-center">
          <h3 class="text-center">No Favorite Products</h3>
        </v-col>
      </v-row>
    </v-container>
</template>

<script setup>
import { ref ,onMounted,inject} from "vue";
import axiosClient from "@/axiosClient";
import formats from "@/mixins/formats";
import {useFavoriteStore} from "@/stores/front/favorite";
import { storeToRefs } from "pinia";

const { dateFormat, currencyFormat } = formats();

const emitter = inject('emitter');
const favoriteStore = useFavoriteStore();
const { products,page,last_age } = storeToRefs(favoriteStore);

const removeFromFavorite = async (id) => {
  await favoriteStore.removeFromFavorite(id);
}
onMounted(async() => {
  await favoriteStore.getFavoriteProducts();
})
</script>

<style lang="scss" scoped>
.row-head {
  color: $arapawa;
  font-weight: bold;
  font-size: 18px;
}
.row-items {
  color: $altamira;
  &:not(:last-of-type) {
    > div {
      border-bottom: 1px solid #999eee;
    }
  }}
</style>