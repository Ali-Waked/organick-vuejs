<template>
  <div class="page-not-found">
    <v-container>
      <div
        class="content roboto d-flex justify-center align-center flex-column position-relative"
      >
        <h1>404</h1>
        <h3>Page not found</h3>
        <p class="open-sans">
          The page you are looking for doesn't exist or has been moved
        </p>
        <div class="action">
          <v-btn
            variant="flat"
            class="text-none roboto mt-8 align-self-start"
            width="230"
            height="58"
            @click="showLoading()"
          >
            <span>Go to Homepage</span>
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </div>
    </v-container>
    <span class="shep"></span>
    <span class="shep"></span>
    <span class="shep"></span>
  </div>
</template>

<script setup>
import { useLoadingStore } from "@/stores/loading";
import { inject, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emitter = inject("emitter");

const showLoading = () => {
  emitter.emit("showLoading");
  router.replace({ name: "home" });
};

onMounted(() => {
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss">
.page-not-found {
  background-image: url("@/assets/images/404-page.png");
  background-size: cover;
  background-position: center;
  height: 90vh;
  overflow: hidden;
  .content {
    width: 50%;
    height: 90vh;
    margin-left: auto;
    h1 {
      font-size: 260px;
      font-weight: 900;
      color: #8fa8a8;
      line-height: 0.7;
    }
    h3 {
      color: $arapawa;
      font-size: 60px;
      font-weight: 900;
    }
    p {
      color: $altamira;
    }
    @media (max-width: 900px) {
      width: 70%;
      h1 {
        font-size: 240px;
      }
      h3 {
        font-size: 50px;
      }
    }
    @media (max-width: 720px) {
      width: 100%;
      h1 {
        font-size: 180px;
      }
      h3 {
        font-size: 40px;
      }
      p {
        text-align: center;
      }
    }
    .action {
      button {
        background-color: $arapawa;
        color: #fff;
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
      @media (max-width: 959px) {
        text-align: center;
        button {
          width: 100% !important;
          height: 66px !important;
        }
      }
      @media (max-width: 600px) {
        button {
          height: 60px !important;
        }
      }
    }
  }
  span.shep {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &:first-of-type {
      &::before {
        content: url("@/assets/images/banner icon/Pattern.png");
        position: absolute;
        bottom: 250px;
        left: -80px;
      }
    }
    &:nth-of-type(2) {
      &::after {
        content: url("@/assets/images/banner icon/Pattern-two.png");
        position: absolute;
        bottom: 220px;
        left: 540px;
      }
      &::before {
        content: url("@/assets/images/banner icon/Pattern-three.png");
        position: absolute;
        bottom: -100px;
        left: -80px;
      }
    }
    &:last-of-type {
      &::after {
        content: url("@/assets/images/banner icon/Pattern-five.png");
        position: absolute;
        bottom: 200px;
        left: -600px;
      }
    }
  }
}
</style>
