<template>
  <div class="products-details section-padding">
    <v-container>
      <v-row align-content="center" justify="center">
        <v-col cols="12" sm="10" md="6">
          <div class="image position-relative">
            <img :src="product.image" alt="" />
            <!-- <SingleProduct /> -->
            <v-chip class="text-capitalize open-sans position-absolute cursor-default" variant="flat" color="#274C5B"
              style="
                font-size: 15px;
                color: #fff;
                border-radius: 9px;
                left: 40px;
                top: 30px;
              ">
              {{ product.category?.name }}
            </v-chip>
            <div class="icons position-absolute ">
              <v-icon icon="mdi-heart" color="red-darken-2" :class="[product.isFavorite ? 'heart-icon' : '']"
                @click="removeFormFavorite(product.id)" />
              <v-icon icon="mdi-heart-outline" color="red-darken-2" :class="[!product.isFavorite ? 'heart-icon' : '']"
                @click="addToFavorite(product.id)" />
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="10" md="6">
          <div class="content">
            <h3 class="product-name roboto">{{ product.name }}</h3>
            <v-rating color="#FFA858" length="5" half-increments style="pointer-events: none; font-size: 11px"
              size="15px" model-value="4"></v-rating>
            <div class="price open-sans">
              <span class="old-price text-decoration-line-through">{{
                product.price
                }}</span>
              <span class="new-price">${{ product.price }}</span>
            </div>
            <p class="description open-sans">
              {{ product.description }}
            </p>
            <div class="add-to-cart roboto d-flex align-center ga-4">
              <div class="d-flex align-center ga-4">
                <span>Quantity :</span>
                <input type="number" min="1" v-model="item.quantity" />
              </div>
              <v-btn variant="flat" class="text-none roboto" width="190" height="64" :loading="loading"
                @click="addToCart">
                <span>Add To Cart</span>
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="10" class="text-center">
          <div class="actions d-flex ga-3 justify-center">
            <!-- <v-btn
              :variant="showDescription ? 'flat' : 'tonal'"
              class="text-none roboto font-weight-bold"
              width="290"
              height="64"
              color="#274C5B"
              @click="changeInfo(ProductDescription)"
              >Product Description
            </v-btn>
            <v-btn
              :variant="showDescription ? 'tonal' : 'flat'"
              class="text-none roboto font-weight-bold"
              width="290"
              height="64"
              color="#274C5B"
              @click="changeInfo(ProductAddionalInfo)"
              >Additional Info
            </v-btn>
            <component :is="componentShow" /> -->
            <v-btn v-for="(button, index) in buttons" :key="index" :variant="componentShow.__name === button.component.__name
              ? 'flat'
              : 'tonal'
              " class="text-none roboto font-weight-bold" width="290" height="64" color="#274C5B"
              @click="changeInfo(button.component)">
              {{ button.label }}
            </v-btn>
          </div>
          <component :is="componentShow" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import SingleProduct from "@/components/front/svgs/image/SingleProduct.vue";
import { useCartStore } from "../../../stores/front/cart";
import { onMounted, ref, inject } from "vue";
import { storeToRefs } from "pinia";
import ProductDescription from "./ProductDescription.vue";
import ProductAddionalInfo from "./ProductAddionalInfo.vue";
import { useFavoriteStore } from "@/stores/front/favorite";
const props = defineProps({
  product: {
    default: {},
  },
});
const buttons = [
  { label: "Product Description", component: ProductDescription },
  { label: "Additional Info", component: ProductAddionalInfo },
];
const componentShow = ref(ProductDescription);
const favoriteStore = useFavoriteStore();
const emit = defineEmits(["update:isFavorite"]);
const emitter = inject("emitter");

