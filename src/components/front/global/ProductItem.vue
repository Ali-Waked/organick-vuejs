<template>
  <div class="product-item position-relative">
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        :color="bgColor"
        :class="[
          ' cursor-pointer main-transition w-100',
          isHovering ? 'elevation-3' : 'elevation-0',
        ]"
        v-bind="props"
        style="border-radius: 18px"
      >
        <div>
          <div
            class="position-relative overflow-hidden pa-6"
            @click="showLoading(slug)"
          >
            <v-chip
              class="text-capitalize open-sans"
              variant="flat"
              color="#274C5B"
              style="font-size: 13px; color: #fff; border-radius: 8px"
              >{{ categoryName }}</v-chip
            >
            <div class="image d-flex justify-center align-center">
              <!-- <CategoryVegetable width="250" class="mt-n6" /> -->
              <img :src="image" width="250" alt="" />
            </div>
            <div class="info">
              <h4 class="category-name roboto">{{ productName }}</h4>
              <v-divider class="my-1" color="gray"></v-divider>
              <div class="d-flex justify-space-between align-center">
                <div class="price open-sans">
                  <span
                    class="old-price text-decoration-line-through"
                    v-if="oldPrice != newPrice"
                    >{{ currencyFormat(oldPrice) }}</span
                  >
                  <span class="new-price">{{ currencyFormat(newPrice) }}</span>
                </div>
                <v-rating
                  color="#FFA858"
                  length="5"
                  half-increments
                  style="pointer-events: none; font-size: 11px"
                  size="15px"
                  :model-value="rating"
                ></v-rating>
              </div>
            </div>
          </div>
          <div class="icons position-absolute" v-if="authStore.isCustomer">
            <v-icon
              icon="mdi-heart"
              color="red-darken-2"
              :class="[isFavorite ? 'heart-icon' : '']"
              @click="removeFormFavorite(productId)"
            />
            <v-icon
              icon="mdi-heart-outline"
              color="red-darken-2"
              :class="[!isFavorite ? 'heart-icon' : '']"
              @click="addToFavorite(productId)"
            />
          </div>
        </div>
      </v-card>
    </v-hover>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import CategoryVegetable from "@/components/front/svgs/image/CategoryVegetable.vue";
import { inject } from "vue";
import { useFavoriteStore } from "@/stores/front/favorite";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth/auth";
import formats from "@/mixins/formats";

const { currencyFormat } = formats();
const authStore = useAuthStore();
const route = useRoute();

const props = defineProps({
  rating: { type: Number, default: 5 },
  categoryName: String,
  productName: String,
  oldPrice: Number,
  newPrice: Number,
  slug: { type: String },
  bgColor: { type: String, default: "#dedddd45" },
  image: { type: String },
  productId: { type: Number },
  isFavorite: { type: Boolean, default: false },
});
const router = useRouter();
const emitter = inject("emitter");
const favoriteStore = useFavoriteStore();
const emit = defineEmits(["update:isFavorite"]);

const addToFavorite = async (productId) => {
  console.log(productId);
  await favoriteStore
    .addToFavorite(productId)
    .then(() => {
      emit("update:isFavorite", true);
      emitter.emit("showAlert", "Add Product To Favorite Successfully");
    })
    .catch((e) => console.error(e));
};

const removeFormFavorite = async (productId) => {
  await favoriteStore.removeFromFavorite(productId).then(() => {
    emit("update:isFavorite", false);
    emitter.emit("showAlert", "Remove Product From Favorite Successfully");
  });
};

const showLoading = (slug) => {
  if (route.name === "single-shop" && route.params.product == slug) return;
  emitter.emit("showLoading");
  router.push({ name: "single-shop", params: { product: slug } });
  // setTimeout(() => {}, 5000);
};
</script>

<style lang="scss">
.product-item {
  .image {
    height: 266px;
  }

  h4 {
    font-size: 18px;
    color: $arapawa;
    font-weight: 500;
  }

  .price {
    .old-price {
      color: #b8b8b8;
      font-size: 13px;
    }

    .new-price {
      color: $arapawa;
      font-size: 15px;
      display: inline-block;
      margin-left: 6px;
      font-weight: 500;
    }
  }

  .v-card {
    .icons {
      top: 24px;
      right: 24px;
      z-index: 100000;

      i {
        position: absolute;
        // top: 10px;
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
          // display: none;
          right: 0;
        }
      }

      // .mdi-heart {
      //   display: block;
      // }
    }

    .icons:hover {
      i {
        // display: none;
        right: 0;
      }
    }

    // .mdi-heart {
    //   display: none;
    // }
  }
}
</style>
