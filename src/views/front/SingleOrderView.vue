<template>
  <div class="orders pt-4" v-if="order.number">
    <BannerSection title="Show Order Details" />
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="7">
          <div class="header open-sans order-information">
            Order Information
          </div>
        </v-col>
        <v-col cols="12" class="info" :lg="7">
          <KeyValueRow label="#Number:">{{ order.number }}</KeyValueRow>
          <KeyValueRow label="Created Order Date:">{{
            dateFormat(order.created_at)
          }}</KeyValueRow>
          <KeyValueRow label="Drivery Price:"
            >{{ currencyFormat(order.shipping_address.city.driver_price) }}
          </KeyValueRow>
          <KeyValueRow label="Total Price:">{{
            currencyFormat(order.amount)
          }}</KeyValueRow>
          <KeyValueRow label="Payment Method:">{{
            order.payment.payment_method.name
          }}</KeyValueRow>
          <KeyValueRow label="Status:">
            <span
              :class="[
                'd-inline-block text-center py-1 px-3 rounded cursor-default status text-white ',
                statusClass,
              ]"
              >{{ order.status }}</span
            >
          </KeyValueRow>

          <v-row
            v-if="
              ['stripe', 'paypal'].includes(order.payment.payment_method.name)
            "
          >
            <v-col class="roboto title font-weight-bold" cols="6"
              >Action:</v-col
            >
            <v-col class="open-sans" cols="6">
              <div class="position-relative buy-btn">
                <v-btn
                  color="#525C60"
                  variant="flat"
                  @click="showOrderDetails(order.number)"
                >
                  <v-icon icon="mdi-credit-card" size="26px" />
                </v-btn>
                <v-tooltip text="PAY NOW" activator="parent" location="top">
                </v-tooltip>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" lg="7">
          <div class="header open-sans order-address">
            Order Shipping Address
          </div>
        </v-col>
        <v-col cols="12" class="info" :lg="7">
          <KeyValueRow label="Phone Number:">{{
            order.shipping_address.phone_number
          }}</KeyValueRow>
          <KeyValueRow label="Street:">{{
            order.shipping_address.street
          }}</KeyValueRow>
          <KeyValueRow label="City:">{{
            order.shipping_address.city.name
          }}</KeyValueRow>
          <KeyValueRow v-if="order.shipping_address.notes" label="Note:"
            >{{ order.shipping_address.notes }}
          </KeyValueRow>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" lg="7">
          <div class="header open-sans order-items">Order Items</div>
        </v-col>
        <v-col cols="12" lg="7">
          <v-row justify="center" class="roboto row-head">
            <v-col cols="2" lg="3" class="roboto title font-weight-bold"
              >Image</v-col
            >
            <v-col cols="3" lg="3" class="pl-8 roboto title font-weight-bold"
              >Name</v-col
            >
            <v-col cols="2" lg="2" class="roboto title font-weight-bold"
              >Price</v-col
            >
            <v-col
              cols="2"
              lg="2"
              class="roboto title font-weight-bold text-center"
              >Quantity</v-col
            >
            <v-col cols="2" lg="2" class="roboto title font-weight-bold"
              >SubTotal</v-col
            >
          </v-row>
        </v-col>
        <v-col cols="12" lg="7" class="items">
          <OrderItemRow
            v-for="item in order.items"
            :key="item.id"
            :item="item"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useLoadingStore } from "@/stores/loading";
import BannerSection from "@/components/front/global/BannerSection.vue";
import { computed, onMounted, ref } from "vue";
import { toLower } from "lodash";
import axiosClient from "@/axiosClient";
import formats from "@/mixins/formats";
import { useRoute } from "vue-router";
import OrderItemRow from "@/components/front/single_order_page/OrderItemRow.vue";
import KeyValueRow from "@/components/front/global/KeyValueRow.vue";

const { dateFormat, currencyFormat } = formats();
const route = useRoute();
const order = ref([]);

const getStatusBackground = (status) => {
  // status = toLower(status);
  const map = {
    pending: "bg-orange",
    processing: "bg-blue",
    driving: "bg-green",
    completed: "bg-green-darken-2",
    canceled: "bg-red",
    refunded: "bg-red-darken-3",
  };
  return map[toLower(status)] || "bg-grey";
};

const statusClass = computed(() => getStatusBackground(order.value.status));

onMounted(async () => {
  await axiosClient
    .get(`/orders/${route.params.order}`)
    .then((response) => {
      console.log(response);
      order.value = response.data;
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      useLoadingStore().stopLoading();
    });
});
</script>

<style lang="scss" scoped>
.header {
  font-size: 32px;
  color: $green-sheen;
  font-weight: 500;
  text-align: center;
  letter-spacing: 3px;
  font-style: italic;
  margin-top: 20px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: $green-sheen;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -2;
  }

  &::before {
    content: "";
    position: absolute;
    height: 8px;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  &.order-information::before {
    width: 316px;
  }

  &.order-address::before {
    width: 406px;
  }

  &.order-items::before {
    width: 206px;
  }

  @media screen and (max-width: 959px) {
    font-size: 24px;
    margin-top: 10px;

    &.order-information::before {
      width: 260px;
    }

    &.order-address::before {
      width: 325px;
    }

    &.order-items::before {
      width: 165px;
    }
  }

  @media screen and (max-width: 600px) {
    font-size: 20px;
    margin-top: 5px;

    &.order-information::before {
      width: 225px;
    }

    &.order-address::before {
      width: 285px;
    }

    &.order-items::before {
      width: 150px;
    }
  }
}

.row-head {
  color: $arapawa;
}

.link {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0px;
    transition: 0.5s;
    width: 0px;
    height: 2px;
    background-color: currentColor;
  }

  &.hover {
    &::after {
      width: 100%;
    }
  }
}

.buy-btn {
  width: fit-content;
  z-index: 100;
}
</style>