<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    class="positoin-relative"
    min-width="350"
    max-width="500"
  >
    <v-card class="mx-auto text-center pt-8 pb-4 px-4" width="100%">
      <!-- صورة العميل -->
      <v-avatar size="80" class="mx-auto">
        <v-img :src="feedback.customer.avatar" alt="Customer Avatar" />
      </v-avatar>

      <!-- اسم العميل -->
      <v-card-title class="text-h5 font-weight-bold roboto name">
        {{ feedback.customer.first_name }} {{ feedback.customer.last_name }}
      </v-card-title>

      <!-- البريد الإلكتروني -->
      <div class="text-subtitle-2 text-grey-darken-1 mb-2 email">
        {{ feedback.customer.email }}
      </div>

      <!-- تقييم العميل -->
      <div class="d-flex align-center justify-center">
        <v-rating
          color="amber"
          length="5"
          half-increments
          style="pointer-events: none; font-size: 11px"
          size="15px"
          :model-value="feedback.rating"
        ></v-rating>
      </div>

      <!-- الحالة (Featured / Not Featured) -->
      <v-chip
        :color="feedback.is_featured ? 'green' : 'grey'"
        class="ma-2"
        text-color="white"
        label
      >
        {{ feedback.is_featured ? "Featured" : "Not Featured" }}
      </v-chip>

      <!-- تعليق العميل -->
      <v-card-text class="mt-2 text-body-1 text-grey-darken-2 open-sans">
        "{{ feedback.comment }}"
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

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
  feedback: {
    type: Object,
    default: () => ({}),
  },
});

const city = reactive({
  id: "",
  name: "",
  driver_price: "",
});

const emitter = inject("emitter");
const errors = ref([]);
const loading = ref(false);
const isAddPage = computed(() => isNaN(props.data.id));

// const dialog = ref(true);
const emit = defineEmits(["update:dialog", "fetchCities"]);
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
.name {
  text-transform: capitalize;
  color: $arapawa;
}
.email {
  text-transform: lowercase;
  color: $altamira;
}
</style>