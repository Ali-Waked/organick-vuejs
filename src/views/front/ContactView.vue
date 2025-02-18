<template>
  <div class="contact">
    <BannerSection />
    <v-container>
      <v-row class="py-12" align="center">
        <v-col cols="12" md="6" class="d-none d-md-block">
          <img src="@/assets/images/contact-us.jpg" alt="contact us" />
        </v-col>
        <v-col cols="12" md="6">
          <HeaderSection
            title="We'd love to talk about how we can work together."
          />
          <p class="open-spans">
            Simply dummy text of the printing and typesetting industry. Lorem
            had ceased to been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley.
          </p>
          <div class="contact-box mt-6">
            <v-hover v-slot="{ isHovering, props }">
              <div
                :class="[
                  'mb-2 main-transition',
                  isHovering ? 'elevation-2' : 'elevation-0',
                ]"
                v-bind="props"
              >
                <div class="icon">
                  <v-icon icon="mdi-message-outline"></v-icon>
                  <v-icon icon="mdi-message"></v-icon>
                </div>
                <div class="text">
                  <h5 class="roboto">Message</h5>
                  <span class="open-sans">support@organic.com</span>
                </div>
              </div>
            </v-hover>
            <v-hover v-slot="{ isHovering, props }">
              <div
                :class="[
                  'main-transition',
                  isHovering ? 'elevation-2' : 'elevation-0',
                ]"
                v-bind="props"
              >
                <div class="icon">
                  <v-icon icon="mdi-phone-outline"></v-icon>
                  <v-icon icon="mdi-phone"></v-icon>
                </div>
                <div class="text">
                  <h5 class="roboto">Contact Us</h5>
                  <span class="open-sans">+01 123 456 789</span>
                </div>
              </div>
            </v-hover>
          </div>
          <ul class="d-flex justify-start ml-2 mt-5 align-center ga-2">
            <li>
              <v-icon
                class="main-transition"
                icon="mdi-instagram"
                style="--color-on-hover: #c13584"
              ></v-icon>
            </li>
            <li>
              <v-icon
                class="main-transition"
                icon="mdi-twitter"
                style="--color-on-hover: #33ccff"
              ></v-icon>
            </li>
            <li>
              <v-icon
                class="main-transition"
                icon="mdi-facebook"
                style="--color-on-hover: #3b5998"
              ></v-icon>
            </li>
            <li>
              <v-icon
                class="main-transition"
                icon="mdi-pinterest"
                style="--color-on-hover: #910101"
              ></v-icon>
            </li>
          </ul>
        </v-col>
        <v-col cols="12" md="6">
          <img src="@/assets/images/about/why-choose-us.jpg" alt="contact us" />
        </v-col>
        <v-col cols="12" md="6">
          <HeaderSection header="Location" title="Our Farms" />
          <p class="open-sans">
            Established fact that a reader will be distracted by the readable
            content of a page when looking a layout. The point of using.
          </p>
          <div class="d-flex justify-start align-center">
            <v-icon
              icon="mdi-map-marker"
              style="color: #7eb693; font-size: 32px; margin-right: 4px"
            ></v-icon>
            <p class="open-sans">
              <b class="mb-1 d-inline-block">New York, USA:</b> <br />
              <span>299 Park Avenue New York, New York 10171</span>
            </p>
          </div>
          <div class="d-flex justify-start align-center">
            <v-icon
              icon="mdi-map-marker"
              style="color: #7eb693; font-size: 32px; margin-right: 4px"
            ></v-icon>
            <p class="open-sans">
              <b class="mb-1 d-inline-block">London, UK:</b><br />
              <span>30 Stamford Street, London SE1 9LQ</span>
            </p>
          </div>
        </v-col>
      </v-row>
      <form action="" class="roboto">
        <div
          class="d-flex align-center justify-center ga-8 mb-8 flex-column flex-sm-row"
        >
          <div
            class="form-control d-flex flex-column justify-center ga-3 w-100 position-relative"
          >
            <label for="full_name">Full Name*</label>
            <input
              type="text"
              placeholder="Your Full Name"
              id="full_name"
              required
              v-model="data.name"
              :class="{ error: errors.hasOwnProperty('name') }"
            />
            <small v-if="errors.hasOwnProperty('name')" class="error">{{
              errors.name[0]
            }}</small>
          </div>
          <div
            class="form-control d-flex flex-column justify-center ga-3 w-100 position-relative"
          >
            <label for="email">Your Email*</label>
            <input
              type="email"
              id="email"
              placeholder="example@yourmail.com"
              v-model="data.email"
              required
              :class="{ error: errors.hasOwnProperty('email') }"
            />
            <small v-if="errors.hasOwnProperty('email')" class="error">{{
              errors.email[0]
            }}</small>
          </div>
        </div>
        <div
          class="d-flex align-center justify-center ga-8 mb-8 flex-column flex-sm-row"
        >
          <div
            class="form-control d-flex flex-column justify-center ga-3 w-100 position-relative"
          >
            <label for="company">Company</label>
            <input
              type="text"
              id="company"
              placeholder="yourcompany name here"
              v-model="data.company"
              required
              :class="{ error: errors.hasOwnProperty('company') }"
            />
            <small v-if="errors.hasOwnProperty('company')" class="error">{{
              errors.company[0]
            }}</small>
          </div>
          <div
            class="form-control d-flex flex-column justify-center ga-3 w-100 position-relative"
          >
            <label for="subject">Subject*</label>
            <input
              type="text"
              id="subject"
              placeholder="how can we help"
              v-model="data.subject"
              required
              :class="{ error: errors.hasOwnProperty('subject') }"
            />
            <small v-if="errors.hasOwnProperty('subject')" class="error">{{
              errors.subject[0]
            }}</small>
          </div>
        </div>
        <div class="d-flex align-center justify-center ga-8 mb-4">
          <div
            class="form-control d-flex flex-column justify-center ga-3 w-100 position-relative"
          >
            <label for="message">Message*</label>
            <textarea
              name=""
              id="message"
              v-model="data.message"
              placeholder="hello there,i would like to talk about how to..."
              :class="{ error: errors.hasOwnProperty('message') }"
            ></textarea>
            <small v-if="errors.hasOwnProperty('message')" class="error">{{
              errors.message[0]
            }}</small>
          </div>
        </div>
        <v-btn
          color="#274C5B"
          variant="flat"
          class="text-none"
          width="200"
          height="70"
          @click="sendContactMessage"
          :loading
          >Send Message</v-btn
        >
      </form>
    </v-container>
    <SubscribeSection />
  </div>
