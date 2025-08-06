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
            <div class="title roboto w-50">Main Price</div>
            <span class="d-block w-33">{{
              currencyFormat(product.price)
            }}</span>
          </div>
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Price After Discount</div>
            <span class="d-flex align-center w-33 ga-1 text-capitalize">
              <!-- <v-icon icon="mdi-star" color="warning" /> -->
              {{ currencyFormat(product.FinalPrice) }}
            </span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pa-0">
        <div class="group d-flex flex-column flex-sm-row w-100">
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Number Of Product Request</div>
            <span class="d-block w-33">#{{ product.total_requests }}</span>
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
            <div class="title roboto w-50">Quantity</div>
            <span class="d-block w-33">{{ product.quantity }}</span>
          </div>
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Alert Before</div>
            <span class="d-bolck w-33 text-capitalize">{{
              product.low_stock_threshold
            }}</span>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pa-0">
        <div class="group d-flex flex-column flex-sm-row w-100">
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Created Date</div>
            <span class="d-block w-33">{{
              dateFormat(product.created_at)
            }}</span>
          </div>
          <div class="d-flex align-center w-50 justify-space-between">
            <div class="title roboto w-50">Last Updated</div>
            <span class="d-bolck w-33 text-capitalize">{{
              dateFormat(product.updated_at)
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
            <div class="title roboto w-50">Rating</div>
            <span class="d-flex align-center w-33 ga-1 text-capitalize">
              <v-rating
                color="amber"
                length="5"
                half-increments
                style="font-size: 16px; pointer-events: none"
                size="22px"
                ripple
                class="cursor-default"
                disabled
                :model-value="product.AverageRating"
              ></v-rating>
            </span>
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
            <div class="title roboto w-100 mb-4 mb-md-0">Feedbacks</div>
            <span class="d-bolck w-100 text-capitalize ml-12">
              <v-list
                lines="two"
                class="customer-comments has-scroll bg-transparent"
                max-height="330"
              >
                <v-list-item
                  v-for="r in product.feedbacks"
                  :key="r.id"
                  :class="[
                    'py-4 feedback main-transition text-grey-lighten-3 cursor-pointer',
                  ]"
                  @click="showFeedback(r)"
                >
                  <template #prepend>
                    <v-img
                      :src="r.customer?.avatar"
                      :alt="`${r.customer?.first_name} ${r.customer?.last_name}`"
                      width="50"
                      height="50"
                      class="rounded-circle mr-4 text-capitailze"
                      cover
                      referrerpolicy="no-referrer"
                    />
                  </template>
                  <template #title>
                    <div class="d-flex justify-space-between roboto">
                      <div class="d-flex align-center mb-2">
                        <span class="font-weight-medium mr-4 name"
                          >{{ r.customer?.first_name }}
                          {{ r.customer?.last_name }}</span
                        >
                        <v-rating
                          readonly
                          half-increments
                          density="compact"
                          length="5"
                          color="amber"
                          :model-value="r.rating"
                          size="14"
                          style="font-size: 13px"
                          class="mt-n1"
                        />
                      </div>
                      <span class="text-caption text-grey">{{
                        dateFormat(r.created_at)
                      }}</span>
                    </div>
                  </template>
                  <template #subtitle>
                    <div
                      class="mt-1 line-clamp-2 text-sm text-ellipsis overflow-hidden text-left open-sans comment text-grey-darken-2"
                      v-if="r.comment"
                    >
                      {{ r.comment }}
                    </div>
                  </template>
                </v-list-item>
              </v-list>
            </span>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
  <ShowCustomerFeedbackDialog
    v-model:dialog="showFeedbackDialog.dialog"
    :feedback="showFeedbackDialog.data"
  />
  <NoDataFound message="Not Found" v-if="!product.id" />
  <ShowImage :image-src="imageSrc" v-model:model-value="dialog" />
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { computed, inject, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "@/stores/dashboard/product";
import { storeToRefs } from "pinia";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import ShowImage from "@/components/dashboard/global/ShowImage.vue";
import ShowCustomerFeedbackDialog from "@/components/dashboard/feedback/ShowCustomerFeedbackDialog.vue";
import formats from "@/mixins/formats";

const { dateFormat, currencyFormat } = formats();
const route = useRoute();
const router = useRouter();
const emitter = inject("emitter");
const productStore = useProductStore();
const { product } = storeToRefs(productStore);
const dialog = ref(false);
const imageSrc = ref("");
const role = route.params.role;
const position = reactive({
  x: 0,
  y: 0,
});

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

const showFeedbackDialog = reactive({
  dialog: false,
  data: {},
});

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

const showFeedback = (feedback) => {
  position.x = window.scrollX;
  position.y = window.scrollY;
  sessionStorage.setItem("scrollPosition", JSON.stringify(position));
  console.log(feedback);
  router.replace({
    query: {
      id: feedback.id,
      email: feedback.customer.email,
    },
  });
  showFeedbackDialog.dialog = true;
  showFeedbackDialog.data = feedback;
};

watch(
  () => showFeedbackDialog.dialog,
  (newVal) => {
    if (!newVal) {
      // const closeFeedback = () => {
      const query = { ...router.currentRoute.value.query };

      delete query.id;
      delete query.email;

      sessionStorage.setItem("scrollPosition", JSON.stringify(position));
      router.replace({ query });
      // };
    }
  }
);

onMounted(async () => {
  emitter.emit("showLoading", true);
  await productStore.showProduct(route.params.product);
  if (route.query.id && route.query.email) {
    const feedbackItem = product.value.feedbacks.find(
      (fb) => fb.id == route.query.id && fb.customer.email == route.query.email
    );
    console.log(product.value.feedbacks);
    if (feedbackItem) {
      showFeedback(feedbackItem);
    }
  }
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
  .feedback {
    .title {
      font-size: 22px !important;
      font-weight: 500;
      color: $arapawa;
    }

    .name {
      color: $arapawa;
    }

    .comment {
      line-height: 1.4;
      // font-size: 14px;
    }

    & {
      position: relative;
      &:hover {
        background-color: currentColor;
      }
      &:not(:last-of-type) {
        border-bottom: 1px solid currentColor;
      }
    }
  }
}
</style>
