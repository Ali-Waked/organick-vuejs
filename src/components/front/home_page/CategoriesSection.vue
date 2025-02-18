<template>
  <div class="categories-section section-padding">
    <v-container>
      <HeaderSection
        header="Categories"
        title="Our Products"
        class="text-center"
      />
      <v-row class="pt-12" justify="center" v-if="data.length > 0">
        <v-col
          cols="9"
          sm="6"
          md="4"
          lg="3"
          v-for="product in data"
          :key="product.id"
        >
          <ProductItem
            :rating="4.5"
            :category-name="product.category.name"
            :product-name="product.name"
            :old-price="product.price"
            :new-price="product.price"
            :image="product.image"
            :slug="product.slug"
          />
        </v-col>
      </v-row>
      <div class="action">
        <v-btn
          variant="flat"
          class="text-none roboto mt-8"
          width="174"
          height="58"
          @click="showLoading"
        >
          <span>Shop Now</span>
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import HeaderSection from "@/components/front/global/HeaderSection.vue";
import ProductItem from "@/components/front/global/ProductItem.vue";
import { inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "../../../stores/front/product";
import { storeToRefs } from "pinia";

const router = useRouter();
const emitter = inject("emitter");
const productStore = useProductStore();
const { data } = storeToRefs(productStore);
const showLoading = () => {
  emitter.emit("showLoading");
  window.scrollTo(0, 0);
  router.push({ name: "shop" });
};

onMounted(async () => {
  await productStore.getProducts();
});
</script>

<style lang="scss">
.categories-section {
  .image {
    height: 266px;
  }
  h4 {
    font-size: 18px;
    color: $arapawa;
    font-weight: 500;
  }
  .price {
    .old-price {
      color: #b8b8b8;
      font-size: 13px;
    }
    .new-price {
      color: $arapawa;
      font-size: 15px;
      display: inline-block;
      margin-left: 6px;
      font-weight: 500;
    }
  }
  .action {
    text-align: center;
    margin-top: 30px;
    button {
      background-color: $arapawa;
      color: #fff;
      font-size: 16px;
      border-radius: 11px;
      font-weight: 600;
      i {
        font-size: 10px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: #335b6b;
        margin-left: 8px;
      }
    }
    @media (max-width: 959px) {
      button {
        width: 80% !important;
        height: 66px !important;
      }
    }
    @media (max-width: 600px) {
      margin-top: 12px;
      button {
        height: 60px !important;
      }
    }
  }
}
</style>
