<template>
  <div class="show-order-view">
    <PageTitle title="Order Details" :items />
    <div v-if="order.id">
      <div>
        <h3 class="roboto title text-decoration-underline mt-4">
          #Order Information
        </h3>
        <v-row>
          <v-col cols="12" lg="7">
            <div class="bg-white py- mt-4 rounded border overflow-hidden">
              <v-row class="parent row overflow-hidden pa-0 ma-0">
                <v-col cols="12" class="border-b pa-4">
                  <v-row>
                    <v-col class="roboto" cols="3"> # Number </v-col>
                    <v-col cols="6" class="open-sans">
                      #{{ order.number }}
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="border-b pa-4">
                  <v-row>
                    <v-col class="roboto" cols="3"> Date </v-col>
                    <v-col class="open-sans">
                      {{ dateFormat(order.created_at) }}
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="border-b pa-4">
                  <v-row>
                    <v-col class="roboto" cols="3">Customer Name</v-col>
                    <v-col class="open-sans">
                      <v-hover v-slot="{ isHovering, props }">
                        <span
                          v-bind="props"
                          :class="[
                            isHovering
                              ? 'cursor-pointer text-blue-darken-1 text-decoration-underline'
                              : '',
                          ]"
                          @click="ShowUserInfo(order.customer)"
                          >{{ fullName }}</span
                        >
                      </v-hover>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="border-b pa-4">
                  <v-row>
                    <v-col class="roboto" cols="3">items</v-col>
                    <v-col class="open-sans"
                      >{{ order.items.length }}
                      {{ order.items.length > 1 ? "items" : "item" }}</v-col
                    >
                  </v-row>
                </v-col>
                <v-col cols="12" class="pa-4">
                  <v-row>
                    <v-col class="roboto" cols="3">Total Price</v-col>
                    <v-col class="open-sans">{{
                      currencyFormat(order.amount, order.currency)
                    }}</v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="pa-4">
                  <v-row>
                    <v-col class="roboto" cols="3">Payment Method</v-col>
                    <v-col class="open-sans">{{
                      order.payment.payment_method.name
                    }}</v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="pa-4">
                  <v-row>
                    <v-col class="roboto" cols="3">Payment Status</v-col>
                    <v-col class="open-sans">{{ order.payment.status }}</v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="pa-4">
                  <v-row>
                    <v-col class="roboto" cols="3">Status</v-col>
                    <v-col class="open-sans" cols="9">
                      <v-chip-group
                        filter
                        mandatory
                        variant="outlined"
                        v-model="status"
                        v-on:update:model-value="changeStatus"
                        class="text-capitalize"
                        column=""
                      >
                        <v-chip
                          v-for="sta in orderStatus()"
                          :key="sta.name"
                          :value="sta.name"
                          :color="sta.color"
                          link
                        >
                          {{ sta.name }}
                        </v-chip>
                      </v-chip-group>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="pa-4" v-if="!order.driver_id">
                  <v-row>
                    <v-col class="roboto" cols="3">Driver</v-col>
                    <v-col class="open-sans">
                      <v-btn
                        variant="tonal"
                        class="open-sans"
                        color="#274C5B"
                        prepend-icon="mdi-plus-circle"
                        @click="assignDriver()"
                        >Assign Driver</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
      <div>
        <h3 class="roboto title text-decoration-underline mt-12">
          #Customer Shipping Address
        </h3>
        <v-row>
          <v-col cols="12" lg="7">
            <div class="bg-white py- mt-4 rounded border overflow-hidden">
              <v-row class="parent row overflow-hidden pa-0 ma-0">
                <v-col cols="12" class="border-b pa-4">
                  <v-row>
                    <v-col class="roboto" cols="3">Phone Number</v-col>
                    <v-col cols="6" class="open-sans">
                      {{ order.shipping_address.phone_number }}
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="border-b pa-4">
                  <v-row>
                    <v-col class="roboto" cols="3">City</v-col>
                    <v-col class="open-sans">{{
                      order.shipping_address.city.name
                    }}</v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="pa-4">
                  <v-row>
                    <v-col class="roboto" cols="3">Street</v-col>
                    <v-col class="open-sans">{{
                      order.shipping_address.street
                    }}</v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  class="pa-4"
                  v-if="order.shipping_address.notes"
                >
                  <v-row>
                    <v-col class="roboto" cols="3">Note</v-col>
                    <v-col class="open-sans">{{
                      order.shipping_address.notes
                    }}</v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
      <div v-if="order.customer.billing_address">
        <h3 class="roboto title text-decoration-underline mt-12">
          #Customer Billing Address
        </h3>
        <v-row>
          <v-col cols="12" lg="7">
            <div class="bg-white py- mt-4 rounded border overflow-hidden">
              <v-row class="parent row overflow-hidden pa-0 ma-0">
                <v-col
                  cols="12"
                  class="border-b pa-4"
                  v-if="order.customer.billing_address?.phone_number"
                >
                  <v-row>
                    <v-col class="roboto" cols="3">Phone Number</v-col>
                    <v-col cols="6" class="open-sans">
                      {{ order.customer.billing_address.phone_number }}
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  class="border-b pa-4"
                  v-if="order.customer.billing_address?.city?.name"
                >
                  <v-row>
                    <v-col class="roboto" cols="3">City</v-col>
                    <v-col class="open-sans">{{
                      order.customer.billing_address?.city?.name
                    }}</v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  class="pa-4"
                  v-if="order.customer.billing_address?.street"
                >
                  <v-row>
                    <v-col class="roboto" cols="3">Street</v-col>
                    <v-col class="open-sans">{{
                      order.customer.billing_address?.street
                    }}</v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  class="pa-4"
                  v-if="order.customer.billing_address?.notes"
                >
                  <v-row>
                    <v-col class="roboto" cols="3">Note</v-col>
                    <v-col class="open-sans">{{
                      order.customer.billing_address.notes
                    }}</v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
      <div v-if="order.driver_id">
        <h3 class="roboto title text-decoration-underline mt-12">
          #Driver Information
        </h3>
        <v-row>
          <v-col cols="12" lg="7">
            <div class="bg-white py- mt-4 rounded border overflow-hidden">
              <v-row class="parent row overflow-hidden pa-0 ma-0">
                <v-col cols="12" class="border-b pa-4">
                  <v-row>
                    <v-col class="roboto" cols="3">Full Name</v-col>
                    <v-hover v-slot="{ isHovering, props }">
                      <v-col cols="6" class="open-sans">
                        <span
                          v-bind="props"
                          :class="[
                            isHovering
                              ? 'text-blue-darken-1 text-decoration-underline cursor-pointer'
                              : '',
                          ]"
                          @click="ShowUserInfo(order.driver)"
                        >
                          {{ order.driver.first_name }}
                          {{ order.driver.last_name }}
                        </span>
                      </v-col>
                    </v-hover>
                  </v-row>
                </v-col>
                <v-col cols="12" class="border-b pa-4">
                  <v-row>
                    <v-col class="roboto" cols="3">email</v-col>
                    <v-col class="open-sans">{{ order.driver.email }}</v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="pa-4" v-if="canChangeDriver">
                  <v-row>
                    <v-col class="roboto" cols="3">Action</v-col>
                    <v-col class="open-sans">
                      <v-btn
                        variant="tonal"
                        class="open-sans"
                        color="#274C5B"
                        prepend-icon="mdi-sync-circle"
                        text="Change"
                        @click="assignDriver()"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <!-- <v-col cols="12" class="pa-4" v-if="order.shipping_address.notes">
                  <v-row>
                    <v-col class="roboto" cols="3">Note</v-col>
                    <v-col class="open-sans">{{ order.shipping_address.notes }}</v-col>
                  </v-row>
                </v-col> -->
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
      <div>
        <h3 class="roboto title text-decoration-underline mt-12">
          #Order Items Information
        </h3>
        <div class="mt-4">
          <v-row
            class="row ma-0 pa-0 overflow-hidden row parent bg-white overflow-hidden rounded border"
          >
            <v-col cols="12">
              <v-row class="pa-4 bg-grey-lighten-2">
                <v-col class="roboto">Image</v-col>
                <v-col class="roboto"># ID</v-col>
                <v-col class="roboto">Name</v-col>
                <v-col class="roboto">Price</v-col>
                <v-col class="roboto">Qunatity</v-col>
                <v-col class="roboto">SubTotal</v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row class="row parent bg-white overflow-hidden rounded">
                <!-- <template v-for="n in 10" :key="n"> -->
                <v-col cols="12" v-for="(item, i) in order.items" :key="i">
                  <v-row class="align-center pa-0 ma-0">
                    <v-col
                      class="open-sans cursor-pointer"
                      @click="showImage(item.product.image)"
                    >
                      <img :src="item.product.image" :alt="item.product.name" />
                    </v-col>

                    <v-col class="open-sans"
                      ><span>#{{ item.product_id }}</span></v-col
                    >
                    <v-col class="open-sans">
                      <v-hover v-slot="{ isHovering, props }">
                        <span
                          :class="[
                            'cursor-pointer',
                            isHovering
                              ? 'text-decoration-underline text-blue-darken-1'
                              : '',
                          ]"
                          @click="showProduct(item.product.slug)"
                          v-bind="props"
                        >
                          {{ item.product_name }}
                        </span>
                      </v-hover>
                    </v-col>
                    <v-col class="open-sans">{{
                      currencyFormat(item.price, order.currency_cod)
                    }}</v-col>
                    <v-col class="open-sans">{{ item.quantity }}</v-col>
                    <v-col class="open-sans">{{
                      getSubTotal(item.quantity, item.price)
                    }}</v-col>
                  </v-row>
                </v-col>
                <!-- </template> -->
              </v-row>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
    <pre>
  {{ 'can change ' + canChangeDriver }}
