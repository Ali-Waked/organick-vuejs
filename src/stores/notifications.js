import { defineStore } from "pinia";
import { inject, ref } from "vue";
import axiosClient from "../axiosClient";
import { useRouter } from "vue-router";
import { toLower } from "lodash";
import { id } from "vuetify/locale";

export const useNotificationStore = defineStore("notifications", () => {
  const notifications = ref([]);
  const allNotifications = ref([]);
  const total_count = 0;
  const loading = ref(true);
  const totalPages = ref(1);
  const errors = ref({});

  const router = useRouter();
  const emitter = inject("emitter");

  const getAllNotifications = async (paginate = 5, filter = {}, page = 1) => {
    try {
      const response = await axiosClient.get(`/notifications?paginate=${paginate}&page=${page}&filter=${JSON.stringify(filter)}`);
      // allNotifications.value = response.data;
      totalPages.value = response.data.notifications.last_page;
      console.log('page', page);
      if (page === 1) {
        allNotifications.value = response.data;
      } else {
        console.log('before', allNotifications.value.notifications.data[0]);
        allNotifications.value.notifications.data = [...allNotifications.value.notifications.data, ...response.data.notifications.data];
        console.log('after', allNotifications.value.notifications.data);
        // page++;
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  const getNotifications = async (paginate = 5) => {
    try {
      const response = await axiosClient.get(`/notifications?paginate=${paginate}`);
      notifications.value = response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // const showNotifyDetails = (notify) => {
  //   const { id, data } = notify;
  //   emitter.emit("showLoading", true);
  //   const link = getLink(data);
  //   if (!notify.read_at) {
  //     notify.read_at = new Date();
  //     notifications.value.total_unread_count--;
  //     const notifySelect = notifications.value.notifications.data.find(
  //       (nf) => nf.id == id && !nf.read_at
  //     )
  //     if (notifySelect) {
  //       notifySelect.read_at = new Date();
  //     }
  //   }
  //   router.push({ name: link.name, params: link.params, query: { notify: id, ...link.query } });
  // };

  const showNotifyDetails = (notify) => {
    const { id, data } = notify;
    emitter.emit("showLoading", true);

    const link = getLink(data);

    if (!notify.read_at) {
      notify.read_at = new Date();
      notifications.value.total_unread_count--;

      const notifySelect = notifications.value.notifications.data.find(
        (nf) => nf.id == id && !nf.read_at
      );
      if (notifySelect) {
        notifySelect.read_at = new Date();
      }
    }

    const current = router.currentRoute.value;
    const target = {
      name: link.name,
      params: link.params ?? {},
      query: { ...current.query, notify: id, ...(link.query ?? {}) },
    };
    if (isSameRoute(current, link)) {
      router.replace({ name: target.name, params: target.params, query: target.query });
      emitter.emit("showLoading", false);
      return;
    }

    router.push({ name: target.name, params: target.params, query: target.query })
      .finally(() => emitter.emit("showLoading", false));
  };


  const isEqualObjects = (a, b) => {
    return JSON.stringify(a ?? {}) === JSON.stringify(b ?? {});
  };
  const normalizeQueryForCompare = (query) => {
    if (!query) return {};
    // clone and remove notify for comparison
    const q = { ...query };
    delete q.notify;
    return q;
  };

  const isSameRoute = (current, link) => {
    if (current.name !== link.name) return false;

    if (!isEqualObjects(current.params, link.params)) return false;

    const currentQuery = normalizeQueryForCompare(current.query);
    const linkQuery = normalizeQueryForCompare(link.query);
    return isEqualObjects(currentQuery, linkQuery);
  };

  const getLink = (data) => {
    const type = data.type_notify;
    if (type.startsWith("order") || type.startsWith('payment')) {
      return {
        name: "dashboard-show-order",
        params: { order: data.order.number },
      };
    }
    if (type.startsWith("customer")) {
      console.log({ email: data.customer.email, name: `${data.customer.first_name} ${data.customer.last_name}` });
      return {
        name: "dashboard-show-customer-information",
        query: { email: data.customer.email, name: data.customer.name },
      };
    }
    if (type.startsWith("product")) {
      return {
        name: "dashboard-edit-product",
        params: { product: data.product.slug },
      };
    };
    if (type.startsWith("site_rated")) {
      return {
        name: "dashboard-show-product",
        params: { product: data.product.slug },
        query: { email: data.customer.email, id: data.feedback.id },
      };
    }
    if (type.startsWith("site_rated")) {
      return {
        name: "dashboard-customer-feedbacks",
        query: { email: data.customer.email, id: data.feedback.id },
      };
    }
    if (type.startsWith("customer_registered")) {
      return {
        name: "dashboard-show-customer-information",
        query: { email: data.customer.email, name: data.customer.name },
      };
    }
    if (type.startsWith("contact_message")) {
      return {
        name: "dashboard-contact-us",
        query: { email: data.data.email, name: data.data.name, subject: data.data.subject, id: data.data.id },
      };
    }
    if (type.startsWith("newsletter_subscribed")) {
      console.log('data', data);
      return {
        name: "dashboard-subscribers",
        query: { email: data.subscriber.email, id: data.subscriber.id },
      };
    }
  }
  return {
    notifications,
    allNotifications,
    loading,
    totalPages,
    errors,
    showNotifyDetails,
    getNotifications,
    getAllNotifications,
  };
}
);
