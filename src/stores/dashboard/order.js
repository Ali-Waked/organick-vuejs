import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import axiosClient from "../../axiosClient";
export const useOrderStore = defineStore("order-dashboard", () => {
  const orders = ref([]);
  const loading = ref(false);
  const order = ref({});
  const totalPage = ref(1);
  const fetchOrders = async (page, filter = {}) => {
    loading.value = true;
    await axiosClient
      .get(`/dashboard/orders?page=${page}&filter=${JSON.stringify(filter)}`)
      .then((response) => {
        console.log(response);
        orders.value = response.data.data;
        totalPage.value = response.data.last_page;
      }).catch(e => console.error(e)).finally(() => { loading.value = false });
  };
  const getOrder = async (number) => {
    await axiosClient
      .get(`/dashboard/orders/${number}`)
      .then((response) => {
        order.value = response.data;
        console.log(response);
      })
      .catch((e) => {
        console.error("error", e);
      });
  };
  return {
    orders,
    order,
    loading,
    totalPage,
    fetchOrders,
    getOrder,
  };
});
