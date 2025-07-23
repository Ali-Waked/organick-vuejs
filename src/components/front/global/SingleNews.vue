<template>
  <div class="single-news">
    <v-hover v-slot="{ isHovering, props }">
      <v-sheet class="box position-relative cursor-pointer sheet" v-bind="props"
        style="max-width: 95vw; max-height: 480px" @click="showLoading">
        <img :src="news.image" class="w-100" alt="news image" />
        <div class="date roboto position-absolute d-flex align-center justify-center">
          {{ dateFormatForNews(news.published_at, "en-GB") }}<!-- 20 Mar -->
        </div>
        <v-card color="#fff" class="position-absolute card main-transition" :elevation="isHovering ? '12' : '5'">
          <div class="write-by d-flex align-center">
            <v-icon class="d-inline-block ml-3 mr-1">{{ iconMap[news.type] }}</v-icon>
            <span class="type roboto mt-2 ">{{ news.type }}</span>
          </div>
          <v-card-title class="card-title roboto">{{ news.title }}</v-card-title>
          <v-card-text class="card-text open-sans py-0">{{ news.subtitle }}</v-card-text>
          <v-card-actions>
            <v-btn width="170" height="60" elevation="0" class="text-none news-action">
              <span>Read More</span>
              <v-icon icon="mdi-arrow-right"></v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-sheet>
    </v-hover>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";
import { useRouter } from "vue-router";
import formats from "@/mixins/formats";

const props = defineProps({
  news: {
    type: Object,
    required: true,
  },
})
const { dateFormat, dateFormatForNews } = formats();
// const image = computed(() => {
//   return require(`@/assets/images/${imagesrc}`);
// });
const router = useRouter();
const emitter = inject("emitter");

const iconMap = {
  product: "mdi-package-variant",
  event: "mdi-calendar-star",
  announcement: "mdi-bullhorn",
  alert: "mdi-alert-circle",
  promotion: "mdi-sale",
  tip: "mdi-lightbulb-on-outline",
  news: "mdi-newspaper-variant",
};

const showLoading = () => {
  emitter.emit("showLoading");
  window.scrollTo(0, 0);
  router.push({ name: "show-news", params: { news: props.news.slug } });
};
</script>

<style scoped lang="scss">
.single-news {

  //   overflow: hidden;
  img {
    max-width: 100%;
    max-height: 440px;
    border-radius: 24px;
  }

  .type {
    text-transform: capitalize;
  }

  .date {
    font-weight: 600;
    color: $arapawa;
    font-size: 20px;
    background-color: #fff;
    width: 68px;
    height: 68px;
    border-radius: 50%;
    text-align: center;
    top: 34px;
    left: 24px;
    padding: 6px;
    line-height: 1.2;
  }

  .card {
    top: 46%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 24px;
    padding: 30px 30px 45px;
    width: 84%;

    .write-by {
      i {
        color: $maize;
      }

      span {
        color: $arapawa;
        font-size: 15px;
      }
    }
  }

  .card-title {
    color: $arapawa;
    font-size: 22px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .card-text {
    color: $altamira;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  button {
    font-size: 16px;
    font-weight: bold;

    border-radius: 12px;
    margin-top: 16px;

    i {
      width: 18px;
      height: 18px;
      background-color: $arapawa;
      color: #fff;
      border-radius: 50%;
      font-size: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 6px;
    }

    &.news-action {
      color: $arapawa;
      background-color: $maize;
    }
  }

  @media (max-width: 1120px) {
    .sheet {
      margin-bottom: 40px;

      &:first-of-type {
        margin-bottom: 60px;
      }
    }
  }

  @media (max-width: 959px) {}

  @media (max-width: 600px) {
    button {
      width: 100% !important;
    }

    .card {
      top: 46%;
      left: 50%;
      padding: 15px 15px 25px;
      width: 84%;

      .write-by {
        span {
          color: $arapawa;
          font-size: 14px;
        }
      }
    }

    .card-title {
      font-size: 18px;
    }

    .card-text {
      font-size: 12px;
    }
  }

  @media (max-width: 460px) {
    .card {
      top: 35%;
      left: 50%;
    }
  }
}
</style>
