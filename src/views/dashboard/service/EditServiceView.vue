<template>
  <div class="add-member">
    <PageTitle title="Service Configration" :items />
    <v-row class="mt-4" v-if="data.length !== 0">
      <v-col cols="12" sm="10" md="7">
        <v-form @submit.prevent="submitData">
          <v-text-field
            variant="outlined"
            type="text"
            required
            label="Name"
            :error-messages="errors.name"
            v-model="data.name"
            color="#525C60"
          ></v-text-field>
          <v-textarea
            variant="outlined"
            type="text"
            required
            label="description"
            :error-messages="errors.description"
            v-model="data.description"
            no-resize
            color="#525C60"
          ></v-textarea>

          <v-radio-group
            label="Service Status"
            v-model="data.status"
            :error-messages="errors.status"
            inline
          >
            <v-radio
              label="Active"
              color="green"
              value="active"
              class="mr-12"
            ></v-radio>
            <v-radio
              label="Archived"
              color="orange-lighten-2"
              value="archived"
            ></v-radio>
          </v-radio-group>

          <ImageFiled
            id="serviceIcon"
            :error="errors.image"
            label="Upload Service Icon"
            v-model:image-src="imageSrc"
            v-model:model-value="data.image"
            v-model:is-checked="isChecked"
          />

          <v-btn
            type="submit"
            elevation="0"
            color="#7EB693"
            class="text-none w-100 open-sans text-capitalize"
            height="50px"
            >Save</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { inject, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosClient from "@/axiosClient";
import ImageFiled from "../../../components/dashboard/global/ImageFiled.vue";

const route = useRoute();
const router = useRouter();
const emitter = inject("emitter");
const data = ref([]);
const errors = ref([]);
const imageSrc = ref("");
const isChecked = ref(false);
const slug = route.params.service;
const items = ref([
  {
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    title: "Services",
    to: "/dashboard/services",
  },
  {
    title: "Edit Service Configration",
  },
]);

const submitData = async () => {
  emitter.emit("showLoading", true);
  const formData = new FormData();
  formData.append("_method", "PUT");
  Object.keys(data.value).forEach((key) => {
    formData.append(key, data.value[key]);
  });
  axiosClient
    .post(`/dashboard/services/${slug}`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((response) => {
      router.push({ name: "dashboard-services" });
      emitter.emit("alert", ["success", "Update Service Successflly!"]);
    });

  emitter.emit("showLoading", false);
};

onMounted(async () => {
  emitter.emit("showLoading", true);
  await axiosClient.get(`/dashboard/services/${slug}`).then((response) => {
    data.value = response.data;
    imageSrc.value = response.data.image;
  });
  for (let key in data.value) {
    if (data.value[key] === null) {
      data.value[key] = "";
    }
  }
  emitter.emit("showLoading", false);
});
</script>

<style lang="scss" scoped>
.add-member {
  form {
    button {
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
