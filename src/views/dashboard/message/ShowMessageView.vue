<template>
  <div class="contact-message">
    <PageTitle title="Show Contact Messages" :items />
    <div class="mt-4">
      <v-btn
        text="Resolve"
        append-icon="mdi-send"
        class="float-right"
        color="#274C5B"
        height="48px"
        v-if="!message.is_resolved"
      />
    </div>
    <v-row justify="center" class="mt-16">
      <v-col cols="11" sm="9" md="8">
        <v-row class="row">
          <v-shell class="w-100" v-if="message.hasOwnProperty('id')">
            <v-row>
              <v-col cols="5" sm="4" md="3" class="roboto">Full Name:</v-col>
              <v-col cols="6" class="open-sans text-underline">{{
                message.name
              }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="5" sm="4" md="3" class="roboto">Email:</v-col>
              <v-col cols="6" class="open-sans">{{ message.email }}</v-col>
            </v-row>
            <v-row v-if="message.company">
              <v-col cols="5" sm="4" md="3" class="roboto">Company:</v-col>
              <v-col cols="6" class="open-sans">{{ message.company }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="5" sm="4" md="3" class="roboto">Subject:</v-col>
              <v-col cols="6" class="open-sans">{{ message.subject }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="5" sm="4" md="3" class="roboto">Message:</v-col>
              <v-col cols="11" class="open-sans ml-6">{{
                message.message
              }}</v-col>
            </v-row>
          </v-shell>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import FilterSection from "@/components/dashboard/global/FilterSection.vue";
import FilterOption from "@/components/dashboard/global/FilterOption.vue";
import SortingButton from "@/components/dashboard/global/SortingButton.vue";
import debounce from "lodash.debounce";
import { useUserStore } from "../../../stores/dashboard/user";
import TableData from "../../../components/dashboard/contactMessage/TableData.vue";
import ActionButton from "../../../components/dashboard/global/ActionButton.vue";
import axiosClient from "@/axiosClient";

const message = ref({});
const router = useRouter();
const route = useRoute();
const emitter = inject("emitter");
const { id, subject } = route.query;
const items = [
  {
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    title: "Contact Messages",
    to: "/dashboard/messages",
  },
  {
    title: "Show Messages",
  },
];

onMounted(async () => {
  console.log(route.options);
  emitter.emit("showLoading", true);
  try {
    await axiosClient.get(`/dashboard/contacts/${id}`).then((response) => {
      message.value = response.data;
    });
  } catch (e) {
    console.error(e);
  } finally {
    emitter.emit("showLoading", false);
  }
});
</script>

<style lang="scss" scoped>
.row {
  border: 3px solid $green-sheen;
  border-radius: 8px;
  padding: 35px;
  .roboto {
    color: $arapawa;
    font-size: 20px;
    font-weight: 500;
  }
  .open-sans {
    color: $altamira;
  }
}
</style>
