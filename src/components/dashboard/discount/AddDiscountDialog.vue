<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition">
    <v-card min-width="350" width="100%" max-width="40%" class="mx-auto text-center pt-8 pb-4 px-4 has-scroll">
      <v-card-title class="roboto text-h4 text-grey-darken-3">{{
        option.title
      }}</v-card-title>
      <v-card-text>
        <v-text-field variant="outlined" type="text" required label="Discount Name" :error-messages="errors.name"
          v-model="discount.name" class="text-left mb-1" color="#525C60"></v-text-field>
        <v-autocomplete :items="discountMode" item-value="id" item-title="name" label="Discount Mode" variant="outlined"
          class="text-left mb-1" type="text" color="#525C60" :error-messages="errors.discount_mode"
          v-model="discount.discount_mode"></v-autocomplete>
        <v-autocomplete v-if="discount.discount_mode == 'fixed'" :items="discountTypes" item-value="id"
          item-title="name" label="Discount Type" variant="outlined" class="text-left mb-1" type="text" color="#525C60"
          :error-messages="errors.discount_type" v-model="discount.discount_type"></v-autocomplete>
        <v-autocomplete :items="discountFor" item-value="id" item-title="name" label="Discount For" variant="outlined"
          class="text-left mb-1" type="text" color="#525C60" :error-messages="errors.discount_for"
          v-model="discount.discount_for"></v-autocomplete>
        <v-text-field v-if="discount.discount_mode == 'fixed'" variant="outlined" type="number" required
          label="Discount Value" :error-messages="errors.value" v-model="discount.value" color="#525C60"
          class="text-left mb-1"></v-text-field>
        <v-text-field variant="outlined" type="date" required label="Starts Date" :error-messages="errors.starts_at"
          v-model="discount.starts_at" color="#525C60" class="text-left mb-1"></v-text-field>
        <v-text-field variant="outlined" type="date" required label="Ends Date" :error-messages="errors.ends_at"
          v-model="discount.ends_at" color="#525C60" class="text-left mb-1"></v-text-field>
        <v-radio-group label="Discount Status" v-model="discount.is_active" :error-messages="errors.is_active" inline>
          <v-radio label="Active" color="green" :value="1" class="mr-12"></v-radio>
          <v-radio label="Archived" color="orange-lighten-2" :value="0"></v-radio>
        </v-radio-group>
        <v-select v-if="discount.discount_for == 'product'" v-model="discount.product_ids" variant="outlined"
          :error-messages="errors.product_ids" :items="products" color="#525C60" item-title="name"
          class="text-left mb-1" item-value="id" label="Products" multiple chips outlined></v-select>
        <div v-if="discount.discount_mode == 'ranged'">
          <div class="d-flex justify-between align-center mb-4">
            <span class="roboto range-title" v-show="discount.ranges.length">Ranges:</span>
            <v-btn @click="addRange" color="primary" variant="text" class="ml-auto">
              <v-icon icon="mdi-plus" /> Add Range
            </v-btn>
          </div>
          <div v-for="(range, index) in discount.ranges" :key="index" class="mb-2">
            <v-autocomplete :items="discountTypes" item-value="id" item-title="name" label="Range Type"
              variant="outlined" class="text-left mb-1" type="text" color="#525C60"
              :error-messages="errors.range?.[index]?.type" v-model="range.type"></v-autocomplete>
            <v-text-field variant="outlined" type="number" required label="Min Price"
              :error-messages="errors.range?.[index]?.min" v-model="range.min" color="#525C60"
              class="text-left mb-1"></v-text-field>
            <v-text-field variant="outlined" type="number" required label="Max Price"
              :error-messages="errors.range?.[index]?.max" v-model="range.max" color="#525C60"
              class="text-left mb-1"></v-text-field>
            <v-text-field variant="outlined" type="number" required label="Value"
              :error-messages="errors.range?.[index]?.value" v-model="range.value" color="#525C60"
              class="text-left mb-1"
              :prepend-inner-icon="range.type == 'fixed' ? 'mdi-cash' : 'mdi-percent'"></v-text-field>
          </div>
        </div>
        <v-textarea variant="outlined" type="text" color="#525C60" label="Discount description"
          :error-messages="errors.description" v-model="discount.description" no-resize></v-textarea>
      </v-card-text>
      <v-card-actions class="pt-4">
        <v-btn @click="submit" variant="tonal" :loading :color="option.btnColor">{{ option.btnLabel }}</v-btn>
        <v-btn @click="$emit('update:dialog', false)" variant="tonal" color="grey">cancel</v-btn>
      </v-card-actions>
    </v-card>
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
  data: {
    type: Object,
    default: () => ({}),
  },
});
const products = ref([]);
const discount = reactive({
  id: '',
  name: "",
  value: "",
  discount_mode: "fixed",
  discount_type: "fixed",
  starts_at: "",
  ends_at: "",
  is_active: 1,
  description: "",
  discount_for: "order",
  ranges: [],
  product_ids: [],
});

