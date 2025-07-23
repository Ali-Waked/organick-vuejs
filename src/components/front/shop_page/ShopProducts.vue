<template>
  <div class="shop-products">
    <v-container>
      <div class="search mt-6 d-flex gc-2 ">
        <v-text-field type="search" variant="outlined" v-model="search.name" label="Search For Specific Product"
          color="#274C5B" />
        <div class="select-options d-flex flex-1-1 gc-2 align-center">
          <v-select variant="outlined" color="#274C5B" label="Select Category" :items="allCategories" item-title="name"
            item-value="id" v-model="search.category_id" />
          <v-select variant="outlined" color="#274C5B" label="Sort By" :items="sortBy" v-model="search.sort_by" />
          <SortingButton v-model:sorting-order="search.sortingOrder" class="order ml-n8 mr-4 mb-3" />
        </div>
        <v-btn color="#274C5B" text="search" class="elevation-0" :loading height="54px" min-width="115px"
          append-icon="mdi-magnify" @click="() => { page = 1; filterProducts(); }" />
      </div>
      <v-row class="py-6" justify="center" v-if="!loading && data && data.length">
        <v-col cols="9" sm="6" md="4" lg="3" v-for="product in data" :key="product.id">
          <ProductItem :rating="4.5" :category-name="product.category.name" :product-name="product.name"
            :old-price="product.price" :new-price="product.price" :image="product.image" :slug="product.slug"
            :product-id="product.id" v-model:is-favorite="product.isFavorite" />
        </v-col>
      </v-row>
      <v-card v-if="loading" elevation="0" min-height="50vh" class="d-flex justify-center align-center">
        <v-progress-circular indeterminate color="#7EB693" size="75"></v-progress-circular>
      </v-card>
      <div class="pagination mx-auto" style="max-width: 600px;">
        <v-pagination color="#274C5B" v-model="page" @update:model-value="filterProducts" :length="totalPage"
          class="mt-6" rounded="circle" prev-icon="mdi-arrow-left-circle-outline"
          next-icon="mdi-arrow-right-circle-outline" v-if="
            !loading &&
            totalPage != 1 &&
            (route.query.page != undefined ? route.query.page <= totalPage : true)
          "></v-pagination>
      </div>
      <div class="message-not-found d-flex justify-center align-center" v-if="data.length == 0">
        <span class="text-red text-h4 text-uppercase">no found any product</span>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import ProductItem from "@/components/front/global/ProductItem.vue";
import SortingButton from "@/components/dashboard/global/SortingButton.vue";
import { inject, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../../../stores/front/product";
import { useCategoryStore } from "../../../stores/dashboard/category";
import { storeToRefs } from "pinia";

const router = useRouter();
const route = useRoute();
const emitter = inject('emitter');
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const { data, search, loading, totalPage, page } = storeToRefs(productStore);
const { allCategories } = storeToRefs(categoryStore);
const sortBy = [
  {
    title: 'Name',
    value: 'name',
  },
  {
    title: 'Price',
    value: 'price',
  },
  {
    title: 'Best Seller',
    value: 'best_seller',
  }
]

// const showLoading = () => {
//   emitter.emit("showLoading");
//   window.scrollTo(0, 0);
//   router.push({ name: "shop" });
// };

const filterProducts = async () => {
  // page.value = 1;
  sessionStorage.setItem("scrollPosition", JSON.stringify({
    x: 0,
    y: 350
  }));
  await productStore.getProducts();
  router.push({
    name: "shop",
    query: {
      ...route.query,
      name: search.value.name,
      category_id: search.value.category_id,
      sort_by: search.value.sort_by,
      sortingOrder: search.value.sortingOrder,
      page: page.value
    }
  });
}

// const changePage = async () => {
//   await productStore.getProducts();
// };
onMounted(async () => {
  if (route.query.name) {
    search.value.name = route.query.name;
  }
  if (route.query.category_id) {
    search.value.category_id = parseInt(route.query.category_id);
  }
  if (route.query.sort_by) {
    search.value.sort_by = route.query.sort_by;
  }
  if (route.query.sortingOrder) {
    search.value.sortingOrder = route.query.sortingOrder;
  }
  if (route.query.page) {
    page.value = parseInt(route.query.page);
  }
  await categoryStore.getAllCategories();
  await productStore.getProducts();
});
</script>

<style lang="scss">
.search {
  flex-wrap: wrap;

  > {
    .v-input {
      min-width: 250px;
    }

    .select-options {
      flex-wrap: wrap;

      > {
        .v-input {
          min-width: 195px;
        }
      }

      .order {
        min-width: 120px;
      }
    }
  }
}

.message-not-found {
  min-height: 50vh;
}
</style>
