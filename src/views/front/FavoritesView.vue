<template>
  <BannerSection title="Favorites" />
  <FavoriteProduct />
</template>

<script setup>
import BannerSection from "@/components/front/favorite_page/BannerSection.vue";
import FavoriteProduct from "@/components/front/favorite_page/FavoriteProduct.vue";
import { useLoadingStore } from "@/stores/loading";
import { onMounted } from "vue";

onMounted(() => {
  useLoadingStore().stopLoading();
});
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