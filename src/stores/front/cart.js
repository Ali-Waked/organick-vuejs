import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import axiosClient from "../../axiosClient";

export const useCartStore = defineStore("cart", () => {
  const localStorageName = "cart-products";
  const loading = ref(true);
  const item = ref({
    quantity: 1,
  });
  const items = ref([]);
  const exists = ref(false);

  /**
   * get all items
   */
  const getItems = async () => {
    await getData();
    console.log("items", items.value);
    loading.value = false;
  };

  /**
   * add item to cart
   */
  const addItem = async () => {
    await axiosClient
      .post("/cart", JSON.stringify(item.value))
      .then((response) => {
        checkItemIsExists();
        // console.log("not exists", notExists);
        // console.log(response);
        if (!exists.value) {
          console.log("not found in cart");
          item.value.id = response.data.id;
          items.value.push(JSON.parse(JSON.stringify(item.value)));
        } else {
          console.log("found in items");
          exists.value = false;
        }
        setItemsToLocalStorage(items.value);
        // item.value.quantity = 1;
        // localStorage.setItem(localStorageName, JSON.stringify(items.value));
      })
      .catch((error) => {
        console.error("error", error);
      });
    loading.value = false;
  };

  /**
   * remove item from cart
   * @param {string} id
   */
  const removeItem = async (id) => {
    await axiosClient
      .delete(`/cart/${id}`)
      .then((resposne) => {
        items.value = items.value.filter((ele) => ele.id != id);
        setItemsToLocalStorage(items.value);
        // setItemsToLocalStorage
      })
      .catch((error) => console.error("error", error));
  };

  const empty = async () => {
    await axiosClient
      .delete("/cart")
      .then((response) => {
        items.value = [];
        localStorage.removeItem(localStorageName);
      })
      .catch((error) => console.error("error", error));
  };
  const getData = async () => {
    const data = localStorage.getItem(localStorageName);
    if (data) {
      items.value = JSON.parse(data);
    }
    await axiosClient
      .get("/cart")
      .then((response) => {
        if (response.data.length) {
          localStorage.setItem(localStorageName, JSON.stringify(response.data));
          items.value = response.data;
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const checkItemIsExists = () => {
    // items.value.every((ele) => {
    //   console.log("in ever", ele.product_id, item.value.product_id);
    //   if (ele.product_id == item.value.product_id) {
    //     console.log(ele.quantity, item.value.quantity);
    //     ele.quantity += item.value.quantity;
    //     exists.value = true;
    //   }
    // });
    for (let i = 0; i < items.value.length; i++) {
      const ele = items.value[i];
      if (ele.product_id == item.value.product_id) {
        console.log(ele.quantity, item.value.quantity);
        ele.quantity += item.value.quantity;
        exists.value = true;
        break;
      }
    }
  };
  const total = computed(() => {
    console.log(items.value);
    return items.value.reduce((prev, current) => {
      return (prev += current.quantity * current.product.price);
    }, 0);
  });
  const setItemsToLocalStorage = (data) => {
    if (data) {
      localStorage.setItem(localStorageName, JSON.stringify(data));
    }
  };
  const getItemsInLocalStorage = (data) => {
    if (data) {
      localStorage.setItem(localStorageName, JSON.stringify(data));
    }
  };
  const updateQuantity = async (id, product) => {
    await axiosClient
      .put(`/cart/${id}`, JSON.stringify(product))
      .then((response) => {
        // console.log(response);
        console.log("updated");
        localStorage.setItem(localStorageName, JSON.stringify(items.value));
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  return {
    loading,
    item,
    items,
    getItems,
    addItem,
    empty,
    total,
    removeItem,
    updateQuantity,
  };
});
