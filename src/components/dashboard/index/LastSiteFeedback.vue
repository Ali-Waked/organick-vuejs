<template>
  <v-card elevation="1" class="rounded py-2">
    <swiper
      :slidePreView="1"
      :modules="[Pagination, Autoplay]"
      :pagination="{ el: '.pagination', clickable: true }"
      loop
      :autoplay="{
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }"
    >
      <swiper-slide v-for="user in data" :key="user.id">
        <div class="content text-center">
          <div class="avatar">
            <img :src="user.avatar" alt="" />
            <div class="customer-name roboto">
              {{ user.first_name }} {{ user.last_name }}
            </div>
            <div class="type open-sans">Consumer</div>
            <div class="rating mx-n4">
              <v-rating
                color="amber"
                length="5"
                half-increments
                style="pointer-events: none; font-size: 11px"
                size="15px"
                :model-value="user.site_feedback.rating || 0"
              ></v-rating>
            </div>
            <v-chip
              :color="user.site_feedback.is_featured ? 'green' : 'grey'"
              class="ma-2 d-block pt-2"
              text-color="white"
              label
            >
              {{ user.site_feedback.is_featured ? "Featured" : "Not Featured" }}
            </v-chip>
            <p class="text open-sans">
              {{ user.site_feedback.comment || "No feedback provided" }}
            </p>
          </div>
        </div>
      </swiper-slide>
      <div class="pagination"></div>
    </swiper>
  </v-card>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.avatar {
  margin-top: 16px;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 8px;
  }

  p {
    color: $altamira;
    font-size: 13px;
    width: 80%;
    margin: 18px auto 12px;
  }

  .customer-name {
    color: $arapawa;
    font-size: 20px;
    font-weight: 500;
  }

  .type {
    color: $altamira;
    font-size: 13px;
  }
}
.pagination {
  text-align: center;
  margin-top: 12px;
}
.swiper-pagination-bullet {
  margin: 2px !important;
  background-color: #c4c4c4;
}

.swiper-pagination-bullet-active {
  background-color: $green-sheen !important;
}
</style>