<template>
  <div class="about-us background-section section-padding">
    <v-container>
      <v-row justify="space-around">
        <v-col cols="12" sm="8" md="6">
          <img src="@/assets/images/orange.png" alt="" />
        </v-col>
        <v-col cols="12" sm="8" md="6">
          <div class="content-container">
            <HeaderSection
              header="About Us"
              title="We Believe in Working Accredited Farmers"
            />
            <p class="open-sans mt-3">
              Simply dummy text of the printing and typesetting industry. Lorem
              had ceased to been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley.
            </p>
            <div class="pt-6 d-flex flex-column gr-4">
              <div class="d-flex align-stretch gc-4">
                <div
                  class="icon d-inline-flex align-center justify-center bg-white"
                >
                  <v-badge color="#FFF4CD" class="badge" location="left">
                    <img
                      src="@/assets/images/icons/Vegan Food.png"
                      class="position-relative"
                      alt=""
                    />
                  </v-badge>
                </div>
                <div class="text">
                  <h5 class="roboto font-weight-bold text-capitalize">
                    Organic Foods Only
                  </h5>
                  <span class="open-sans"
                    >Simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum</span
                  >
                </div>
              </div>
              <div class="d-flex align-stretch gc-4">
                <div
                  class="icon d-inline-flex align-center justify-center bg-white"
                >
                  <v-badge color="#FFF4CD" location="left">
                    <img
                      src="@/assets/images/icons/Mailbox Quality.png"
                      alt=""
                      class="position-relative"
                    />
                  </v-badge>
                </div>
                <div class="text">
                  <h5 class="roboto font-weight-bold text-capitalize">
                    Organic Foods Only
                  </h5>
                  <span class="open-sans"
                    >Simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum</span
                  >
                </div>
              </div>
            </div>
          </div>
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

<style lang="scss">
.about-us {
  img {
    width: 100%;
  }
  p {
    color: $altamira;
    font-size: 15px;
  }
  .text {
    width: 75%;
    h5 {
      color: $arapawa;
      font-size: 22px;
    }
    > span {
      color: $altamira;
      font-size: 14px;
    }
  }
  .icon {
    width: 82px;
    border-radius: 14px;
    img {
      width: 40px;
      z-index: 1;
    }
    .v-badge__badge {
      top: 26px !important;
      left: -5px !important;
    }
    .badge {
      .v-badge__badge {
        top: 20px !important;
        left: -5px !important;
      }
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
