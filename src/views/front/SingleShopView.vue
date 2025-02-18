<template>
  <div class="single-shop" v-if="!loading">
    <BannerSection />
    <ProductsDetails :product="data" />
    <RelatedProducts />
    <SubscribeSection />
  </div>
</template>

<script setup>
import SubscribeSection from "@/components/front/global/SubscribeSection.vue";
import BannerSection from "@/components/front/single_shop_page/BannerSection.vue";
import ProductsDetails from "@/components/front/single_shop_page/ProductsDetails.vue";
import RelatedProducts from "@/components/front/single_shop_page/RelatedProducts.vue";
import { useLoadingStore } from "@/stores/loading";
import { onBeforeMount, onMounted } from "vue";
import { useProductStore } from "../../stores/front/product";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
const productStore = useProductStore();
const { data, loading } = storeToRefs(productStore);
const route = useRoute();
onMounted(async () => {
  await productStore.show(route.params.product);
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss"></style>
