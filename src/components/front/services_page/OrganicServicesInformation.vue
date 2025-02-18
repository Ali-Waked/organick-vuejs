<template>
  <div class="organic-services-information section-padding pb-0">
    <v-container>
      <div class="header-container mx-auto">
        <HeaderSection
          header="What we Grow"
          title="Better Agricultur for Better Future"
          class="text-center"
        />
      </div>
      <v-row class="mt-14">
        <v-col cols="12" sm="6" lg="4">
          <div class="box text-center text-sm-left text-lg-right">
            <div
              class="icon position-relative d-flex align-center justify-end mx-auto ml-sm-0 mr-lg-0 ml-lg-auto"
            >
              <img
                src="@/assets/images/icons/services/Milk Bottle.png"
                class="position-relative"
                alt=""
              />
            </div>
            <div class="title">Dairy Products</div>
            <div class="description">
              Sed ut perspiciatis unde omnis iste natus error sit voluptat
              accusantium doloremqlaudantium. Sed ut perspiciatis
            </div>
          </div>
          <div class="box text-center text-sm-left text-lg-right">
            <div
              class="icon position-relative d-flex align-center justify-end mx-auto ml-sm-0 mr-lg-0 ml-lg-auto"
            >
              <img
                src="@/assets/images/icons/services/Online Store.png"
                class="position-relative"
                alt=""
              />
            </div>
            <div class="title">Store Services</div>
            <div class="description">
              Sed ut perspiciatis unde omnis iste natus error sit voluptat
              accusantium doloremqlaudantium. Sed ut perspiciatis
            </div>
          </div>
          <div class="box text-center text-sm-left text-lg-right">
            <div
              class="icon position-relative d-flex align-center justify-end mx-auto ml-sm-0 mr-lg-0 ml-lg-auto"
            >
              <img
                src="@/assets/images/icons/services/Delivery.png"
                class="position-relative"
                alt=""
              />
            </div>
            <div class="title">Delivery Services</div>
            <div class="description">
              Sed ut perspiciatis unde omnis iste natus error sit voluptat
              accusantium doloremqlaudantium. Sed ut perspiciatis
            </div>
          </div>
        </v-col>
        <v-col cols="4" class="d-none d-lg-block">
          <div class="image position-relative overflow-hidden">
            <ServicesImage />
            <!-- <img src="@/assets/images/services image.png" alt="" /> -->
          </div>
        </v-col>
        <v-col cols="12" sm="6" lg="4">
          <div class="box text-center text-sm-left">
            <div
              class="icon position-relative d-flex align-center justify-end mx-auto ml-sm-0 right"
            >
              <img
                src="@/assets/images/icons/services/Natural Food.png"
                class="position-relative"
                alt=""
              />
            </div>
            <div class="title">Agricultural Services</div>
            <div class="description">
              Sed ut perspiciatis unde omnis iste natus error sit voluptat
              accusantium doloremqlaudantium. Sed ut perspiciatis
            </div>
          </div>
          <div class="box text-center text-sm-left">
            <div
              class="icon position-relative d-flex align-center justify-end mx-auto ml-sm-0 right"
            >
              <img
                src="@/assets/images/icons/services/Vegetables Bag.png"
                class="position-relative"
                alt=""
              />
            </div>
            <div class="title">Organic Products</div>
            <div class="description">
              Sed ut perspiciatis unde omnis iste natus error sit voluptat
              accusantium doloremqlaudantium. Sed ut perspiciatis
            </div>
          </div>
          <div class="box text-center text-sm-left">
            <div
              class="icon position-relative d-flex align-center justify-end mx-auto ml-sm-0 right"
            >
              <img
                src="@/assets/images/icons/services/Radish.png"
                class="position-relative"
                alt=""
              />
            </div>
            <div class="title">Fresh Vegetables</div>
            <div class="description">
              Sed ut perspiciatis unde omnis iste natus error sit voluptat
              accusantium doloremqlaudantium. Sed ut perspiciatis
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="position-relative">
        <v-btn
          width="190"
          height="58"
          elevation="0"
          color="#274C5B"
          class="text-none d-block mx-auto"
          variant="outlined"
        >
          <span>Explore Now</span>
          <v-icon icon="mdi-arrow-right"></v-icon>
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import HeaderSection from "@/components/front/global/HeaderSection.vue";
import ServicesImage from "@/components/front/svgs/image/ServicesImage.vue";
</script>

<style scoped lang="scss">
.organic-services-information {
  background-color: #f9f8f8;
  .header-container {
    width: 40%;
    @media (max-width: 800px) {
      width: 90%;
    }
  }
  .box {
    margin-bottom: 20px;
    .icon {
      // background-color: $cultured;
      border-radius: 16px;
      width: 34px;
      height: 40px;
      // margin: auto;
      &::after {
        content: "";
        position: absolute;
        top: 55%;
        left: 60%;
        background-color: #fef1c2;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        z-index: 1;
      }
      &.right {
        &::after {
          left: -4px;
        }
      }
      img {
        width: 34px;
        z-index: 5;
      }
    }
    .title {
      color: $arapawa;
      font-size: 22px;
      font-weight: 500;
    }
    .description {
      color: $altamira;
      font-size: 15px;
    }
  }
  .image {
    text-align: center;
    svg {
      height: 720px;
      position: relative;
      top: -60px;
      left: -100px;
      width: 580px;
    }
    img {
      width: 100%;
    }
  }
  button {
    font-size: 16px;
    font-weight: bold;
    top: -100px;
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
    @media (max-width: 1160px) {
      top: 0px;
      margin-bottom: 40px;
      margin-top: 24px;
    }
  }
}
</style>