</pre>
  </div>
  <ShowImage :image-src="imageSrc" v-model:model-value="dialog" />
  <AssignToDriver
    :driver-id="order.driver_id"
    v-model:dialog="order.dialog"
    :order-number="order.number"
    @fetchOrder="fetchOrder"
  />
  <DrawerAlert
    :title="alert.title"
    :text="alert.text"
    v-model:dialog="alert.dialog"
  >
    <template #action>
      <v-btn
        variant="outlined"
        color="green"
        prepend-icon="mdi-repeat"
        @click="changeOrderStatus"
        >Change Status</v-btn
      >
    </template>
  </DrawerAlert>
  <NoDataFound v-if="!order" />
  <pre>
  {{ order }}
</pre
  >
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { computed, inject, onMounted, reactive, watch } from "vue";
import { useOrderStore } from "@/stores/dashboard/order";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import formats from "@/mixins/formats";
import { toLower } from "lodash";
import ShowImage from "@/components/dashboard/global/ShowImage.vue";
import { ref } from "vue";
// import ConfirmationAlert from "@/components/dashboard/global/ConfirmationAlert.vue";
import axiosClient from "@/axiosClient";
import DrawerAlert from "../../../components/dashboard/global/DrawerAlert.vue";
import AssignToDriver from "../../../components/dashboard/order/AssignToDriver.vue";

