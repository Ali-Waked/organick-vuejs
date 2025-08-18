<template>
  <div class="last-order">
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        v-bind="props"
        :class="[
          'last-order-card has-scroll overflow-x-hidden',
          isHovering ? 'overflow-y-auto' : '',
        ]"
      >
        <v-card-title
          class="d-flex justify-space-between align-center"
          style="background-color: rgb(0 0 0 / 17%)"
        >
          <span class="text-h6 font-weight-bold d-inline-block ml-2 py-3"
            >Last Orders Income</span
          >
          <span class="see-more d-flex align-center">
            <span>See More</span>
            <v-icon icon="mdi-chevron-double-right" size="14px"></v-icon>
          </span>
        </v-card-title>
        <v-card-text class="pa-0">
          <v-row class="pr-2">
            <v-col cols="12">
              <v-row
                class="font-weight-bold text-uppercase mt-1 roboto pl-5"
                style="color: #274c5b"
              >
                <v-col cols="2">#No.</v-col>
                <v-col cols="5">Email</v-col>
                <v-col cols="3" class="position-relative" style="left: 16px"
                  >Status</v-col
                >
                <v-col cols="2" class="text-center">Action</v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="open-sans" style="color: #525c60">
              <v-row
                v-for="order in data"
                class="order-row cursor-default pl-5"
                :key="order.id"
              >
                <v-col cols="2">#{{ order.number }}</v-col>
                <v-col cols="5">{{ order.customer.email }}</v-col>
                <v-col cols="3">
                  <span
                    :class="[
                      'px-3 py-1 d-inline-block rounded',
                      getStatusColor(order.status),
                    ]"
                    >{{ order.status }}</span
                  >
                </v-col>
                <v-col cols="2" class="position-relative">
                  <v-hover v-slot="{ isHovering, props }">
                    <span
                      v-bind="props"
                      :class="[
                        'main-transition d-inline-block pa-2 rounded-circle position-absolute',
                        isHovering ? 'bg-green-lighten-5' : '',
                      ]"
                      style="
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                      "
                    >
                      <v-icon
                        icon="mdi-eye"
                        color="green"
                        class="cursor-pointer"
                      />
                    </span>
                  </v-hover>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-hover>
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

const getStatusColor = (status) => {
  const lowerStatus = toLower(status);
  return {
    "bg-capitalize": true,
    "bg-orange": lowerStatus === "pending",
    "bg-blue": lowerStatus === "processing",
    "bg-green": lowerStatus === "shipped",
    "bg-green": lowerStatus === "drivied",
    "bg-green-darken-3": lowerStatus === "completed",
    "bg-red": lowerStatus === "canceled",
    "bg-refuneded": lowerStatus === "refuneded",
    "bg-black": true,
  };
};
</script>

<style lang="scss" scoped>
.text-h6 {
  color: $arapawa;

  &span {
    + i {
      font-size: 20px;
    }
  }
}
span.see-more {
  color: #616161;
  cursor: pointer;
  font-size: 12px;
  transition: 0.5s;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 2px;
    width: 0;
    background: #2196f3;
    transition: 0.5s;
  }

  &:hover {
    color: #2196f3;

    &::after {
      // width: 100%;
      width: calc(100% - 10px);
    }
  }
}
.order-row {
  border-bottom: 1px solid #525c6033;
  display: flex;
  align-items: center;
  position: relative;
  // font-size: 10px !important;

  &:not(:last-of-type) {
    border-bottom: 1px solid #525c6033;
    padding-bottom: 7px;
  }

  &::after {
    content: "";
    background-color: #99999914;
    position: absolute;
    transition: 0.5s;
    // left: 0%;
    right: 0px;
    top: 0%;
    // transform: translate(-50%, -50%);
    width: 0%;
    z-index: -1;
    height: 100%;
  }

  &:hover::after {
    width: 100%;
  }
}
</style>