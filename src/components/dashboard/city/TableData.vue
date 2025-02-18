<template>
  <div class="has-scroll main-transition">
    <v-table style="min-width: 815px">
      <thead class="roboto" style="height: 70px">
        <tr>
          <th>City Name</th>
          <th>Drivery Price</th>
          <th>Added Date</th>
          <th>Last Update Date</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody class="open-sans">
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ currencyFormat(item.driver_price) }}</td>
          <td>{{ dateFormat(item.created_at) }}</td>
          <td>{{ dateFormat(item.updated_at) }}</td>
          <td class="d-flex align-center justify-center">
            <slot name="actions" :item />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import formats from "@/mixins/formats";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const { dateFormat, currencyFormat } = formats();
</script>
<style lang="scss">
@import "@/assets/scss/_tableStyle.scss";
</style>