const route = useRoute();
const emitter = inject("emitter");
const router = useRouter();
const orderStore = useOrderStore();
const { order } = storeToRefs(orderStore);
const dialog = ref(false);
const imageSrc = ref("");
const status = ref("");
const role = route.params.role;
// const confirmDialog = ref(false);
// const confirmDialogText = ref("");
const alert = reactive({
  title: "Confirm Status Change",
  confirmDialog: false,
});

const items = reactive([
  {
    title: "Dashboard",
    to: `/${role}/dashboard`,
  },
  {
    title: "Orders",
    to: `/${role}/dashboard/orders`,
  },
]);

const { dateFormat, currencyFormat } = formats();

const getSubTotal = (quantity, price) => {
  return currencyFormat(quantity * price, order.value.currency_cod);
};
const changeStatus = async () => {
  alert.text = `Are you sure you want to change the status from "${order.value.status}" to "${status.value}"?`;
  // status.value = order.value.status;
  alert.dialog = true;
  alert.confirmDialog = true;
};
const showImage = (url) => {
  console.log("clik");
  imageSrc.value = url;
  dialog.value = true;
};

const assignDriver = () => {
  order.value.dialog = true;
};

const changeOrderStatus = async () => {
  emitter.emit("showLoading", true);
  await axiosClient
    .put(`/dashboard/orders/${order.value.id}/${status.value}`)
    .then((response) => {
      console.log(response);
      emitter.emit("alert", ["success", response.data.message]);
      order.value.status = status.value;
    })
    .catch((e) => {
      emitter.emit("alert", ["error", "error try agian late"]);
      console.error(e);
      status.value = order.value.status;
    })
    .finally(() => {
      alert.dialog = false;
      alert.confirmDialog = false;
      emitter.emit("showLoading", false);
    });
};

