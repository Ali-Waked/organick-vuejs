<template>
  <v-navigation-drawer
    temporary
    v-model="cartDrawer"
    width="320"
    location="right"
  >
    <v-sheet class="pt-7 px-4 bg-grey-lighten-5">
      <div class="header">
        <div class="d-flex justify-space-between align-center">
          <h3 class="roboto">Shopping Cart</h3>
          <v-icon
            @click="cartDrawer = false"
            class="cursor-pointer main-transition"
            >mdi-close</v-icon
          >
        </div>
        <div
          class="yellowtail d-flex justify-space-between align-center mt-4 open-sans"
        >
          <span class="num-of-items"
            ><span class="number">{{ items.length }}</span> items</span
          >
          <span class="total-price"
            >Total Price:
            <span class="number">{{ currencyFormat(total) }}</span></span
          >
        </div>
      </div>
      <div class="contents has-scroll open-sans mt-8" v-if="items.length">
        <div class="box mb-8 mr-4" v-for="item in items" :key="item.product_id">
          <div class="d-flex align-center justify-space-between gc-4">
            <div class="image">
              <img :src="item.product?.image" alt="" />
            </div>
            <div class="info" style="width: 60%">
              <p class="name mb-1">{{ item.product?.name }}</p>
              <p class="category">
                <b>Categoty:</b> <span>{{ item.product?.category.name }}</span>
              </p>
            </div>
          </div>
          <div class="info d-flex align-center justify-space-between mt-3">
            <p class="price">
              <span>Price: </span>
              <span class="yellowtail open-sans number"
                >${{ item.product?.price }}</span
              >
            </p>
            <p class="quantity">
              <input
                type="number"
                min="1"
                v-model="item.quantity"
                @change="updateQuantity($event, item.id, item.product_id)"
                placeholder="Qunatity"
              />
            </p>
            <div class="delete" @click="removeFromCart(item.id)">
              <v-icon class="cursor-pointer main-transition">mdi-close</v-icon>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <EmptyCart width="100%" style="margin-top: -100px; max-height: 90vh" />
      </div>
      <div
        class="action bg-grey-lighten-5 position-absolute pt-6 pb-3 bottom-0 left-0 right-0 pl-4 pr-6"
        v-if="items.length > 0"
      >
        <v-btn
          class="w-100 rounded-pill text-none elevation-0 mb-4"
          height="44"
          @click="showLoading('checkout')"
          >Check Out</v-btn
        >
        <v-btn
          class="w-100 rounded-pill text-none"
          variant="outlined"
          height="44"
          @click="showLoading('cart')"
          >View Cart</v-btn
        >
      </div>
      <div
        class="action bg-grey-lighten-5 position-absolute pt-13 pb-8 bottom-0 left-0 right-0 pl-4 pr-6"
        v-if="items.length == 0"
      >
        <v-btn
          class="w-100 rounded-pill text-none"
          variant="outlined"
          height="44"
          @click="showLoading('shop')"
          >Continue Shoping</v-btn
        >
      </div>
    </v-sheet>
  </v-navigation-drawer>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useLoadingStore } from "@/stores/loading";
import { useCartStore } from "../../../../stores/front/cart";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../../../stores/auth/auth";
import formats from "@/mixins/formats.js";
import EmptyCart from "@/components/front/svgs/image/EmptyCart.vue";

const emitter = inject("emitter");
const cartDrawer = ref(false);
const router = useRouter();
const cartStore = useCartStore();
const { items, total, loading } = storeToRefs(cartStore);
const authStore = useAuthStore();
const { currencyFormat } = formats();
const { isAuth } = storeToRefs(authStore);

const showLoading = (name) => {
  useLoadingStore().startLoading();
  window.scrollTo(0, 0);
  router.push({ name: name });
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
  if (isAuth.value) {
    await cartStore.getItems();
  }
  emitter.on("openCart", () => {
    cartDrawer.value = !cartDrawer.value;
  });
  console.log(total.value);
});
</script>

<style lang="scss">
.header {
  h3 {
    font-size: 22px;
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
  div.yellowtail {
    span {
      color: $arapawa;
    }
    span.number {
      color: $green-sheen;
    }
  }
}
.contents {
  margin-top: 24px;
  height: 60vh;
  // background-color:;
  .box {
    .image {
      width: 40%;
      img {
        width: 100%;
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
          padding: 12px 10px;
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
.action {
  button {
    // height: 44px;
    color: $arapawa;
    &:first-of-type {
      color: #fff;
      background-color: $arapawa;
    }
  }
}
</style>
