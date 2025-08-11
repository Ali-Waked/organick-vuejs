<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    class="positoin-relative"
    min-width="350"
    max-width="500"
  >
    <v-card class="mx-auto text-center pt-8 pb-4 has-scroll" width="100%">
      <v-card-title class="text-h5 font-weight-bold roboto">
        Show Message
      </v-card-title>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-uppercase"
            >#id:</v-col
          >
          <v-col cols="6" class="open-sans text-start"
            >#{{ contactMessage.id }}</v-col
          >
        </v-row>
      </v-card-text>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >Name:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            contactMessage.name
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text
        class="text-body-1 py-4 text-grey-darken-2 d-flex justify-space-between"
      >
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >Email:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            contactMessage.email
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text
        class="text-body-1 py-4 text-grey-darken-2 d-flex justify-space-between"
      >
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >Subject:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            contactMessage.subject
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >Message:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            contactMessage.message
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text
        class="text-body-1 py-4 text-grey-darken-2"
        v-if="contactMessage.reply_id"
      >
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >Repaly With:</v-col
          >
          <v-col cols="6" class="open-sans text-start"
            >{{ contactMessage.reply.first_name }}
            {{ contactMessage.reply.last_name }}</v-col
          >
        </v-row>
      </v-card-text>
      <v-card-text
        class="text-body-1 py-4 text-grey-darken-2"
        v-if="contactMessage.reply_id"
      >
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >Reply Date:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            dateFormat(contactMessage.replyed_at)
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text
        class="text-body-1 py-4 text-grey-darken-2"
        v-if="contactMessage.reply_id"
      >
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >Reply Message:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            contactMessage.reply_message
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="mt-4" v-if="!contactMessage.reply_id">
        <v-btn
          append-icon="mdi-reply"
          color="#274C5B"
          variant="tonal"
          @click="$emit('showContactMessage', contactMessage)"
          >Send Reply</v-btn
        >
      </v-card-actions>
    </v-card>
    <span class="close-icon">
      <v-icon
        icon="mdi-close-circle-outline"
        @click="$emit('update:dialog', false)"
      ></v-icon>
    </span>
  </v-dialog>
</template>

<script setup>
import { computed, inject, onMounted, reactive, ref, watch } from "vue";
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
const { dateFormat, currencyFormat } = formats();
const route = useRoute();

// const dialog = ref(true);
const emit = defineEmits([
  "update:dialog",
  "fetchCities",
  "showContactMessage",
]);
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
  border-bottom: 1px solid $light-gray;
  // margin-bottom: -12px;
}
</style>