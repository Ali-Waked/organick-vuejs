<template>
  <div class="has-scroll main-transition">
    <v-table style="min-width: 815px">
      <thead class="roboto" style="height: 70px">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Subject</th>
          <th>Send Date</th>
          <th>Reply From</th>
          <th>Reply Date</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody class="open-sans">
        <tr
          v-for="item in data"
          :key="item.id"
          :class="{
            'main-transition message-row': true,
          }"
          @click="$emit('showContactMessage', item)"
        >
          <td class="z-index-10">{{ item.name }}</td>
          <td class="z-index-10">{{ item.email }}</td>
          <td class="z-index-10">{{ item.subject }}</td>
          <td class="z-index-10">{{ dateFormat(item.created_at) }}</td>
          <td :class="getClass(item.replyed_at)">
            {{ item.reply?.first_name ?? "-" }} {{ item.reply?.last_name }}
          </td>
          <td class="z-index-10">
            {{ dateFormat(item.replyed_at) ?? "not reply" }}
          </td>
          <td class="d-flex align-center justify-center z-index-10">
            <slot name="actions" :item />
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import formats from "@/mixins/formats";
import { computed } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const { dateFormat, currencyFormat } = formats();

const getClass = (replyAt) => {
  return {
    "z-index-10": true,
    "text-red": !replyAt,
  };
};
</script>
<style lang="scss">
@import "@/assets/scss/_tableStyle.scss";
.message-row {
  cursor: pointer;
  position: relative;
  z-index: 1001;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0%;
    width: 0%;
    height: 100%;
    background-color: #e0e0e0;
    transition: 0.3s ease;
  }
  &:hover::after {
    width: 100%;
    background-color: #f5f5f5;
  }
  .z-index-10 {
    position: relative;
    z-index: 10;
  }
}
</style>
