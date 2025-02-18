<template>
  <div class="cart-view">
    <BannerSection title="Your Cart" />
    <v-sheet class="pt-7 px-4">
      <!-- <div class="header">
        <div class="d-flex justify-space-between align-center mt-4">
          <h3 class="roboto">Your Cart</h3>
        </div>
      </div> -->
      <!-- <div class="d-flex">
        <div
          class="d-flex cart-header align-center justify-space-between mt-8 pr-6 pb-4 roboto mt-4 font-weight-bold"
          style="
            border-bottom: 1px solid #d4d4d4;
            color: #274c5b;
            font-size: 18px;
          "
        >
          <span class="d-block w-25 ml-2">Product</span>
          <div class="w-75 d-flex align-center justify-space-between">
            <span class="d-block w-33"></span>
            <div class="w-66 d-flex align-center justify-space-between">
              <span class="d-block ml-1">Price</span>
              <span class="d-block">Quantity</span>
              <span class="d-block">Total</span>
              <span class="d-block"></span>
            </div>
          </div>
        </div>
        <div class="bg-grey-lighten-5 w-25 d-none d-md-block"></div>
      </div> -->
      <div class="d-flex justify-space-between flex-column flex-md-row">
        <div class="contents has-scroll open-sans mt-3" v-if="items.length">
          <div
            class="d-flex cart-header align-center justify-space-between mt-8 pr-6 pb-4 roboto mt-4 font-weight-bold"
            style="
              border-bottom: 1px solid #d4d4d4;
              color: #274c5b;
              font-size: 18px;
            "
          >
            <span class="d-block w-25 ml-2">Product</span>
            <div class="w-75 d-flex align-center justify-space-between">
              <span class="d-block w-33"></span>
              <div class="w-66 d-flex align-center justify-space-between">
                <span class="d-block ml-1">Price</span>
                <span class="d-block">Quantity</span>
                <span class="d-block">Total</span>
                <span class="d-block"></span>
              </div>
            </div>
          </div>
          <div class="box pt-3 mr-4" v-for="item in items" :key="item.id">
            <div class="d-flex align-center justify-space-between">
              <div class="image w-25">
                <img :src="item.product.image" alt="" />
              </div>
              <div class="info d-flex align-center justify-space-between w-75">
                <div class="w-33">
                  <p class="name mb-1">{{ item.product.name }}</p>
                  <p class="category">
                    <b>Categoty:</b>
                    <span>{{ item.product.category.name }}</span>
                  </p>
                </div>
                <div class="w-66 d-flex align-center justify-space-between">
                  <p class="price">
                    <span class="open-sans number"
                      >${{ item.product.price }}</span
                    >
                  </p>
                  <p class="quantity position-relative d-flex align-center">
                    <v-icon
                      icon="mdi-minus"
                      class="position-absolute left-0 ml-2"
                    />
                    <input
                      type="number"
                      min="1"
                      v-model="item.quantity"
                      @change="updateQuantity($event, item.id, item.product_id)"
                      placeholder="Qun"
                    />
                    <v-icon
                      icon="mdi-plus"
                      class="position-absolute right-0 mr-2"
                    />
                  </p>
                  <p class="price">
                    <span class="open-sans number">{{
                      currencyFormat(item.product.price * item.quantity)
                    }}</span>
                  </p>
                  <div class="delete" @click="removeFromCart(item.id)">
                    <v-icon class="cursor-pointer main-transition"
                      >mdi-close</v-icon
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="contents" style="max-height: 360px" v-else>
          <empty-cart style="max-height: 100%" id="empty-cart" />
          <!-- <v-tooltip activator="#empty-cart" location="top" class="text-red">
            Empty Cart</v-tooltip
          > -->
        </div>
        <div
          class="bg-grey-lighten-5 position-relative pa-8 pt-0 summary roboto mt-4 mt-md-0"
        >
          <h3 class="mt-10">SUMMARY</h3>
          <div class="mb-2 mt-10 d-flex align-center justify-space-between">
            <span>Number Of Items:</span>
            <span class="open-sans">{{ items.length }}</span>
          </div>
          <v-divider />
          <div class="my-2 mt-6 d-flex align-center justify-space-between">
            <span>Total Price:</span>
            <span class="open-sans">{{ currencyFormat(total) }}</span>
          </div>
          <v-divider />
          <div class="action bottom-0 right-0 left-0 pa-8">
            <v-btn
              class="w-100 rounded-pill text-none elevation-0 mb-4"
              height="44"
              @click="router.push({ name: 'checkout' })"
              v-if="items.length"
              >Check Out</v-btn
            >
            <v-btn
              class="w-100 rounded-pill text-none"
              variant="outlined"
              height="44"
              @click="showLoading"
              >Continue Shopping</v-btn
            >
          </div>
        </div>
      </div>
    </v-sheet>
  </div>
