<template>
  <PageTitle :title :items />
  <v-row class="mt-4" v-if="data.abilities">
    <v-col cols="12" sm="10" md="7">
      <v-form @submit.prevent="submitData">
        <v-text-field
          variant="outlined"
          type="text"
          required
          label="Role Name"
          :error-messages="errors.name"
          v-model="data.name"
          v-model:model-value="data.name"
          color="#525C60"
        ></v-text-field>
        <fieldset
          class="rounded px-5 pt-5 mb-6"
          v-for="(items, groupName) in data.abilities"
          :key="groupName"
        >
          <legend class="legend text-capitalize">{{ groupName }}</legend>
          <template v-for="(item, i) in items" :key="item.ability">
            <v-radio-group
              :label="item.name"
              :error-messages="errors.status"
              class="text-capitalize"
              v-model="data.abilities[groupName][i].status"
              inline
            >
              <template v-for="stat in status" :key="stat">
                <v-radio
                  :label="stat"
                  :color="getRadioColor(stat)"
                  :value="stat"
                  class="mr-12 text-capitalize"
                ></v-radio>
              </template>
            </v-radio-group>
          </template>
        </fieldset>
        <v-btn
          type="submit"
          elevation="0"
          color="#7EB693"
          class="text-none w-100 open-sans text-capitalize"
          height="50px"
          :loading
          >{{ buttonLabel }}</v-btn
        >
      </v-form>
      <pre>
        <!-- {{ oldRole }} -->
      </pre>
    </v-col>
  </v-row>
</template>
<script setup>
import { computed, inject, onMounted, reactive, ref } from "vue";
import axiosClient from "@/axiosClient";
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { toLower } from "lodash";
import { useRoute, useRouter } from "vue-router";
// import jsonData from "../../../data/data.json";
const errors = ref([]);
const status = ref([]);
const buttonLabel = ref("Add Role");
const abilities = ref([]);
const route = useRoute();
const param = route.params.role;
const title = ref("Add Role");
const oldRole = ref({});
const router = useRouter();
const emitter = inject("emitter");
const loading = ref(false);
const data = ref({
  name: "",
  abilities: {},
});
const items = [
  {
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    title: "Roles",
    to: "/dashboard/roles",
  },
  {
    title: "Add Role",
  },
];

const getRadioColor = (stat) => {
  stat = toLower(stat);
  return stat == "allow" ? "green" : stat == "deny" ? "red" : "orange";
};

const submitData = async () => {
  loading.value = true;
  Object.values(data.value.abilities).forEach((element, index) => {
    element.forEach((ele) => {
      abilities.value.push({ ability: ele.ability, status: ele.status });
    });
  });
  try {
    let response = {};
    if (param) {
      response = await axiosClient.put(`/dashboard/roles/${param}`, {
        name: data.value.name,
        abilities: abilities.value,
      });
    } else {
      response = await axiosClient.post(
        "/dashboard/roles",
        JSON.stringify({
          name: data.value.name,
          abilities: abilities.value,
        })
      );
    }
    if (response.status == 201) {
      emitter.emit("alert", ["success", "Add New Role Successflly"]);
    }
    if (response.status == 200) {
      emitter.emit("alert", ["success", "Update Role Successflly"]);
    }
    router.push({ name: "dashboard-roles" });
  } catch (e) {
    console.error(e);
    errors.value = e.response.data.errors;
  } finally {
    loading.value = false;
  }
};
onMounted(async () => {
  emitter.emit("showLoading", true);
  // const groupsName = Object.keys(jsonData.abilities);
  // Object.values(jsonData.abilities).forEach((element, index) => {
  //   const abilitiesValues = Object.values(element);
  //   const abilitiesTitles = Object.keys(element);
  //   data.value.abilities[groupsName[index]] = [];
  //   abilitiesValues.forEach((ele, i) => {
  //     console.log(groupsName[index]);
  //     console.log("data" + ele);
  //     data.value.abilities[groupsName[index]].push({
  //       name: abilitiesTitles[i],
  //       ability: ele,
  //       status: "inherit",
  //     });
  //   });
  // });
  // console.log(route.query);
  if (param) {
    await axiosClient
      .get(`/dashboard/roles/${param}`)
      .then((response) => {
        data.value.name = response.data.name;
        oldRole.value = response.data;
        buttonLabel.value = "Update Role";
        title.value = "Update Role";
        console.log("response", response.data);
      })
      .catch((e) => console.error(e));
  }
  await axiosClient
    .get("/dashboard/abilities")
    .then((response) => {
      const abilities = response.data.abilities;
      status.value = response.data.status;
      const groupsName = Object.keys(abilities);
      Object.values(abilities).forEach((element, index) => {
        const keys = Object.keys(element);

        data.value.abilities[groupsName[index]] = [];
        Object.values(element).forEach((el, i) => {
          let status = "inherit";
          if (Object.keys(oldRole.value).length) {
            for (let i = 0; i < oldRole.value.abilities.length; i++) {
              if (oldRole.value.abilities[i].ability == el) {
                status = oldRole.value.abilities[i].status;
                break;
              }
            }
          }
          data.value.abilities[groupsName[index]].push({
            name: keys[i],
            ability: el,
            status: status,
          });
        });
      });
    })
    .catch((e) => console.error(e));
  emitter.emit("showLoading", false);
});
</script>

<style lang="scss" scoped>
form {
  button {
    font-size: 18px;
    font-weight: bold;
  }
}
.legend {
  color: #646464;
}
</style>
