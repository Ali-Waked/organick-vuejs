<template>
  <v-container v-if="!isSubscribe">
    <div
      class="subscribe-section d-flex justify-center ga-6 justify-md-space-between align-center flex-column flex-md-row"
    >
      <div class="header">
        <HeaderSection title-color="#fff" title="Subscribe to our Newsletter" />
      </div>
      <form
        @submit.prevent="subscribeForNews"
        class="d-flex align-center ga-3 flex-column flex-sm-row"
      >
        <div class="position-relative">
          <input
            type="email"
            class="open-sans"
            v-model="email"
            placeholder="Your Email Address"
          />
          <small
            class="text-red-darken-3 d-block position-absolute message"
            v-if="errors.email"
            >{{ errors.email[0] }}</small
          >
          <small
            class="text-green-darken-3 d-block position-absolute message"
            v-if="message"
            >{{ message }}</small
          >
        </div>
        <v-btn
          color="#274C5B"
          height="58"
          width="160"
          class="text-none roboto"
          variant="flat"
          type="submit"
          >Subscribe</v-btn
        >
      </form>
    </div>
  </v-container>
</template>

<script setup>
import { ref,onMounted, inject } from "vue";
import { useSubscribeForNewsStore } from "../../../stores/front/subscribeForNews";
import HeaderSection from "./HeaderSection.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../../stores/auth/auth";

const email = ref("");
const subscribeStore = useSubscribeForNewsStore();
const isSubscribe = ref(false);
const emitter = inject('emitter');
const { errors, message } = storeToRefs(subscribeStore);

const subscribeForNews =  () => {
  subscribeStore.subscribeForNews(email.value);
  console.log(message.value);
  setTimeout(() => {
      if(message.value){
    emitter.emit('showAlert','Thank you for subscribing!');
    isSubscribe.value = true;
  }
  }, 1000);
};
onMounted(() => {
  if(localStorage.getItem('isSubscribe') || useAuthStore().isAuth) {
    isSubscribe.value = true;
  }
})

</script>
<style scoped lang="scss">
.subscribe-section {
  background-image: url("@/assets/images/subscribe.jpg");
  background-size: cover;
  background-position: center;
  padding: 12px 60px;
  border-radius: 26px;
  height: 280px;
  .header {
    max-width: 28%;
  }
  form {
    input[type="email"] {
      width: 300px;
      height: 60px;
      outline: none;
      background-color: #fff;
      border-radius: 12px;
      padding: 12px;
      padding-left: 24px;
      caret-color: #ababab;
      color: $arapawa;
      ::placeholder {
        color: #ababab;
      }
    }
    button {
      font-size: 16px;
      border-radius: 12px;
      margin-left: 12px;
    }
  }
  // media
  @media (max-width: 1120px) {
    .header {
      max-width: 40%;
    }
  }
  @media (max-width: 959px) {
    border-radius: 0;
    .header {
      max-width: 100%;
    }
  }
  @media (max-width: 599px) {
    border-radius: 0;
    padding: 12px 20px;
    form {
      width: 100%;
      input[type="email"] {
        width: 100%;
      }
      button {
        font-size: 16px;
        border-radius: 12px;
        width: 100% !important;
      }
    }
  }
  .message {
    bottom: -24px;
    left: 24px;
  }
}
@media (max-width: 959px) {
  .v-container {
    padding: 0;
  }
}
</style>
