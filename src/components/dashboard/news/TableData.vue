<template>
  <div class="has-scroll main-transition">
    <v-table v-if="!loading && subscribers.length" style="min-width: 815px">
      <thead class="roboto" style="height: 70px">
        <tr>
          <th>#id</th>
          <th>Email</th>
          <th>Status</th>
          <th>Customer</th>
          <th>Subscribe Date</th>
          <th colspan="5" class="text-center">Action</th>
        </tr>
      </thead>
      <tbody class="open-sans">
        <tr
          v-for="subscriber in subscribers"
          :key="subscriber.id"
          :class="{
            'main-transition subscriber-row': true,
          }"
          @click="$emit('showSubscriber', subscriber)"
        >
          <td class="italic-bold z-index-10">#{{ subscriber.id }}</td>
          <td class="z-index-10">{{ subscriber.email }}</td>
          <td :class="getStatusClass(subscriber.is_subscribed)">
            {{ subscriber.is_subscribed ? "subscribe" : "unsbscribe" }}
          </td>
          <td class="z-index-10" v-if="subscriber.user?.first_name">
            {{ subscriber.user?.first_name + " " + subscriber.user?.last_name }}
          </td>
          <td class="z-index-10 text-red" v-else>Not resitered user</td>
          <td class="z-index-10">{{ dateFormat(subscriber.created_at) }}</td>
          <td class="z-index-10 d-flex align-center justify-center" colspan="5">
            <ActionButton
              tooltip="Change The Status"
              icon="mdi-sync"
              color="#ff9500"
              backgroundColor="#fff3e0"
              @@click.stop.prevent="$emit('changeStatus', subscriber)"
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
import ActionButton from "../global/ActionButton.vue";

defineProps({
  subscribers: {
    type: Object,
    required: true,
  },
});

// const emit = defineEmits(['editDiscount', 'deleteDiscount']);

const getStatusClass = (isActive) => {
  return {
    "text-capitalize": true,
    "z-index-10": true,
    "text-green": isActive,
    "text-orange": !isActive,
  };
};

const { dateFormat, currencyFormat } = formats();
</script>

<style lang="scss">
@import "@/assets/scss/_tableStyle.scss";

.subscriber-row {
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
