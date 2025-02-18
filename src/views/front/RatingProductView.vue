<template>
<BannerSection title="Rating Product" />
<v-container class="overflow-hiddn">
  <!-- <div class="d-flex justify-space-between rating-product ga-8 align-stretch mt-12"> -->
  <v-row class="align-stretch rating-product mt-12 justify-space-around position-relative" v-for="n in 12">
    <v-col cols="12" sm="8" md="6" lg="5">
      <div class="flex-1-1 image">
        <img src="../../assets/images/about-us-one.png"  />
      </div>
    </v-col>
    <v-col cols="12" sm="11" md="6">
      <div class=" flex-1-1 py-6" >
    <p class="mb-2">
      <span class="roboto">Product Name:</span>
      <span class="open-sans">Vigtable freash</span>
    </p>
    <p class="mb-2">
      <span class="roboto">Category Name:</span>
      <span class="open-sans">Vigrable</span>
    </p>
    <p class="mb-2">
      <span class="roboto mb-1">Description:</span>
      <br/>
      <p class="open-sans description">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
        Possimus totam cupiditate eligendi numquam architecto nihil vero, eum obcaecati,
        temporibus omnis ipsum eaque suscipit! Iste, magnam ipsam porro illum quam harum.
      </p>
    </p>
    <div class="rating d-flex align-center">
      <span class="roboto">Rating This Product:</span>
      <v-rating
        color="#FFA858"
        length="5"
        half-increments
        style=" font-size: 16px"
        size="22px"
        ripple
        hover
        clearable
        :model-value="rating"
      ></v-rating>
      </div>
      <div class="comment">
      <span class="roboto d-inline-block mb-2">Comment:</span>
        <textarea class="d-block w-100 main-transition open-sans" placeholder="Enter Any Your Comment For This Product...."></textarea>
      </div>
      <v-btn text="submit" class="mt-4 float-right" color="#274C5B" />
  </div>
    </v-col>
  </v-row>
 

 <!-- </div> -->
</v-container>
</template>

<script setup>
import { useLoadingStore } from "@/stores/loading";
import { onMounted } from "vue";
import ProductItem from "@/components/front/global/ProductItem.vue";
import BannerSection from "@/components/front/global/BannerSection.vue";
onMounted(() => {
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss" scoped>
.rating-product {
.image {
  background-color: rgba(222, 221, 221, 0.27);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  height: 100%;
  img {
    max-width: 90%;
    // max-height: 330px;
  }
}
  .roboto {
    color: $arapawa;
    font-weight: bold;
    font-size: 20px;
    margin-right: 12px;
  }
  .open-sans {
    color:$altamira;
    &.description {
      font-size: 14px;
    }
  }
  textarea {
    border: 2px solid $altamira;
    border-radius: 6px;
    resize: none;
    outline:none;
    padding: 16px;
    min-height: 150px;
    &:focus {
      border-color: $arapawa;
    }
  }
  &:not(:last-of-type) {
    &::after {
      content: '';
      position: absolute;
      bottom: -24px;
      height: 2px;
      width: 200%;
      background-color: #00000017;
    }
  }
}
</style>