const cartStore = useCartStore();
const { loading, item } = storeToRefs(cartStore);
const addToCart = async () => {
  loading.value = true;
  item.value.product_id = props.product.id;
  item.value.product = {
    name: props.product.name,
    image: props.product.image,
    price: props.product.price,
    category: {
      name: props.product.category.name,
    },
  };
  setTimeout(async () => {
    await cartStore.addItem();
    emitter.emit("showAlert", "Add Product To Cart Successfully");
    emitter.emit('openCart', true);
  }, 500);
};

const changeInfo = (component) => {
  componentShow.value = component;
};

const addToFavorite = async (productId) => {
  await favoriteStore.addToFavorite(productId)
    .then(() => {
      // emit("update:isFavorite", true);
      props.product.isFavorite = true;
      emitter.emit("showAlert", "Add Product To Favorite Successfully");
    })
    .catch((e) => console.error(e));
};

const removeFormFavorite = async (productId) => {
  await favoriteStore.removeFromFavorite(productId)
    .then(() => {
      // emit("update:isFavorite", false);
      props.product.isFavorite = false;
      emitter.emit('showAlert', "Remove Product From Favorite Successfully");
    })
}


onMounted(() => {
  item.value.quantity = 1;
});
</script>

<style scoped lang="scss">
.products-details {
  overflow: hidden;

  .image {
    border-radius: 18px;
    max-height: 600px;
    background-color: #f9f8f8;
    text-align: center;
    height: 500px;
    overflow: hidden;

    @media (max-width: 700px) {
      height: 400px;
    }

    padding: 20%;

    img {
      width: 100%;
    }

    .icons {
      top: 24px;
      right: 24px;

      i {
        position: absolute;
        right: -100px;
        color: red;
        font-size: 24px;
        transition: right 0.3s ease-in-out;
        display: none;

        &.heart-icon {
          display: block;
        }
      }
    }

    &:hover {
      .icons {
        i {
          right: 0;
        }

      }
    }

    .icons:hover {
      i {
        right: 0;
      }

    }
  }

  .content {
    .product-name {
      font-size: 35px;
      font-weight: 500;
      color: $arapawa;
    }

    .price {
      .old-price {
        color: #b8b8b8;
        font-size: 16px;
        font-weight: 500;
      }

      .new-price {
        color: $arapawa;
        font-size: 25px;
        font-weight: bold;
        margin-left: 6px;
      }
    }

    p {
      color: $altamira;
      font-size: 15px;
      margin: 24px 0;
    }

    .add-to-cart {
      div {
        span {
          color: $arapawa;
          font-weight: bold;
          font-size: 20px;
        }

        input {
          outline: none;
          border: 2px solid $arapawa;
          border-radius: 12px;
          width: 100px;
          height: 64px;
          font-size: 24px;
          font-weight: bold;
          color: $arapawa;
          text-align: center;
          padding: 12px;
        }
      }

      button {
        color: #fff;
        background-color: $arapawa;
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

      // @media (max-width: 959px) {
      //   text-align: center;
      //   button {
      //     width: 100% !important;
      //     height: 66px !important;
      //   }
      // }
      // @media (max-width: 600px) {
      //   button {
      //     height: 60px !important;
      //   }
      // }
    }

    @media (max-width: 600px) {
      .add-to-cart {
        justify-content: center;

        div {
          span {
            font-size: 16px;
          }

          input {
            width: 60px;
            height: 58px;
            font-size: 22px;
          }
        }

        button {
          width: 170px !important;
          font-size: 14px;
          height: 58px !important;
        }

        // @media (max-width: 959px) {
        //   text-align: center;
        //   button {
        //     width: 100% !important;
        //     height: 66px !important;
        //   }
        // }
        // @media (max-width: 600px) {
        //   button {
        //     height: 60px !important;
        //   }
        // }
      }
    }
  }

  .actions {
    margin-top: 20px;

    button {
      font-size: 20px;
      border-radius: 12px;
    }

    +p.description {
      color: $altamira;
      font-size: 15px;
      line-height: 1.6;
    }

    @media (max-width: 700px) {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
