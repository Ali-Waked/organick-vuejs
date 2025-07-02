import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import formats from "@/mixins/formats";
import axiosClient from '../../axiosClient';

export const useCityStore = defineStore('city', () => {
  const cities = ref([]);
  const loading = ref(false);
  // const cityId = ref(null);
  const { currencyFormat } = formats();
  const getCities = async () => {
    loading.value = true;
    await axiosClient.get('/cities')
      .then(response => {
        cities.value = [];
        response.data.forEach(city => {
          cities.value.push({
            title: city.name + ' - ' + currencyFormat(city.driver_price),
            value: city.id,
          });

        });
        console.log(cities, response.data);
      })
      .catch(error => {
        console.error(error);
      }).finally(() => {
        loading.value = false;
      });
  }
  return {
    cities,
    loading,
    // cityId,
    getCities,
  }
});