const showProduct = (slug) => {
  emitter.emit("showLoading", true);
  router.push({ name: "dashboard-show-product", params: { product: slug } });
};

const fullName = computed(() => {
  return order.value.customer.first_name + " " + order.value.customer.last_name;
});

// const getStatusColor = (status) => {
//   status = toLower(status);
//   return {
//     "bg-orange": status == "pending",
//     "bg-blue": status == "processing",
//     "bg-green": status == "driving",
//     "bg-green-darken-2": status == "completed",
//     "bg-red": status == "canceled",
//     "bg-red-darken-3": status == "refunded",
//   };
// };

const ShowUserInfo = ({ email, first_name, last_name, type }) => {
  emitter.emit("showLoading", true);
  const name = `${first_name} ${last_name}`;
  router.push({
    name: `dashboard-show-${type}-information`,
    query: { name: name, email: email },
  });
};
const orderStatus = () => {
  return [
    {
      name: "pending",
      color: "orange",
    },
    {
      name: "processing",
      color: "blue",
    },
    {
      name: "shipped",
      color: "green",
    },
    {
      name: "out for delivery",
      color: "green",
    },
    {
      name: "delivered",
      color: "green-darken-1",
    },
    {
      name: "completed",
      color: "green-darken-3",
    },
    {
      name: "canceled",
      color: "red",
    },
    {
      name: "refunded",
      color: "red-darken-3",
    },
  ];
};
const canChangeDriver = ref(true);
watch(
  () => status.value,
  (newVal) => {
    if (["pending", "shipping", "processing"].includes(toLower(newVal))) {
      canChangeDriver.value = true;
    } else {
      canChangeDriver.value = false;
    }
  }
);
const fetchOrder = async () => {
  // console.log('fetching');
  emitter.emit("showLoading", true);
  const number = Number(route.params.order);
  await orderStore.getOrder(number);
  emitter.emit("showLoading", false);
};
// const number = ref(1);
watch(
  () => route.params.order,
  async (newVal, oldVal) => {
    emitter.emit("showLoading", true);
    console.log("newVal", newVal, oldVal);
    const number = Number(route.params.order);
    const notify = route.query.notify;
    if (number) {
      await orderStore.getOrder(number, notify);
      items[2] = { title: order.value.number };
      status.value = order.value.status;
      emitter.emit("showLoading", false);
    }
  },
  {
    immediate: true,
  }
);
// onMounted(async () => {});
</script>

<style lang="scss" scoped>
h3.title {
  color: $arapawa;
  font-size: 24px;
}

.row {
  .roboto {
    color: $arapawa;
    font-weight: bold;
  }

  .open-sans {
    color: $altamira;
  }

  &.parent {
    // border: 1px solid;
    // border-radius: 6px;
    > .v-col {
      &:nth-of-type(even) {
        background-color: $cultured;
      }

      &:nth-of-type(odd) {
        background-color: #fff;
      }
    }
  }

  img {
    // max-width: 80px;
    max-height: 50px;
  }
}
</style>
