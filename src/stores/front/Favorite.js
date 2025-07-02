import { defineStore } from "pinia";
import { ref, inject } from "vue";
import axiosClient from "../../axiosClient";

export const useFavoriteStore = defineStore("favorite-front", () => {
  const products = ref({});
  const last_page = ref(0);
  const page = ref(1);
  const emitter = inject('emitter');

  const getFavoriteProducts = async () => {
    await axiosClient.get('/my-favorite')
      .then((response) => {
        products.value = response.data.data;
        last_page.value = response.data.last_page;
        page.value = response.data.current_page;
      });
  }

  const addToFavorite = async (productId) => {
    await axiosClient.post(`/my-favorite/`, { product_id: productId });
  }

  const removeFromFavorite = async (productId) => {
    await axiosClient.delete(`/my-favorite/${productId}`)
      .then(response => {
        console.log(response);
        products.value = products.value.filter(data => data.product.id !== productId);
        emitter.emit('showAlert', 'Remove Product From Favorite Successfully');
      })
      .catch(e => console.error(e));
  }
  return {
    products,
    last_page,
    page,
    getFavoriteProducts,
    addToFavorite,
    removeFromFavorite,
  }
});