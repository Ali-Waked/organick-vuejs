<template>
  <BannerSection title="Profile" />
  <v-container>
    <GeneralInfo :data="profile.data" />
    <!-- <BillingAddress :data="profile.data?.billing_address" /> -->
  </v-container>
  <pre>
    {{ profile }}
  </pre>
</template>
<script setup>
import { useLoadingStore } from "@/stores/loading";
import { onMounted, ref } from "vue";
import axiosClient from "@/axiosClient";
import BannerSection from "@/components/front/portfolio_page/BannerSection.vue";
import GeneralInfo from "@/components/front/profile_page/GeneralInfo.vue";
import BillingAddress from "@/components/front/profile_page/BillingAddress.vue";

const profile = ref({});

onMounted(async () => {
  useLoadingStore().stopLoading();
  await axiosClient
    .get("/profile")
    .then((response) => {
      profile.value = response.data;
    })
    .catch((e) => {
      console.error(e);
    });
});
</script>
