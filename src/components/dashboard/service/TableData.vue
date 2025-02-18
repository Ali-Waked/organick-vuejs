<template>
  <div class="has-scroll main-transition">
    <v-table style="min-width: 815px">
      <thead class="roboto" style="height: 70px">
        <tr>
          <th>Icon</th>
          <th>Name</th>
          <th>Subscribe Number</th>
          <th>Status</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody class="open-sans">
        <tr v-for="item in data" :key="item.id">
          <td>
            <img :src="item.image" :alt="item.name" />
          </td>
          <td class="text-capitalize">{{ item.name }}</td>
          <td>{{ item.subscribe_count }}</td>
          <td :class="getStatusClass(item.status)">{{ item.status }}</td>
          <td class="d-flex align-center justify-center">
            <slot name="actions" :item />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { toLower } from "lodash";
defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const getStatusClass = (status) => {
  const lowerStatus = toLower(status);
  return {
    "text-capitalize": true,
    "text-green": lowerStatus === "active",
    "text-orange": lowerStatus != "active",
  };
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_tableStyle.scss";
img {
  height: 38px;
  width: 44px;
}
</style>
