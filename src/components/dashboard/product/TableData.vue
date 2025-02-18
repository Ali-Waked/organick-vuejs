<template>
  <div class="has-scroll main-transition">
    <v-table class="table-responsive">
      <thead class="roboto table-header">
        <tr>
          <th># ID</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Status</th>
          <th>Created At</th>
          <th v-if="isTrashedPage">Deleted At</th>
          <th colspan="5" class="text-center">Action</th>
        </tr>
      </thead>
      <tbody class="open-sans">
        <tr v-for="product in products" :key="product.id">
          <td class="italic-bold"># {{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ currencyFormat(product.price) }}</td>
          <td>{{ product.category.name }}</td>
          <td :class="getStatusClass(product.is_active)">
            {{ status(product.is_active) }}
          </td>
          <td>{{ dateFormat(product.created_at) }}</td>
          <td v-if="isTrashedPage">{{ dateFormat(product.deleted_at) }}</td>
          <td colspan="5" class="d-flex align-center justify-center">
            <slot name="action" :product="product" />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import formats from "@/mixins/formats";
import { computed } from "vue";

defineProps({
  products: {
    type: Object,
    required: true,
  },
  isTrashedPage: {
    type: Boolean,
    default: false,
  },
});

const { dateFormat, currencyFormat } = formats();

const status = (isActive) => {
  return isActive ? "active" : "archived";
};

const getStatusClass = (status) => {
  return {
    "text-capitalize": true,
    "text-green": status,
    "text-orange": !status,
  };
};
</script>
<style lang="scss">
@import "@/assets/scss/_tableStyle.scss";
</style>
