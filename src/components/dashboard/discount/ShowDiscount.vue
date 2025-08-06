<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    class="positoin-relative"
    min-width="350"
    max-width="500"
  >
    <v-card class="mx-auto text-center pt-12 pb-4 has-scroll" width="100%">
      <v-card-title class="text-h5 font-weight-bold roboto">
        Show Discount Detials
      </v-card-title>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-uppercase"
            >#id:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{ discount.id }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >name:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            discount.name
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text
        class="text-body-1 py-4 text-grey-darken-2"
        v-if="discount.discount_value"
      >
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >value:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            currencyFormat(discount.discount_value)
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >mode:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            discount.type
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >for:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            discount.discount_for
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >status:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            discount.is_active ? "active" : "in-active"
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >created date:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            dateFormat(discount.created_at)
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >started date:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            dateFormat(discount.started_at)
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >end date:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            dateFormat(discount.ended_at)
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >last updated:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            dateFormat(discount.updated_at)
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text
        class="text-body-1 py-4 text-grey-darken-2"
        v-if="discount.discription"
      >
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >description:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            discount.description
          }}</v-col>
        </v-row>
      </v-card-text>
      <div v-if="discount.ranges.length">
        <v-card-subtitle class="text-start mt-4 roboto text-h6 ml-2"
          >ranges:</v-card-subtitle
        >
        <v-card-text class="text-body-1 py-4 text-grey-darken-2 ml-2">
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="3" class="roboto text-start text-capitalize"
                  >min</v-col
                >
                <v-col cols="3" class="roboto text-start text-capitalize"
                  >max</v-col
                >
                <v-col cols="3" class="roboto text-start text-capitalize"
                  >value</v-col
                >
                <v-col cols="3" class="roboto text-start text-capitalize"
                  >added date</v-col
                >
              </v-row>
            </v-col>
            <v-col cols="12" v-for="range in discount.ranges" :key="range.id">
              <v-row class="products">
                <v-col
                  cols="3"
                  class="open-sans product-name text-start text-capitalize"
                >
                  {{ currencyFormat(range.min_price) }}
                </v-col>
                <v-col
                  cols="3"
                  class="open-sans product-name text-start text-capitalize"
                  >{{ currencyFormat(range.max_price) }}</v-col
                >
                <v-col
                  cols="3"
                  class="open-sans product-date text-start text-capitalize"
                  >{{ currencyFormat(range.value, range.type) }}</v-col
                >
                <v-col
                  cols="3"
                  class="open-sans product-date text-start text-capitalize"
                  >{{ dateFormat(range.created_at) }}</v-col
                >
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </div>
      <div v-if="discount.products.length">
        <v-card-subtitle class="text-start mt-4 roboto text-h6 ml-2"
          >products:</v-card-subtitle
        >
        <v-card-text class="text-body-1 py-4 text-grey-darken-2 ml-2">
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="4" class="roboto text-start text-capitalize"
                  >image</v-col
                >
                <v-col cols="4" class="roboto text-start text-capitalize"
                  >name</v-col
                >
                <v-col cols="4" class="roboto text-start text-capitalize"
                  >added date</v-col
                >
              </v-row>
            </v-col>
            <v-col
              cols="12"
              v-for="product in discount.products"
              :key="product.id"
            >
              <v-row class="products">
                <v-col cols="4" class="open-sans text-start text-capitalize">
                  <img :src="product.image" :alt="product.name" width="50px" />
                </v-col>
                <v-col
                  cols="4"
                  class="open-sans product-name text-start text-capitalize"
                  >{{ product.name }}<br />
                  Main Price: {{ currencyFormat(product.price) }}</v-col
                >
                <v-col
                  cols="4"
                  class="open-sans product-date text-start text-capitalize"
                  >{{ dateFormat(product.pivot.created_at) }}</v-col
                >
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </div>
    </v-card>
    <span class="close-icon">
      <v-icon
        icon="mdi-close-circle-outline"
        @click="$emit('update:dialog', false)"
      ></v-icon>
    </span>
  </v-dialog>
</template>

<script setup>
import { computed, inject, onMounted, reactive, ref, watch } from "vue";
import LoadingProgressLinear from "../global/LoadingProgressLinear.vue";
import axiosClient from "@/axiosClient";
import { useRoute, useRouter } from "vue-router";
import formats from "@/mixins/formats";

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
  discount: {
    type: Object,
    default: () => ({}),
  },
  city: {
    type: Object,
    default: () => ({}),
  },
});
const { dateFormat, currencyFormat } = formats();
const router = useRouter();
const route = useRoute();

// const closeFeedback = () => {
//   const query = { ...router.currentRoute.value.query };

//   delete query.id;
//   delete query.email;
//   const position = {
//     x: window.scrollX,
//     y: window.scrollY,
//   };
//   sessionStorage.setItem("scrollPosition", JSON.stringify(position));
//   router.replace({ query });
// };

const showIsFeatured = route.name == "dashboard-show-product" ? false : true;

const emitter = inject("emitter");
const errors = ref([]);
const loading = ref(false);
const isAddPage = computed(() => isNaN(props.data.id));

// const dialog = ref(true);
const emit = defineEmits(["update:dialog", "fetchCities"]);
const dialog = computed({
  get: () => props.dialog,
  set: (value) => emit("update:dialog", value),
});
</script>

<style lang="scss" scoped>
.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: 0.3s;
  color: #9e9e9e98;
  &:hover {
    color: rgba(230, 13, 13, 0.87);
  }
}
.text-h5 {
  color: $arapawa;
}
.title {
  color: $arapawa;
  font-weight: 500;
  .open-sans {
    color: $altamira;
  }
}
.v-card-text:not(:last-of-type) {
  border-bottom: 1px solid $light-gray;
  // margin-bottom: -12px;
}
.products {
  .product-name,
  .product-date {
    font-size: 14px;
  }
  &.v-row:not(:last-of-type) {
    border-bottom: 1px solid red;
  }
}
</style>