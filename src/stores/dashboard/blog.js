import { defineStore } from "pinia";
import { inject, ref } from "vue";
import axiosClient from "../../axiosClient";
import { useRouter } from "vue-router";
import { toLower } from "lodash";

export const useBlogStore = defineStore("dashboard-bolg", () => {
  const data = ref([]);
  const loading = ref(false);
  const totalPage = ref(1);
  const errors = ref({});
  const blog = ref({
    status: "archived",
  });
  const router = useRouter();
  const emitter = inject("emitter");

  const getBlogs = async (page, filterdata) => {
    let filter = JSON.parse(JSON.stringify(filterdata));
    filter.status = filterdata.status[0];
    filter.sort_by =
      toLower(filterdata.sort_by[0]) == "last modified"
        ? "updated at"
        : filterdata.sort_by[0];
    await axiosClient
      .get(`/dashboard/blogs?page=${page}&filter=${JSON.stringify(filter)}`)
      .then((response) => {
        console.log(response);
        data.value = response.data.data;
      })
      .catch((error) => console.error("error", error));
  };

  const addBlog = async (blog) => {
    loading.value = true;
    await axiosClient
      .post("/dashboard/blogs", blog, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        // router.push({ name: "dashboard-blogs" });
        console.log(response);
      })
      .catch((error) => {
        errors.value = error.response.data.errors;
        console.error("error", error);
      })
      .finally(() => {
        loading.value = false;
      });
  };
  const show = async (blogId) => {
    loading.value = true;
    await axiosClient
      .get(`/dashboard/blogs/${blogId}`)
      .then((response) => {
        // router.push({ name: "dashboard-blogs" });
        blog.value = response.data;
        blog.value.text = JSON.parse(response.data.text);
      })
      .catch((error) => {
        errors.value = error.response.data.errors;
        console.error("error", error);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const destroy = async (id) => {
    loading.value = true;
    await axiosClient
      .delete(`/dashboard/blogs/${id}`)
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
    blog.value = {
      status: "archived",
    };
  };
  return {
    data,
    loading,
    totalPage,
    blog,
    errors,
    getBlogs,
    addBlog,
    show,
    destroy,
    $reset,
  };
});
