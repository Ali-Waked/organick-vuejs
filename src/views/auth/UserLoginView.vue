<template>
  <div class="login mt-4">
    <v-container>
      <v-row justify="center">
        <v-col cols="6" class="d-none d-md-block">
          <LoginImage height="70vh" class="mt-8" />
        </v-col>
        <v-col cols="12" sm="10" md="6" class="mt-0 mt-md-6">
          <div class="form-container">
            <div style="margin-top: 90px" class="roboto">
              <LoginWithButton
                class="border text-blue-darken-4"
                driver="google"
                @login="LoginWith('google')"
              >
                <template #logo>
                  <GoogleLogo width="30" height="30" />
                </template>
              </LoginWithButton>
              <LoginWithButton
                class="bg-blue-darken-4 mt-4"
                driver="facebook"
                @login="LoginWith('facebook')"
              >
                <template #logo>
                  <FacebookLogo width="32" height="32" />
                </template>
              </LoginWithButton>

              <LoginWithButton
                class="border text-grey-darken-4 mt-4"
                driver="slack"
                @login="LoginWith('slack')"
              >
                <template #logo>
                  <SlackLogo width="30" height="30" />
                </template>
              </LoginWithButton>

              <LoginWithButton
                class="bg-black mt-4"
                driver="X"
                @login="LoginWith('google')"
              >
                <template #logo>
                  <XLogo width="25" height="22" />
                </template>
              </LoginWithButton>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useLoadingStore } from "@/stores/loading";
import { onMounted, ref, watch } from "vue";
import LoginImage from "@/components/front/svgs/image/LoginImage.vue";
import { useAuthStore } from "../../stores/auth/auth";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import LoginWithButton from "../../components/dashboard/global/LoginWithButton.vue";

import GoogleLogo from "@/components/front/svgs/icons/GoogleLogo.vue";
import XLogo from "@/components/front/svgs/icons/XLogo.vue";
import FacebookLogo from "../../components/front/svgs/icons/FacebookLogo.vue";
import SlackLogo from "../../components/front/svgs/icons/SlackLogo.vue";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const { loading, errors, isAuthenticated, redirect } = storeToRefs(auth);
const router = useRouter();
const route = useRoute();
const login = async () => {
  await auth.login({ email: email.value, password: password.value });
  if (redirect) {
    router.push({ name: "dashboard" });
  }
};
const LoginWith = (driver) => {
  window.location = `http://localhost/auth/${driver}/redirect`;
};
onMounted(() => {
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss" scoped>
.login {
  .form-container {
    // height: 80vh;
    form {
      position: relative;
      top: 10%;
      input {
        background-color: $arapawa;
      }
      button {
        color: #fff;
        background-color: $arapawa;
        font-size: 20px;
      }
      + div {
        > p {
          position: relative;
          color: $arapawa;
          font-size: 30px;
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 2px;
            background-color: #9e9e9e;
            z-index: 1;
          }
          &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 100%;
            background-color: #fff;
            z-index: 4;
          }
          span {
            display: block;
            text-align: center;
            position: relative;
            z-index: 10;
          }
        }
      }
    }
  }
}
</style>
