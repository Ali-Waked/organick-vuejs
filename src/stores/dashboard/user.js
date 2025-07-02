import { defineStore } from "pinia";
import { inject, ref } from "vue";
import axiosClient from "../../axiosClient";
import { useRouter } from "vue-router";
import { toLower } from "lodash";

export const useUserStore = defineStore("dashboard-user", () => {
  const data = ref([]);
  const loading = ref(true);
  const totalPage = ref(1);
  const errors = ref({});
  const router = useRouter();
  const emitter = inject("emitter");
  // const userInfo = ref({
  //   socials
  // });

  const fetchUsers = async (page, userType, filter) => {
    let filter_data = { ...filter };
    let sort_by = filter.sort_by[0].replaceAll(" ", "_");
    if (toLower(sort_by) == "join_time") {
      sort_by = "created_at";
    }
    if (toLower(sort_by) == "last_active_date") {
      sort_by = "last_active_at";
    }
    filter_data.sort_by = sort_by;
    await axiosClient
      .get(
        `/dashboard/users/${userType}?page=${page}&filter=${JSON.stringify(
          filter_data
        )}`
      )
      .then((response) => {
        console.log(response);
        data.value = response.data.data;
        totalPage.value = response.data.last_page;
        loading.value = false;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addUser = async (userType, data) => {
    await axiosClient
      .post(`/dashboard/users/${userType}`, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 201) {
          emitter.emit("alert", ["success", "Add New Member Successflly"]);
          router.push({ name: `dashboard-${userType}s` });
        }
      })
      .catch((error) => {
        console.error("error", error);
        errors.value = error.response.data.errors;
      });
  };

  const getUser = async (userType, email) => {
    await axiosClient
      .get(`/dashboard/users/${userType}/${email}`)
      .then((response) => {
        data.value = response.data;
        // const socials = {};
        // data.value.socials.forEach((social) => {
        //   socials[social.name] = social.link;
        // });
        // data.value.socials = socials;
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const updateUserInfo = async (userType, updatedData, email) => {
    await axiosClient
      .post(`/dashboard/users/${userType}/${email}`, updatedData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          emitter.emit("alert", ["success", `Update ${userType} successflly`]);
          router.push({ name: `dashboard-${userType}s` });
        }
      })
      .catch((error) => {
        console.error("error", error);
        // errors.value = error.response.data.errors ?? {};
      });
  };

  const deleteUser = async (userType, email) => {
    await axiosClient
      .delete(`/dashboard/users/${userType}/${email}`)
      .then((response) => {
        emitter.emit("alert", ["success", `Update ${userType} successflly`]);
        router.push({ name: `dashboard-${userType}s` });
      })
      .catch((error) => { });
  };

  const $reset = () => {
    data.value = {
      socials: {},
    };
    errors.value = {};
  };

  return {
    data,
    loading,
    errors,
    totalPage,
    // userInfo,
    fetchUsers,
    addUser,
    getUser,
    updateUserInfo,
    $reset,
  };
});
