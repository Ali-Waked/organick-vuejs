<template>
  <div class="has-scroll main-transition">
    <v-table style="min-width: 815px">
      <thead class="roboto" style="height: 70px">
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Last Activied At</th>
          <th>Joined At</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody class="open-sans">
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ dateFormat(item.created_at) }}</td>
          <td>{{ dateFormat(item.created_at) }}</td>
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
  loading: {
    type: Boolean,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
const { dateFormat } = formats();
</script>
<style lang="scss">
@import "@/assets/scss/_tableStyle.scss";
</style>
