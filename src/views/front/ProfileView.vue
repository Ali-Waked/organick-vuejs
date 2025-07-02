<template>
  <BannerSection title="Profile" />
  <v-container>
    <GeneralInfo :data="profile.data" class="mt-4" @edit-information="edit" />
    <BillingAddress :data="profile.data?.billing_address" />
    <UpdateInformationDialog
      v-model:dialog="dialog"
      :data="profile.data"
      @fetch-profile="onMounted"
    />
  </v-container>
</template>
<script setup>
import { useLoadingStore } from "@/stores/loading";
import { onMounted, ref } from "vue";
import axiosClient from "@/axiosClient";
import BannerSection from "@/components/front/portfolio_page/BannerSection.vue";
import GeneralInfo from "@/components/front/profile_page/GeneralInfo.vue";
import BillingAddress from "@/components/front/profile_page/BillingAddress.vue";
import UpdateInformationDialog from "../../components/front/profile_page/UpdateInformationDialog.vue";

const profile = ref({});
const dialog = ref(false);

const edit = () => {
  console.log("Edit profile information");
  dialog.value = true;
};

onMounted(async () => {
  useLoadingStore().stopLoading();
  await axiosClient
    .get("/profile")
    .then((response) => {
      response.data.data.avatar_url = response.data.data.avatar;
      delete response.data.data.avatar;
      profile.value = response.data;
    })
    .catch((e) => {
      console.error(e);
    });
});
</script>
