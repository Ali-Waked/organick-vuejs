<template>
  <div class="has-scroll main-transition">
    <v-table style="min-width: 815px">
      <thead class="roboto" style="height: 70px">
        <tr>
          <th>Icon</th>
          <th>Name</th>
          <th>Staus</th>
          <th>Added Date</th>
          <th>Last Update Date</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody class="open-sans">
        <tr v-for="item in data" :key="item.id">
          <td>
            <img :src="item.icon" :alt="item.name" />
          </td>
          <td>{{ item.name }}</td>
          <td :class="getStatusClass(item.status)">{{ item.status }}</td>
          <td>{{ dateFormat(item.created_at) }}</td>
          <td>{{ dateFormat(item.updated_at) }}</td>
          <td class="d-flex align-center justify-center">
            <slot name="actions" :item />
            <!--  -->
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { toLower } from "lodash";
import formats from "@/mixins/formats";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const { dateFormat, currencyFormat } = formats();
const route = useRoute();

const isUserPage = computed(() => {
  if (route.name == "dashboard-users") {
    return true;
  }
});
const getStatusClass = (status) => {
  const lowerStatus = toLower(status);
  return {
    "text-capitalize": true,
    "text-green": lowerStatus === "active",
    "text-red": lowerStatus !== "active",
  };
};
</script>
<style lang="scss">
@import "@/assets/scss/_tableStyle.scss";
td {
  img {
    width: 60px;
    max-height: 36px;
  }
}
</style>
