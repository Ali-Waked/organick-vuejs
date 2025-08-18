<template>
  <div
    class="testimonial-and-counter background-section"
    ref="testimonial_section"
  >
    <v-row>
      <v-col cols="2" class="pa-0 d-none d-md-block">
        <img
          src="@/assets/images/tesitmonial-left-image.png"
          alt="left image"
        />
      </v-col>
      <v-col cols="12" md="8">
        <div class="content section-padding">
          <HeaderSection
            header="Testimonial"
            title="What Our Customer Saying?"
            class="text-center"
          />
          <swiper
            :slidePreView="1"
            class="mt-6"
            :modules="[Pagination, Autoplay]"
            :pagination="{ el: '.pagination', clickable: true }"
            loop
            :autoplay="{
              delay: 3000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }"
          >
            <swiper-slide v-for="feedback in feedbacks" :key="feedback.id">
              <div class="content text-center">
                <div class="avatar">
                  <img :src="feedback.customer.avatar" alt="customer avatar" />
                  <div class="rating">
                    <v-rating
                      length="5"
                      color="#FFA858"
                      size="20"
                      :model-value="feedback.rating"
                      half-increments
                      style="pointer-events: none; font-size: 15px"
                    ></v-rating>
                  </div>
                  <p class="text open-sans">
                    {{ feedback.comment }}
                  </p>
                  <div class="customer-name roboto">
                    {{ feedback.customer.first_name }}
                    {{ feedback.customer.last_name }}
                  </div>
                  <div class="type open-sans">Consumer</div>
                </div>
              </div>
            </swiper-slide>
            <div class="pagination"></div>
          </swiper>
          <v-divider color="#666" class="my-14"></v-divider>
          <div
            class="counters d-flex justify-space-between align-center flex-wrap ga-4"
          >
            <v-progress-circular
              size="178"
              bg-color="transparent"
              :model-value="value"
              color="#7EB693"
              class="mx-auto"
            >
              <div class="count">
                <span class="number roboto"> %{{ organic }} </span>
                <span class="title open-sans">Organic</span>
              </div>
            </v-progress-circular>
            <v-progress-circular
              size="178"
              bg-color="transparent"
              :model-value="value"
              color="#7EB693"
              class="mx-auto"
            >
              <div class="count">
                <span class="number roboto">{{ acitveProduct }}</span>
                <span class="title open-sans">Active Product</span>
              </div>
            </v-progress-circular>
            <v-progress-circular
              size="178"
              bg-color="transparent"
              :model-value="value"
              color="#7EB693"
              class="mx-auto"
            >
              <div class="count">
                <span class="number roboto">{{ organicOrders }}+</span>
                <span class="title open-sans">Organic Orders</span>
              </div>
            </v-progress-circular>
            <v-progress-circular
              size="178"
              bg-color="transparent"
              :model-value="value"
              color="#7EB693"
              class="mx-auto"
            >
              <div class="count">
                <span class="number roboto">{{ yearsOfFarming }}+</span>
                <span class="title open-sans">Years of Farming</span>
              </div>
            </v-progress-circular>
          </div>
        </div>
      </v-col>
      <v-col cols="2" class="pa-0 d-none d-md-block">
        <img
          src="@/assets/images/tesimonial-right-image.png"
          alt="right image"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import HeaderSection from "@/components/front/global/HeaderSection.vue";
import { onBeforeMount, onMounted, ref } from "vue";
import axiosClient from "../../../axiosClient";
// import Vue3Autocounter from "vue3-autocounter";

const value = ref(0);
const increase_value = 10;
const organic = ref(0);
const acitveProduct = ref(0);
const organicOrders = ref(0);
const yearsOfFarming = ref(0);
const organick_value = 100 / increase_value;
const active_product_value = 285 / increase_value;
const organic_orchads_value = 350 / increase_value;
const years_of_farming_value = 25 / increase_value;
const testimonial_section = ref(null);
const feedbacks = ref([]);
const interval = ref({});
onBeforeMount(() => {
  clearInterval(interval.value);
});
const counter = () => {
  if (
    isNaN(Number(interval.value)) &&
    window.scrollY >= testimonial_section.value?.offsetTop + 200
  ) {
    console.log("hi");
    interval.value = setInterval(() => {
      if (value.value < 100) {
        value.value += increase_value;
        organic.value += organick_value;
        acitveProduct.value += active_product_value;
        organicOrders.value += organic_orchads_value;
        yearsOfFarming.value += years_of_farming_value;
      }
    }, 100);
    console.log("after", interval.value);
  }
};
onMounted(() => {
  window.addEventListener("scroll", counter);
  axiosClient
    .get("/site-feedbacks")
    .then((response) => {
      console.log(response.data);
      feedbacks.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching site feedbacks:", error);
    });
});
</script>

<style lang="scss">
.testimonial-and-counter {
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }

  .avatar {
    margin-top: 16px;

    img {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      margin-bottom: 8px;
    }

    p {
      color: $altamira;
      font-size: 15px;
      width: 80%;
      margin: 18px auto 12px;
    }

    .customer-name {
      color: $arapawa;
      font-size: 22px;
      font-weight: 500;
    }

    .type {
      color: $altamira;
      font-size: 13px;
    }
  }

  .content {
    .counters {
      .count {
        color: $arapawa;
        width: 170px;
        height: 170px;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f1f1f1;
        position: relative;
        z-index: 10;
        border: 4px solid #fff;

        .number {
          font-size: 38px;
          font-weight: 900;
        }

        .title {
          font-size: 14px;
        }
      }

      // .count-container {
      //   cursor: default;
      //   width: calc(100% + 5px);
      //   height: calc(100%)
      //   overflow: hidden;
      //   span.ship {
      //     position: absolute;
      //     top: 50%;
      //     left: -50px;
      //     transform: translate(-50%, -50%);
      //     transition: 2s all linear;
      //     z-index: 1;
      //     border-radius: 50%;
      //     background-color: $green-sheen;
      //     height: calc(50% + 5px);

      //     width: calc(50% + 5px);
      //     // height: 0;
      //   }
      //   &:hover {
      //     span.ship {
      //       // width: calc(100% + 5px);
      //       // animate
      //       // width: 100%;
      //     }
      //   }
      // }
    }
  }

  .pagination {
    text-align: center;
    margin-top: 12px;
  }
}

.swiper-pagination-bullet {
  margin: 2px !important;
  background-color: #c4c4c4;
}

.swiper-pagination-bullet-active {
  background-color: $green-sheen !important;
}
</style>
