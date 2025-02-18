<template>
  <div class="single-blog">
    <v-hover v-slot="{ isHovering, props }">
      <v-sheet
        class="box position-relative cursor-pointer sheet"
        v-bind="props"
        style="max-width: 95vw; max-height: 480px"
        @click="showLoading"
      >
        <img src="@/assets/images/blog-news-image-two.png" alt="news image" />
        <div
          class="date roboto position-absolute d-flex align-center justify-center"
        >
          25 Nov
        </div>
        <v-card
          color="#fff"
          class="position-absolute card main-transition"
          :elevation="isHovering ? '12' : '5'"
        >
          <div class="write-by d-flex align-center">
            <v-icon class="d-inline-block ml-3 mr-1">mdi-account</v-icon>
            <span class="user-name roboto mt-2">By Rachi Card</span>
          </div>
          <v-card-title class="card-title roboto"
            >The Benefits of Vitamin D & How to Get It</v-card-title
          >
          <v-card-text class="card-text open-sans py-0"
            >Simply dummy text of the printing and typesetting industry. Lorem
            Ipsum</v-card-text
          >
          <v-card-actions>
            <v-btn
              width="170"
              height="60"
              elevation="0"
              class="text-none news-action"
            >
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
import { inject } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emitter = inject("emitter");

const showLoading = () => {
  emitter.emit("showLoading");
  window.scrollTo(0, 0);
  router.push({ name: "show-blog" });
};
</script>

<style scoped lang="scss">
.single-blog {
  //   overflow: hidden;
  img {
    max-width: 100%;
    max-height: 440px;
    border-radius: 24px;
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
  }
  .card-text {
    color: $altamira;
    font-size: 14px;
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
  @media (max-width: 959px) {
  }
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
