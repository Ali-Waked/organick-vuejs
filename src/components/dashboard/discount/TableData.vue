<template>
  <div class="has-scroll main-transition">
    <v-table v-if="!loading && discounts.length" style="min-width: 815px">
      <thead class="roboto" style="height: 70px">
        <tr>
          <th>Name</th>
          <th class="text-center">Discount Mode</th>
          <th>Discount For</th>
          <th>Status</th>
          <th>Starts Date</th>
          <th>Ends Date</th>
          <th>Created Date</th>
          <th colspan="5" class="text-center">Action</th>
        </tr>
      </thead>
      <tbody class="open-sans">
        <tr v-for="discount in discounts" :key="discount.id">
          <td class="">{{ discount.name }}</td>
          <td class="text-center">{{ discount.type }}</td>
          <td>{{ discount.discount_for }}</td>
          <td :class="getStatusClass(discount.is_active)">
            {{ discount.is_active ? "active" : "archived" }}
          </td>
          <td>{{ dateFormat(discount.started_at) }}</td>
          <td>{{ dateFormat(discount.ended_at) }}</td>
          <td>{{ dateFormat(discount.created_at) }}</td>
          <td colspan="5" class="d-flex align-center justify-center">
            <!-- <ActionButton tooltip="Edit The Discount" icon="mdi-pen" color="#ff9500" backgroundColor="#fff3e0" /> -->
            <ActionButtons
              @delete="
                $emit('deleteDiscount', {
                  name: discount.name,
                  id: discount.id,
                })
              "
              @edit="$emit('editDiscount', discount.id)"
              @show="$emit('showDiscount', discount)"
              :tooltip
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { toLower } from "lodash";
import formats from "@/mixins/formats";
import ActionButtons from "../global/ActionButtons.vue";

defineProps({
  discounts: {
    type: Object,
    required: true,
  },
});

// const emit = defineEmits(['editDiscount', 'deleteDiscount']);

const tooltip = {
  show: "Show Discount",
  edit: "Edit Discount",
  delete: "Delete Discount",
};

const getStatusClass = (isActive) => {
  return {
    "text-capitalize": true,
    "text-green": isActive,
    "text-orange": !isActive,
  };
};

const { dateFormat, currencyFormat } = formats();
</script>

<style lang="scss">
@import "@/assets/scss/_tableStyle.scss";
</style>
