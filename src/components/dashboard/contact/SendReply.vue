<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    class="positoin-relative"
    min-width="350"
    max-width="500"
  >
    <v-card class="mx-auto text-center pt-12 pb-4 has-scroll" width="100%">
      <v-card-title class="text-h5 font-weight-bold roboto">
        Send Reply Message
      </v-card-title>
      <v-card-text
        class="text-body-1 py-4 text-grey-darken-2 d-flex justify-space-between"
      >
        <v-row>
          <v-col cols="6" class="roboto text-start text-capitalize">To:</v-col>
          <v-col cols="6" class="open-sans text-start">{{
            contactMessage.email
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-textarea
          label="Message"
          variant="outlined"
          v-model="message"
          no-resize
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          append-icon="mdi-send"
          color="#274C5B"
          variant="tonal"
          @click="sendReply(contactMessage.id)"
          :loading
          >Send</v-btn
        >
      </v-card-actions>
      <span class="close-icon">
        <v-icon
          icon="mdi-close-circle-outline"
          @click="$emit('update:dialog', false)"
        ></v-icon>
      </span>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, inject, onMounted, reactive, ref, watch } from "vue";
import LoadingProgressLinear from "../global/LoadingProgressLinear.vue";
import axiosClient from "@/axiosClient";
import { useRoute, useRouter } from "vue-router";
import formats from "@/mixins/formats";

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
  contactMessage: {
    type: Object,
    default: () => ({}),
  },
});
const message = ref("");
const { dateFormat, currencyFormat } = formats();
const router = useRouter();
const route = useRoute();

const showIsFeatured = route.name == "dashboard-show-product" ? false : true;

const emitter = inject("emitter");
const errors = ref([]);
const loading = ref(false);
const isAddPage = computed(() => isNaN(props.data.id));

const sendReply = async (id) => {
  emitter.emit("showLoading", true);
  loading.value = true;
  await axiosClient
    .post(`/dashboard/contact/${id}/send-reply`, {
      message: message.value,
    })
    .then((response) => {
      emit("update:dialog", false);
      emit("fetchContactsMessage", false);
      message.value = "";
      emitter.emit("alert", ["success", "Send Reply Message Successflly"]);
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      loading.value = false;
      emitter.emit("showLoading", false);
    });
};

// const dialog = ref(true);
const emit = defineEmits(["update:dialog", "fetchContactsMessage"]);
const dialog = computed({
  get: () => props.dialog,
  set: (value) => emit("update:dialog", value),
});
</script>

<style lang="scss" scoped>
.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: 0.3s;
  color: #9e9e9e98;
  &:hover {
    color: rgba(230, 13, 13, 0.87);
  }
}
.text-h5 {
  color: $arapawa;
}
.title {
  color: $arapawa;
  font-weight: 500;
  .open-sans {
    color: $altamira;
  }
}
.v-card-text:not(:last-of-type) {
  // border-bottom: 1px solid $light-gray;
  // margin-bottom: -12px;
}
</style>