</template>

<script setup>
import BannerSection from "@/components/front/contact_page/BannerSection.vue";
import HeaderSection from "@/components/front/global/HeaderSection.vue";
import SubscribeSection from "@/components/front/global/SubscribeSection.vue";
import { useLoadingStore } from "@/stores/loading";
import { onMounted, reactive, ref } from "vue";
import axiosClient from "@/axiosClient";

const data = reactive({
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
});
const errors = ref({});
const loading = ref(false);
const sendContactMessage = async () => {
  loading.value = true;
  await axiosClient
    .post("/contact", JSON.stringify(data))
    .then((response) => {
      console.log(response);
      errors.value = {};
    })
    .catch((e) => {
      console.error(e);
      errors.value = e.response.data.errors;
    })
    .finally(() => (loading.value = false));
};
onMounted(() => {
  useLoadingStore().stopLoading();
});
</script>

<style scoped lang="scss">
.contact {
  img {
    max-width: 95%;
    border-radius: 24px;
    max-height: 560px;
  }
  p {
    color: $altamira;
    font-size: 15px;
    margin-top: 12px;
  }
  .contact-box {
    > div {
      border: 1px solid #eeeeee;
      border-radius: 12px;
      background-color: #fff;
      display: flex;
      padding: 8px;
      width: 300px;
      cursor: pointer;
      .icon {
        position: relative;
        background-color: #f4f4f4;
        width: 23%;
        border-radius: 8px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin-right: 12px;
        i {
          font-size: 32px;
          &:first-of-type {
            color: $green-sheen;
            position: relative;
            z-index: 2;
          }
          &:last-of-type {
            position: absolute;
            z-index: 1;
            color: $maize;
            transform: translate(-4px, 4px);
          }
        }
      }
      .text {
        h5 {
          color: $arapawa;
          font-size: 22px;
          font-weight: 900;
        }
        span {
          color: $altamira;
          font-size: 15px;
        }
      }
    }
  }
  ul {
    margin-top: 35px;
    li {
      i {
        background-color: $hint-of-green;
        color: $arapawa;
        font-size: 22px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        cursor: pointer;
        &:hover {
          color: var(--color-on-hover);
          // transform: rotate(360deg);
          transform: rotate(360deg);
          background-color: unset;
          border: 1px solid var(--color-on-hover);
        }
      }
    }
  }
  form {
    %general-style {
      color: $altamira;
      border: 1px solid $green-sheen;
      border-radius: 14px;
      outline: none;
      padding: 20px 16px;
      &.error {
        border-color: #c62b3c;
      }
      &:focus {
        color: $arapawa;
        border-color: $arapawa;
        &.error {
          border-color: #c62b3c;
        }
      }
    }
    input {
      @extend %general-style;
    }
    textarea {
      @extend %general-style;
      height: 250px;
      resize: none;
    }
    label {
      color: $arapawa;
      font-weight: 500;
    }
    button {
      font-size: 16px;
      font-weight: 500;
      border-radius: 12px;
      margin-top: 20px;
      // margin-left: auto;
      // display: block;
    }
  }
}
</style>
