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
        Subscriber Details
      </v-card-title>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-uppercase"
            >#id:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            subscriber.id
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >email:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            subscriber.email
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >status:</v-col
          >
          <v-col cols="6" class="open-sans text-start">{{
            subscriber.is_subscribed ? "subscribed" : "unsubscribed"
          }}</v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >customer:</v-col
          >
          <v-col cols="6" class="open-sans text-start">
            {{
              subscriber.user?.first_name
                ? subscriber.user?.first_name + " " + subscriber.user?.last_name
                : "Not registered user"
            }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-body-1 py-4 text-grey-darken-2">
        <v-row>
          <v-col cols="6" class="title roboto text-start text-capitalize"
            >subscribe date:</v-col
          >
          <v-col cols="6" class="open-sans text-start">
            {{ dateFormat(subscriber.created_at) }}
          </v-col>
        </v-row>
      </v-card-text>
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
import LoadingProgressLinear from "../global/LoadingProgressLinear.vue";
import axiosClient from "@/axiosClient";
import { useRoute, useRouter } from "vue-router";
import formats from "@/mixins/formats";

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
  subscriber: {
    type: Object,
    default: () => ({}),
  },
});
const { dateFormat, currencyFormat } = formats();
const router = useRouter();
const route = useRoute();

const emitter = inject("emitter");
const errors = ref([]);
const loading = ref(false);
const isAddPage = computed(() => isNaN(props.data.id));

// const dialog = ref(true);
const emit = defineEmits(["update:dialog"]);
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
.products {
  .product-name,
  .product-date {
    font-size: 14px;
  }
  &.v-row:not(:last-of-type) {
    border-bottom: 1px solid red;
  }
}
</style>