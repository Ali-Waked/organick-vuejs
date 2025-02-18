<template>
  <div class="has-scroll main-transition">
    <v-table style="min-width: 815px">
      <thead class="roboto" style="height: 70px">
        <tr>
          <th># Order Number</th>
          <th>Email</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Order Date</th>
          <th colspan="5" class="text-center">Action</th>
        </tr>
      </thead>
      <tbody class="open-sans">
        <tr v-for="order in orders" :key="order.id">
          <td class="italic-bold"># {{ order.number }}</td>
          <td>{{ order.customer.email }}</td>
          <td>{{ currencyFormat(order.amount, order.currency) }}</td>
          <td :class="getStatusClass(order.status)">
            {{ order.status }}
          </td>
          <td>{{ dateFormat(order.created_at) }}</td>
          <td colspan="5" class="d-flex align-center justify-center">
            <slot name="actions" :order />
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
  orders: {
    type: Object,
    required: true,
  },
});

const { dateFormat, currencyFormat } = formats();

const getStatusClass = (status) => {
  const lowerStatus = toLower(status);
  return {
    "text-capitalize": true,
    "text-orange": lowerStatus === "pending",
    "text-blue": lowerStatus === "processing",
    "text-green": lowerStatus === "shipping",
    "text-green": lowerStatus === "drivied",
    "text-green-darken-3": lowerStatus === "completed",
    "text-red": lowerStatus === "cancelled",
    "text-refuneded": lowerStatus === "refuneded",
    "text-black": true,
  };
};
</script>

<style lang="scss">
@import "@/assets/scss/_tableStyle.scss";
</style>
