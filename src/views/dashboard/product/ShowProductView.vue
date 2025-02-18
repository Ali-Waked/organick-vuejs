<template>
  <div class="show-product" v-if="product.id">
    <PageTitle title="Products" :items />
    <div class="product-image">
      <img
        :src="product.image"
        :alt="product.name + 'image'"
        class="cursor-pointer"
        @click="showImage(product.image)"
      />
    </div>
    <v-row style="border: 1px solid #d4d4d4" class="rounded-lg overflow-hidden">
      <v-col cols="12" class="pa-0">
        <div class="group d-flex flex-column flex-sm-row w-100">
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Product Id</div>
            <span class="d-block w-33">#{{ product.id }}</span>
          </div>
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Product Name</div>
            <span class="d-bolck w-33 text-capitalize">{{ product.name }}</span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pa-0">
        <div class="group d-flex flex-column flex-sm-row w-100">
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Category Id</div>
            <span class="d-block w-33">#{{ product.category.id }}</span>
          </div>
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Category Name</div>
            <span class="d-bolck w-33 text-capitalize">{{
              product.category.name
            }}</span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pa-0">
        <div class="group d-flex flex-column flex-sm-row w-100">
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Price</div>
            <span class="d-block w-33">{{
              currencyFormat(product.price)
            }}</span>
          </div>
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Rating</div>
            <span class="d-flex align-center w-33 ga-1 text-capitalize">
              <span class="d-inline-block mt-1"> {{ product.rating }}</span>
              <!-- <v-icon icon="mdi-star" color="warning" /> -->
              <v-rating
                color="#FFA858"
                length="5"
                half-increments
                style="font-size: 16px"
                size="22px"
                ripple
                disabled
                :model-value="product.rating"
              ></v-rating>
            </span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pa-0">
        <div class="group d-flex flex-column flex-sm-row w-100">
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Number Of Product Request</div>
            <span class="d-block w-33">#{{ product.total_sold }}</span>
          </div>
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Product Status</div>
            <span
              :class="[
                'd-bolck w-33 text-capitalize font-weight-bold',
                product.is_active ? 'text-green' : 'text-orange-lighten-2',
              ]"
              >{{ status }}</span
            >
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pa-0">
        <div class="group d-flex flex-column flex-sm-row w-100">
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Created By</div>
            <!-- <span class="d-block w-33">{{ createdBy }}</span> -->
          </div>
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Created At</div>
            <span class="d-bolck w-33 text-capitalize">{{
              dateFormat(product.created_at)
            }}</span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pa-0">
        <div class="group d-flex flex-column flex-sm-row w-100">
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Tags</div>
            <span class="d-bolck w-33 text-capitalize">
              <v-chip v-for="tag in product.tags" :key="tag" class="ma-1">{{
                tag
              }}</v-chip>
            </span>
          </div>
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Last Updated</div>
            <span class="d-block w-33">{{
              dateFormat(product.updated_at)
            }}</span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pa-0">
        <div class="group d-flex flex-column flex-sm-row w-100">
          <div
            class="d-flex flex-column flex-md-row align-center w-100 justify-start justify-md-space-between"
          >
            <div class="title roboto w-100 mb-4 mb-md-0">Description</div>
            <span class="d-bolck w-100 text-capitalize ml-12">{{
              product.description ?? "Not Available"
            }}</span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pa-0">
        <div class="group d-flex flex-column flex-sm-row w-100">
          <div
            class="d-flex flex-column flex-md-row align-center w-100 justify-start justify-md-space-between"
          >
            <div class="title roboto w-100 mb-4 mb-md-0">Extra Information</div>
            <span class="d-bolck w-100 text-capitalize ml-12">{{
              product.extra_information ?? "Not Available"
            }}</span>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
  <NoDataFound message="Not Found" v-if="!product.id" />
  <ShowImage :image-src="imageSrc" v-model:model-value="dialog" />
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { computed, inject, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/stores/dashboard/product";
import { storeToRefs } from "pinia";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import ShowImage from "@/components/dashboard/global/ShowImage.vue";
import formats from "@/mixins/formats";

const { dateFormat, currencyFormat } = formats();
const route = useRoute();
const emitter = inject("emitter");
const productStore = useProductStore();
const { product } = storeToRefs(productStore);
const dialog = ref(false);
const imageSrc = ref("");
const role = route.params.role;

const items = ref([
  {
    title: "Dashboard",
    to: `/${role}/dashboard`,
  },
  {
    title: "Products",
    to: `/${role}/dashboard/products`,
  },
]);

// const createdBy = computed(() => {
//   return product.value.user.first_name + " " + product.value.user.last_name;
// });

const showImage = (url) => {
  imageSrc.value = url;
  dialog.value = true;
};

const status = computed(() => {
  return product.value.is_active ? "active" : "archived";
});

onMounted(async () => {
  emitter.emit("showLoading", true);
  await productStore.showProduct(route.params.product);
  items.value.push({ title: product.value.name });
  product.value.tags = product.value.tags.map((value) => value.name);
  emitter.emit("showLoading", false);
});
</script>

<style lang="scss" scoped>
.show-product {
  .product-image {
    margin: 24px 0;
    img {
      max-height: 350px;
      max-width: 350px;
    }
  }
  .v-col {
    &:nth-of-type(even) {
      background-color: $cultured;
    }
    &:nth-of-type(odd) {
      background-color: #fff;
    }
    &:not(:last-of-type) {
      border-bottom: 1px solid #d4d4d4;
    }
    @media (max-width: 599px) {
      &:nth-of-type(even) {
        background-color: unset;
      }
      &:nth-of-type(odd) {
        background-color: unset;
      }
    }
  }
  .group {
    // &:nth-of-type(even) {
    //   background-color: green;
    // }
    // &:nth-of-type(odd) {
    //   background-color: red;
    // }
    > div {
      padding: 22px 24px;
      &:nth-of-type(even) {
        border-left: 1px solid #d4d4d4;
        @media (max-width: 599px) {
          border-left: 0px;
          width: 100% !important;
          &:nth-of-type(even) {
            background-color: $cultured;
          }
          &:nth-of-type(odd) {
            background-color: green;
          }
        }
      }
      &:nth-of-type(odd) {
        @media (max-width: 599px) {
          border-bottom: 1px solid #d4d4d4;
          background-color: #fff;
          width: 100% !important;
        }
      }
      > div {
        color: $arapawa;
        font-weight: bold;
        font-size: 16px;
      }
      > span {
        color: $altamira;
      }
    }
  }
}
</style>