</template>
<script setup>
import { useLoadingStore } from "@/stores/loading";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../../stores/front/cart";
import { storeToRefs } from "pinia";
import formats from "@/mixins/formats.js";
import EmptyCart from "@/components/front/svgs/image/EmptyCart.vue";
import BannerSection from "@/components/front/global/BannerSection.vue";

const router = useRouter();
const cartStore = useCartStore();
const { items, total } = storeToRefs(cartStore);
const { currencyFormat } = formats();

const showLoading = () => {
  useLoadingStore().startLoading();
  router.push({ name: "shop" });
};

const removeFromCart = async (id) => {
  await cartStore.removeItem(id);
};

const updateQuantity = (event, id, product_id) => {
  const product = {
    product_id: product_id,
    quantity: event.target.value,
  };
  cartStore.updateQuantity(id, product);
};

onMounted(async () => {
  await cartStore.getItems();
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss">
.cart-view {
  .header {
    h3 {
      font-size: 32px;
      font-weight: bold;
      color: $arapawa;
      + i {
        font-size: 20px;
        color: $altamira;
        &:hover {
          color: $arapawa;
        }
      }
    }
    div.open-sans {
      span {
        color: $arapawa;
      }
      span.number {
        color: $green-sheen;
      }
    }
  }
  .cart-header {
    min-width: 620px;
  }
  .contents {
    margin-top: 24px;
    height: 74vh;
    width: 75%;
    @media (max-width: 959px) {
      width: 100%;
      height: unset;
    }
    // background-color:;
    .box:first-of-type {
      background-color: red;
    }
    .box {
      min-width: 620px;
      .image {
        img {
          width: 50%;
        }
      }
      .info {
        font-size: 15px;
        .name,
        .category {
          color: $altamira;
        }
        .price {
          font-size: 17px;
          color: $altamira;
          span.number {
            color: $green-sheen;
          }
        }
        .quantity {
          input {
            padding: 12px 10px 12px 20px;
            text-align: center;
            outline: none;
            border: 1px solid $light-gray;
            border-radius: 6px;
            width: 100px;
            font-size: 14px;
            font-weight: bold;
            color: $altamira;
          }
        }
        i {
          font-size: 18px;
          color: $light-gray;
          &:hover {
            color: $altamira;
          }
        }
      }
      &:not(:last-of-type) {
        border-bottom: 1px solid $light-gray;
        padding-bottom: 12px;
      }
    }
  }
  .summary {
    color: $arapawa;
    width: 25%;
    .open-sans {
      color: $green-sheen;
    }
    @media (max-width: 959px) {
      width: 80%;
      margin-left: auto;
      margin-right: auto;
    }
    @media (max-width: 559px) {
      width: 100%;
    }
    .action {
      position: absolute;
      @media (max-width: 959px) {
        position: relative;
      }
    }
  }
  .action {
    button {
      color: $arapawa;
      &:first-of-type {
        color: #fff;
        background-color: $arapawa;
      }
    }
  }
}
</style>
