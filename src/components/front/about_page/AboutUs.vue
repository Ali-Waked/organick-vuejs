<template>
  <div class="about-us section-padding">
    <v-container>
      <v-row>
        <v-col cols="12" md="6" class="d-none d-md-block">
          <div class="image position-relative">
            <img
              src="@/assets/images/about-us-one.png"
              alt="about us image"
              class="position-relative"
            />
            <img
              src="@/assets/images/about-us-two.png"
              alt="about us image"
              class="position-absolute"
            />
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
          style="position: relative; z-index: 8; background-color: #ffff"
        >
          <div>
            <HeaderSection
              header="About Us"
              title="We do Creative Things for Success"
            />
          </div>
          <p class="open-sans">
            Simply dummy text of the printing and typesetting industry. Lorem
            had ceased to been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley.
            <br />
            <br />
            Simply dummy text of the printing and typesetting industry. Lorem
            had ceased to been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley.
          </p>
          <v-row class="mt-4">
            <v-col cols="6" class="">
              <div
                class="icon position-relative d-flex align-center justify-center gc-4"
              >
                <img
                  src="@/assets/images/icons/about/modern-agriculture-icon.png"
                  alt="icon"
                />
                <span class="roboto">Modern Agriculture Equipment </span>
              </div>
            </v-col>
            <v-col cols="6">
              <div
                class="icon position-relative d-flex align-center justify-center gc-4"
              >
                <img
                  src="@/assets/images/icons/about/no-growth-hormones-are-used-icon.png"
                  alt="icon"
                />
                <span class="roboto">No growth hormones are used </span>
              </div>
            </v-col>
          </v-row>
          <div class="action">
            <v-btn
              variant="flat"
              class="text-none roboto mt-8"
              width="174"
              height="58"
              @click="showLoading"
            >
              <span>Shop Now</span>
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import HeaderSection from "@/components/front/global/HeaderSection.vue";
import { inject } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emitter = inject("emitter");

const showLoading = () => {
  emitter.emit("showLoading");
  window.scrollTo(0, 0);
  router.push({ name: "shop" });
};
</script>

<style lang="scss" scoped>
.about-us {
  .image {
    max-width: 100%;
    img {
      max-width: 100%;
      &:first-of-type {
        z-index: 5;
        transform: translateY(40px);
      }
      &:last-of-type {
        width: 70%;
        top: 45%;
        left: -18%;
        // transform: translate(-50%, -50%);
        z-index: 1;
      }
    }
  }
  p.open-sans {
    color: $altamira;
  }
  .icon {
    width: 100%;
    margin-bottom: 24px;
    img {
      max-width: 100%;
      z-index: 10;
    }
    &::after {
      content: "";
      position: absolute;
      top: 16%;
      left: -2px;
      background-color: #fef1c2;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      z-index: 1;
    }
    span {
      color: $arapawa;
      font-size: 20px;
      font-weight: 500;
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
</style>
