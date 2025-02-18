<template>
  <div class="banner background-section position-relative">
    <v-container>
      <v-row>
        <v-col cols="12" sm="10" md="5">
          <div class="content">
            <span class="yellowtail"><i>100% Natural Food</i></span>
            <h1 class="roboto">Choose the best healthier way of life</h1>
            <div class="action">
              <v-btn
                width="190"
                height="58"
                elevation="0"
                class="text-none position-relative"
              >
                <span>Explore Now</span>
                <v-icon icon="mdi-arrow-right"></v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="7" class="justify-end h-screen">
          <!-- <img src="@/assets/images/home-landing-page.png" alt="banner image" /> -->
          <HomeLandingPage
            width="100%"
            height="100%"
            class="position-relative"
          />
        </v-col>
      </v-row>
    </v-container>
    <span class="shep"></span>
    <span class="shep"></span>
    <span class="shep"></span>
  </div>
</template>

<script setup>
import HomeLandingPage from "@/components/front/svgs/image/HomeLandingPage.vue";
</script>

<style scoped lang="scss">
.banner {
  height: calc(100vh - 64px);
  overflow: hidden;
  .content {
    position: relative;
    top: 45%;
    width: 86%;
    transform: translateY(-50%);
    > span {
      font-size: 26px;
      color: $green-sheen;
    }
    h1 {
      font-size: 48px;
      color: $arapawa;
      font-weight: 900;
    }
    button {
      background-color: $maize;
      font-size: 16px;
      font-weight: bold;
      color: $arapawa;
      border-radius: 12px;
      margin-top: 16px;
      z-index: 20;
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
    }
  }

  span.shep {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &:first-of-type {
      &::after {
        content: url("@/assets/images/banner icon/Pattern-zero.png");
        position: absolute;
        bottom: -300px;
        left: -540px;
      }
      &::before {
        content: url("@/assets/images/banner icon/Pattern.png");
        position: absolute;
        bottom: -300px;
        left: -680px;
      }
    }
    &:nth-of-type(2) {
      &::after {
        content: url("@/assets/images/banner icon/Pattern-two.png");
        position: absolute;
        bottom: 130px;
        left: -650px;
      }
      &::before {
        content: url("@/assets/images/banner icon/Pattern-three.png");
        position: absolute;
        bottom: 80px;
        left: 500px;
      }
    }
    &:last-of-type {
      &::after {
        content: url("@/assets/images/banner icon/Pattern-five.png");
        position: absolute;
        bottom: 40px;
        left: -150px;
      }
      &::before {
        content: url("@/assets/images/banner icon/Pattern-zero.png");
        position: absolute;
        bottom: -350px;
        left: 340px;
        rotate: -90deg;
      }
    }
  }
  @media (max-width: 1120px) {
    .content {
      width: 100%;
    }
  }
  @media (max-width: 959px) {
    .content {
      position: absolute;
      width: 80%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 5;
    }
  }
  @media (max-width: 650px) {
    .content {
      width: 100%;
      margin: 0 auto;
      text-align: center;
      > span {
        font-size: 22px;
        color: $green-sheen;
      }
      h1 {
        font-size: 38px;
        color: $arapawa;
        font-weight: 900;
        margin: 12px 0;
      }
    }
    svg {
      display: none;
    }
  }
}
@media (max-width: 959px) {
  .banner {
    background-image: url("@/assets/images/home-landing-page.png");
    background-size: cover;
    background-position: center;
  }
}
</style>
