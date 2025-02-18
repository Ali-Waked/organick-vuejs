<template>
  <div class="has-scroll main-transition">
    <v-table v-if="!loading && categories.length" style="min-width: 815px">
      <thead class="roboto" style="height: 70px">
        <tr>
          <th># ID</th>
          <th>Category Name</th>
          <th>Active Product</th>
          <th>Category Status</th>
          <th>Created At</th>
          <th colspan="5" class="text-center">Action</th>
        </tr>
      </thead>
      <tbody class="open-sans">
        <tr v-for="category in categories" :key="category.id">
          <td class="italic-bold"># {{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.active_products_count }}</td>
          <td :class="getStatusClass(category.is_active)">
            {{ category.is_active ? "active" : "archived" }}
          </td>
          <td>{{ dateFormat(category.created_at) }}</td>
          <td colspan="5" class="d-flex align-center justify-center">
            <slot name="actions" :category="category" />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { toLower } from "lodash";
import formats from "@/mixins/formats";

defineProps({
  categories: {
    type: Object,
    required: true,
  },
});

const { dateFormat } = formats();

const getStatusClass = (isActive) => {
  return {
    "text-capitalize": true,
    "text-green": isActive,
    "text-orange": !isActive,
  };
};
</script>

<style lang="scss">
@import "@/assets/scss/_tableStyle.scss";
</style>