const discountTypes = ref([
  { id: "percentage", name: "Percentage" },
  { id: "fixed", name: "Fixed Amount" },
]);
const discountMode = ref([
  { id: "fixed", name: "Fixed Amount" },
  { id: "ranged", name: "Ranged Amount" },
]);
const discountFor = ref([
  { id: "order", name: "Order" },
  { id: "product", name: "Product" },
]);

const emitter = inject("emitter");
const errors = ref([]);
const loading = ref(false);
const isAddPage = computed(() => isNaN(props.data.id));

// const dialog = ref(true);
const emit = defineEmits(["update:dialog", "fetchDiscounts", "loading"]);
const dialog = computed({
  get: () => props.dialog,
  set: (value) => emit("update:dialog", value),
});

const option = computed(() => {
  console.log("isupdate discount" + isAddPage.value + discount.id);
  return {
    title: isAddPage.value ? "Add Discount" : "Update Discount",
    btnLabel: isAddPage.value ? "Add Now" : "Update Now",
    btnColor: isAddPage.value ? "green" : "orange",
  };
});

watch(
  () => props.data,
  (newData) => {
    discount.id = newData.id || "";
    discount.name = newData.name || "";
    discount.value = newData.value || "";
    discount.starts_at = newData.starts_at || "";
    discount.ends_at = newData.ends_at || "";
    discount.is_active = newData.is_active == 1 ? 1 : 0;
    discount.description = newData.description || "";
    discount.discount_mode = newData.discount_mode || "fixed";
    discount.discount_type = newData.discount_type || "fixed";
    discount.discount_for = newData.discount_for || "order";
    discount.product_ids = newData.product_ids || [];
    discount.ranges = newData.ranges || [];
    errors.value = [];
  },
  { immediate: true }
);

const submit = () => {
  loading.value = true;
  if (discount.discount_mode == 'fixed') {
    delete discount.ranges;
  } else {
    delete discount.value;
    delete discount.discount_type;
  }
  if (discount.discount_for == 'order') {
    delete discount.product_ids;
  }
  if (isAddPage.value) {
    addDiscount();
    // console.log("isAddPage", isAddPage.value);
  } else {
    updateDiscount();
  }
};

const addDiscount = () => {
  axiosClient
    .post("/dashboard/discounts", JSON.stringify(discount))
    .then((response) => {
      emit("update:dialog", false);
      emit("fetchDiscounts");
      emitter.emit("alert", ["success", "Add New Discount Successflly"]);
    })
    .catch((e) => {
      errors.value = e.response.data.errors;
      console.error(e);
    })
    .finally(() => {
      loading.value = false;
    });
};

const updateDiscount = () => {
  axiosClient
    .put(`/dashboard/discounts/${discount.id}`, JSON.stringify(discount))
    .then((response) => {
      emit("update:dialog", false);
      emit("fetchDiscounts");
      emitter.emit("alert", ["success", "Update Discount Successflly"]);
    })
    .catch((e) => {
      errors.value = e.response.data.errors;
      console.error(e);
    })
    .finally(() => {
      loading.value = false;
    });
};

const addRange = () => {
  discount.ranges.push({
    min: 0,
    max: 0,
    value: 0,
    type: "percentage",
  });
};

onMounted(async () => {
  try {
    const response = await axiosClient.get("/dashboard/products/get-all");
    products.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});
</script>

<style lang="scss" scoped>
.range-title {
  color: #525c60;
}
</style>