<template>
  <div class="payment-method">
    <PageTitle title="Payment Methods" :items="breadcrumbItems" />
    <div v-if="data.length">
      <TableData :data>
        <template #actions="{ item }">
          <ActionButton
            icon="mdi-wrench"
            color="#274C5B"
            background-color="#274c5b17"
            @click="editPaymentMethod(item)"
            tooltip="Edit Configration"
          />
        </template>
      </TableData>
    </div>

    <NoDataFound v-if="data.length == 0" />
  </div>
</template>

<script setup>
import { inject, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import ActionButton from "@/components/dashboard/global/ActionButton.vue";
import TableData from "@/components/dashboard/paymentMethod/TableData.vue";
import axiosClient from "@/axiosClient";
const router = useRouter();
const loading = ref(true);
const data = ref([]);
const emitter = inject("emitter");
const breadcrumbItems = [
  {
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    title: "Payment Methods",
  },
];

const fetchPaymentMethods = async () => {
  try {
    await axiosClient.get("/dashboard/payment-methods").then((response) => {
      // console.log(response);
      data.value = response.data;
    });
  } catch (e) {
    console.log("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const editPaymentMethod = ({ slug, name }) => {
  emitter.emit("showLoading", true);

  router.push({
    name: "dashboard-eidt-payment-method",
    query: { payment_method_name: name, payment_method: slug },
  });
};

onMounted(async () => {
  emitter.emit("showLoading", true);
  await fetchPaymentMethods();
});
</script>
