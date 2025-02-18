import { defineStore } from "pinia";
import { inject, ref } from "vue";
import axiosClient from "../../axiosClient";
import { useRouter } from "vue-router";
import { toLower } from "lodash";

export const useTeamStore = defineStore("dashboard-team", () => {
  const data = ref({
    social: {},
  });
  const loading = ref(true);
  const totalPage = ref(1);
  const errors = ref({});
  const router = useRouter();
  const emitter = inject("emitter");
  const memberInfo = ref({});

  const fetchTeamMembers = async (page, filter) => {
    let filter_data = { ...filter };
    let sort_by = filter.sort_by[0].replaceAll(" ", "_");
    if (toLower(sort_by) == "joined_time") {
      sort_by = "created_at";
    }
    filter_data.sort_by = sort_by;
    await axiosClient
      .get(
        `/dashboard/members?page=${page}&filter=${JSON.stringify(filter_data)}`
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

  const addMember = async (data) => {
    await axiosClient
      .post("/dashboard/members", data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 201) {
          emitter.emit("alert", [
            "success",
            "Add New Member For Team Successflly",
          ]);
          router.push({ name: "dashboard-team" });
        }
      })
      .catch((error) => {
        console.error("error", error);
        errors.value = error.response.data.errors;
      });
  };

  const getMember = async (email) => {
    await axiosClient
      .get(`/dashboard/members/${email}`)
      .then((response) => {
        data.value = response.data;
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const updateMemberInfo = async (updatedData, email) => {
    await axiosClient
      .post(`/dashboard/members/${email}`, updatedData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          emitter.emit("alert", [
            "success",
            "Update New Member For Team Successflly",
          ]);
          router.push({ name: "dashboard-team" });
        }
      })
      .catch((error) => {
        console.error("error", error);
        // errors.value = error.response.data.errors ?? {};
      });
  };

  return {
    data,
    loading,
    errors,
    totalPage,
    memberInfo,
    fetchTeamMembers,
    addMember,
    getMember,
    updateMemberInfo,
  };
});
