<template>
  <div class="register mt-4">
    <v-container>
      <v-row justify="center">
        <v-col cols="6" class="d-none d-md-block">
          <RegisterImage height="70vh" class="mt-8" />
        </v-col>
        <v-col cols="12" sm="10" md="6">
          <div class="form-container">
            <form @submit.prevent="login" class="open-sans">
              <v-text-field
                label="Your Last Name"
                type="text"
                variant="outlined"
                color="#274C5B"
                :error-messages="errors.email"
                v-model="firstName"
                class="mb-2"
              ></v-text-field>
              <v-text-field
                label="Your First Name"
                type="text"
                variant="outlined"
                color="#274C5B"
                :error-messages="errors.email"
                v-model="lastName"
                class="mb-2"
              ></v-text-field>
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
                >Join Now</v-btn
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
import RegisterImage from "@/components/front/svgs/image/RegisterImage.vue";
import { useAuthStore } from "../../stores/auth/auth";
import { storeToRefs } from "pinia";
const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const auth = useAuthStore();
const { loading, errors, isAuthenticated } = storeToRefs(auth);

const login = async () => {
  await auth.login({ email: email.value, password: password.value });
  // auth.logout();
};
onMounted(() => {
  // console.log("is", isAuthenticated.value);
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss" scoped>
.register {
  .form-container {
    height: 80vh;
    form {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      input {
        background-color: $arapawa;
      }
      button {
        color: #fff;
        background-color: $arapawa;
        font-size: 20px;
      }
    }
  }
}
</style>
