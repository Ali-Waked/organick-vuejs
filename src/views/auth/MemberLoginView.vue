<template>
  <div class="login mt-4">
    <v-container>
      <v-row justify="center">
        <v-col cols="6" class="d-none d-md-block">
          <SignInImage height="70vh" width="90%" class="mt-8" />
        </v-col>
        <v-col cols="12" sm="10" md="6" class="mt-0 mt-md-16">
          <div class="form-container">
            <form
              @submit.prevent="login"
              class="open-sans d-block w-100 mt-0 mt-md-10"
            >
              <v-text-field
                label="Enter Your Email"
                type="email"
                variant="outlined"
                color="#274C5B"
                :error-messages="errors.email"
                v-model="email"
                class="mb-2"
              ></v-text-field>
              <v-text-field
                label="Enter Your Password"
                type="password"
                variant="outlined"
                color="#274C5B"
                :error-messages="errors.password"
                v-model="password"
                class="mb-2"
              ></v-text-field>
              <v-btn class="text-none w-100" type="submit" height="50" :loading
                >Login</v-btn
              >
            </form>
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
// import LoginWithButton from "../../components/dashboard/global/LoginWithButton.vue";

// import GoogleLogo from "@/components/front/svgs/icons/GoogleLogo.vue";
// import XLogo from "@/components/front/svgs/icons/XLogo.vue";
import SignInImage from "../../components/front/svgs/image/SignInImage.vue";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const {
user,
  loading,
  errors,
  isAuthenticated,
  redirect,
  isAdmin,
  isDriver,
  isModerator,
} = storeToRefs(auth);
const router = useRouter();
const route = useRoute();
const login = async () => {
  await auth.login({ email: email.value, password: password.value });
console.log(user);
  if (redirect) {
//if(!user.value) {
//await auth.checkAuth();
//}
    if (isAdmin.value) {
console.log('isAdmin');
      router.push({ name: "dashboard", params: { role: "admin" } });
    } else if (isDriver.value) {
console.log('driver');
      router.push({ name: "dashboard", params: { role: "driver" } });
    } else if (isModerator.value) {
console.log('moderator');
      router.push({ name: "dashboard", params: { role: "moderator" } });
    } else {
      router.push({ name: "home" });
    }
    // router.push({ name: "dashboard", params: { role: 'admin' } });
  }
};
// const LoginWith = (driver) => {
//   window.location = `http://localhost/auth/${driver}/redirect`;
// };
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
