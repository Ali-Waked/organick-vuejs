<template>
  <div class="has-scroll main-transition">
    <v-table v-if="!loading && feedbacks.length" style="min-width: 815px">
      <thead class="roboto" style="height: 70px">
        <tr>
          <th>Customer Name</th>
          <th class="text-center">Customer Email</th>
          <th>Rating</th>
          <th>Status</th>
          <th>Rating Date</th>
          <th colspan="5" class="text-center">Action</th>
        </tr>
      </thead>
      <tbody class="open-sans">
        <tr
          v-for="feedback in feedbacks"
          :key="feedback.id"
          :class="{
            'main-transition feedback-row': true,
          }"
          @click="$emit('showFeedback', feedback)"
        >
          <td class="z-index-10">
            {{ feedback.customer.first_name }}
            {{ feedback.customer.last_name }}
          </td>
          <td class="text-center z-index-10">
            {{ feedback.customer.email }}
          </td>
          <td class="z-index-10">{{ feedback.rating }}</td>
          <td :class="getStatusClass(feedback.is_featured)">
            {{ feedback.is_featured ? "Featured" : "Not Feacherd" }}
          </td>
          <td class="z-index-10">{{ dateFormat(feedback.created_at) }}</td>
          <td colspan="5" class="d-flex align-center justify-center z-index-10">
            <div>
              <v-icon
                icon="mdi-autorenew"
                style="--color: #4caf50; --background-color: #e5f5e9"
                class="cursor-pointer main-transition"
                @click.stop="$emit('changeStatus', feedback)"
              />
              <v-tooltip activator="parent" location="top"
                >Change Status to
                {{
                  feedback.is_featured ? "Featured" : "Not Feacherd"
                }}</v-tooltip
              >
            </div>
            <!-- <ActionButton tooltip="Edit The feedback" icon="mdi-pen" color="#ff9500" backgroundColor="#fff3e0" /> -->
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
  feedbacks: {
    type: Object,
    required: true,
  },
});

// const emit = defineEmits(['editDiscount', 'deleteDiscount']);

const tooltip = {
  edit: "Change Status",
};

const getStatusClass = (isFeatured) => {
  return {
    "text-capitalize z-index-10": true,
    "text-green": isFeatured,
    "text-orange": !isFeatured,
  };
};

const { dateFormat, currencyFormat } = formats();
</script>

<style lang="scss">
@import "@/assets/scss/_tableStyle.scss";
.feedback-row {
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
    // transform: translateX(-50%);
    background-color: #e0e0e0;
    // background-color: var(--v-theme-grey-lighten-4);
    transition: 0.3s ease;
    // z-index: -1;
    // z-index: 100;
  }
  &:hover::after {
    width: 100%;
    background-color: #f5f5f5;
  }
  // &:hover {
  //   background-color: var(--v-theme-grey-lighten-4);
  // }
  .z-index-10 {
    position: relative;
    z-index: 10;
  }
}
</style>
