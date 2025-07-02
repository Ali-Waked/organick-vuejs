import { defineStore } from "pinia";
import { inject, ref } from "vue";
import axiosClient from "../../axiosClient";
import { useRouter } from "vue-router";
import { toLower } from "lodash";

export const useNewsStore = defineStore("dashboard-bolg", () => {
  const data = ref([]);
  const loading = ref(true);
  const totalPage = ref(1);
  const errors = ref({});
  const news = ref({
    'is_published': 0,
  });
  const router = useRouter();
  const emitter = inject("emitter");

  const getNews = async (page, filterdata) => {
    loading.value = true;
    let filter = JSON.parse(JSON.stringify(filterdata));
    filter.status = filterdata.status[0];
    filter.sort_by =
      toLower(filterdata.sort_by[0]) == "last modified"
        ? "updated at"
        : filterdata.sort_by[0];
    await axiosClient
      .get(`/dashboard/news?page=${page}&filter=${JSON.stringify(filter)}`)
      .then((response) => {
        console.log(response);
        data.value = response.data.data;
      })
      .catch((error) => console.error("error", error)).finally(() => { loading.value = false; });
  };

  const addNews = async (news) => {
    loading.value = true;
    await axiosClient
      .post("/dashboard/news", news, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        // router.push({ name: "dashboard-news" });
        console.log(response);
        emitter.emit("alert", [
          "success",
          "Add New News Successflly",
        ]);
        router.push({ name: "dashboard-news" });
      })
      .catch((error) => {
        console.error("error", error);
        errors.value = error.response.data.errors;
      })
      .finally(() => {
        loading.value = false;
      });
  };
  const show = async (slug) => {
    loading.value = true;
    await axiosClient
      .get(`/dashboard/news/${slug}`)
      .then((response) => {
        // router.push({ name: "dashboard-news" });
        news.value = response.data;
        // console.log(response);
        news.value.content = JSON.parse(response.data.content);
      })
      .catch((error) => {
        console.error("error", error);
        errors.value = error.response.data.errors;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const updateNews = async (data, slug) => {
    loading.value = true;
    await axiosClient
      .put(`/dashboard/news/${slug}`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        // router.push({ name: "dashboard-news" });
        console.log(response);
        emitter.emit("alert", [
          "success",
          "Update News Successflly",
        ]);
        router.push({ name: "dashboard-news" });
      })
      .catch((error) => {
        console.error("error", error);
        errors.value = error.response.data.errors;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  const destroy = async (id) => {
    loading.value = true;
    await axiosClient
      .delete(`/dashboard/news/${id}`)
      .then((response) => {
        data.value = data.value.filter((ele) => ele.id !== id);
        emitter.emit("alert", ["error", response.data.message]);
      })
      .catch((e) => console.error(e))
      .finally(() => (loading.value = false));
  };

  const $reset = () => {
    data.value = [];
    loading.value = false;
    totalPage.value = 1;
    errors.value = {};
    news.value = {
      'is_published': 0,
    };
  };
  return {
    data,
    loading,
    totalPage,
    news,
    errors,
    getNews,
    addNews,
    show,
    updateNews,
    destroy,
    $reset,
  };
});
