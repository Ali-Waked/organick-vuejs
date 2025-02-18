<template>
  <div class="orders pt-4">
    <BannerSection title="Orders" />
    <v-container>
      <v-row class="has-scroll mx-auto my-12">
        <v-col cols="12">
          <v-row justify="center" class="roboto row-head">
            <v-col cols="2">Order #</v-col>
            <v-col cols="2" class="pl-8">Date</v-col>
            <v-col cols="2" class="text-center">Status</v-col>
            <v-col cols="2" lg="1">SubTotal</v-col>
            <v-col cols="2" lg="1">Items</v-col>
            <v-col cols="2" lg="1">Actions</v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row
            justify="center"
            class="open-sans row-items"
            v-for="order in orders"
            :key="order.id"
          >
            <v-col
              cols="2"
              class="font-weight-bold text-"
              style="color: #274c5b"
              >#{{ order.number }}</v-col
            >
            <v-col cols="2">{{ dateFormat(order.created_at) }}</v-col>
            <v-col cols="2" class="text-center"
              ><span
                :class="[
                  'd-inline-block text-center py-1 px-3 rounded cursor-default status text-white ',
                  getStatusBackground(order.status),
                ]"
                >{{ order.status }}</span
              ></v-col
            >
            <v-col cols="2" lg="1">{{ currencyFormat(order.amount) }}</v-col>
            <v-col cols="2" lg="1">{{
              getItemsCount(order.items_count)
            }}</v-col>
            <v-col cols="2" lg="1">
              <v-btn
                color="purple"
                variant="flat"
                text="pay"
                prepend-icon="mdi-credit-card"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import { useLoadingStore } from "@/stores/loading";
import BannerSection from "@/components/front/global/BannerSection.vue";
import { onMounted, ref } from "vue";
import { toLower } from "lodash";
import axiosClient from "@/axiosClient";
import formats from "@/mixins/formats";

const { dateFormat, currencyFormat } = formats();

const orders = ref({});

const getStatusBackground = (status) => {
  status = toLower(status);
  return {
    "bg-orange": status == "pending",
    "bg-blue": status == "processing",
    "bg-green": status == "driving",
    "bg-green-darken-2": status == "completed",
    "bg-red": status == "canceled",
    "bg-red-darken-3": status == "refunded",
  };
};

const getItemsCount = (items) => {
  return items > 1 ? items + " items" : items + " item";
};
onMounted(async () => {
  useLoadingStore().stopLoading();
  await axiosClient
    .get("/orders")
    .then((response) => {
      orders.value = response.data.data;
      console.log(response);
    })
    .catch((e) => {
      console.error(e);
    });
});
</script>

<style lang="scss" scoped>
.row-head {
  color: $arapawa;
  font-weight: bold;
  font-size: 18px;
}
.row-items {
  color: $altamira;
  &:not(:last-of-type) {
    > div {
      border-bottom: 1px solid #999eee;
    }
  }
  // border-bottom: 1px solid;
  .status {
    // font-size: 12px;
    // width: fit-content;
  }
}
</style>
