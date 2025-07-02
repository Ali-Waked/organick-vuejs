<template>
  <div class="show-category" v-if="category.id">
    <PageTitle title="Categories" :items />
    <div
      class="category-image cursor-pointer"
      @click="showImage(category.image)"
    >
      <img :src="category.image" />
    </div>
    <v-row style="border: 1px solid #d4d4d4" class="rounded-lg overflow-hidden">
      <v-col cols="12" class="pa-0">
        <div class="group d-flex flex-column flex-sm-row w-100">
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Category Id</div>
            <span class="d-block w-33">#{{ category.id }}</span>
          </div>
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Category Name</div>
            <span class="d-bolck w-33 text-capitalize">{{
              category.name
            }}</span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pa-0" v-if="category.parent">
        <div class="group d-flex flex-column flex-sm-row w-100">
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Parent Category Id</div>
            <span class="d-block w-33">#{{ category.parent.id }}</span>
          </div>
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Parent Category</div>
            <span class="d-bolck w-33 text-capitalize">{{
              category.parent.name
            }}</span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pa-0">
        <div class="group d-flex flex-column flex-sm-row w-100">
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Number Of Active Products</div>
            <span class="d-block w-33">#{{ category.products_count }}</span>
          </div>
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Category Status</div>
            <span
              :class="[
                'd-bolck w-33 text-capitalize font-weight-bold',
                category.is_active ? 'text-green' : 'text-orange-lighten-2',
              ]"
              >{{ status }}</span
            >
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pa-0">
        <div class="group d-flex flex-column flex-sm-row w-100">
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Number Of Archived Products</div>
            <span class="d-block w-33">#{{ category.products_count }}</span>
          </div>
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">products rating in category</div>
            <span class="d-bolck w-33 text-capitalize">
              <v-rating
                color="#FFA858"
                length="5"
                half-increments
                style="font-size: 16px"
                size="22px"
                ripple
                disabled
                :model-value="5"
              ></v-rating>
            </span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pa-0">
        <div class="group d-flex flex-column flex-sm-row w-100">
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">is Featcher</div>
            <span class="d-block w-33">{{ category.products_count ? 'yes' : 'no' }}</span>
          </div>
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Created At</div>
            <span class="d-bolck w-33 text-capitalize">{{
              dateFormat(category.created_at)
            }}</span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pa-0">
        <div class="group d-flex flex-column flex-sm-row w-100">
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Number Of Sup Categories</div>
            <span class="d-bolck w-33 text-capitalize"
              >#{{ category.children.length }}</span
            >
          </div>
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Last Updated</div>
            <span class="d-block w-33">{{
              dateFormat(category.updated_at)
            }}</span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pa-0 position-relative">
        <div class="group d-flex flex-column flex-sm-row w-100 border-center">
          <div
            class="d-flex flex-column flex-md-row align-center w-100 justify-start justify-md-space-between"
          >
            <div class="title roboto w-100 mb-4 mb-md-0">Description</div>
            <span class="d-bolck w-100 text-capitalize ml-12">{{
              category.description ?? "Not Available"
            }}</span>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
  <ShowImage :image-src="imageSrc" v-model:model-value="dialog" />
  <NoDataFound message="Not Found" v-if="!category.id" />
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { computed, inject, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useCategoryStore } from "@/stores/dashboard/category";
import { storeToRefs } from "pinia";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import ShowImage from "@/components/dashboard/global/ShowImage.vue";
import formats from "@/mixins/formats";

const { dateFormat } = formats();
const route = useRoute();
const emitter = inject("emitter");
const categoryStore = useCategoryStore();
const { category } = storeToRefs(categoryStore);
const dialog = ref(false);
const imageSrc = ref("");
const role = route.params.role;
const items = ref([
  {
    title: "Dashboard",
    to: `/${role}/dashboard`,
  },
  {
    title: "Categories",
    to: `/${role}/dashboard/categories`,
  },
]);

const showImage = (url) => {
  imageSrc.value = url;
  dialog.value = true;
};

const status = computed(() => {
  return category.is_active ? "Active" : "archived";
});

onMounted(async () => {
  emitter.emit("showLoading", true);
  await categoryStore.showCategory(route.params.category);
  items.value.push({ title: category.value.name });
  emitter.emit("showLoading", false);
  // console.log(route.params.category);
});
</script>

<style lang="scss" scoped>
.show-category {
  .category-image {
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
    &.border-center {
      &::after {
        content: "";
        position: absolute;
        width: 1;
        height: 100%;
        background-color: #d4d4d4;
        top: 0px;
        left: calc(50% + 1px);
        transform: translateX(-50%);
      }
    }
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
