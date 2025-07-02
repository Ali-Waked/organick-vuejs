<template>
  <div class="add-member">
    <PageTitle title="Settings Payment Method" :items />
    <v-row class="mt-4" v-if="data.length !== 0">
      <v-col cols="12" sm="10" md="7">
        <v-form @submit.prevent="submitData">
          <v-text-field variant="outlined" type="text" required label="Name" :error-messages="errors.name"
            v-model="data.name" color="#525C60"></v-text-field>
          <v-textarea variant="outlined" type="text" required label="description" :error-messages="errors.description"
            v-model="data.description" no-resize color="#525C60"></v-textarea>
          <fieldset class="rounded px-5 pt-5 mb-4" v-if="data.options">
            <legend class="legend">Options:</legend>
            <template v-for="(value, key) in data.options" :key="key">
              <v-text-field variant="outlined" type="text" :label="key" :error-messages="errors[key]"
                v-model="data.options[key]" color="#525C60" required></v-text-field>
            </template>
          </fieldset>
          <v-radio-group label="Payment Method Status" v-model="data.is_active" :error-messages="errors.is_active"
            inline>
            <v-radio label="Active" color="green" :value="true" class="mr-12"></v-radio>
            <v-radio label="In Active" color="orange-lighten-2" :value="false"></v-radio>
          </v-radio-group>

          <ImageFiled id="icon" :error="errors.icon" label="Upload Icon For Payment Method" v-model:image-src="imageSrc"
            v-model:model-value="data.icon" />
          <v-btn type="submit" elevation="0" color="#7EB693" class="text-none w-100 open-sans text-capitalize"
            height="50px" :loading>{{
              buttonLabel }}</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { computed, inject, onBeforeMount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ImageFiled from "@/components/dashboard/global/ImageFiled.vue";
import axiosClient from "@/axiosClient";
// const router = useRouter();
const route = useRoute();
const router = useRouter();
const title = ref("Add Member For Team");
const buttonLabel = ref("save");
const emitter = inject("emitter");
const data = ref([]);
const errors = ref([]);
const imageSrc = ref("");
const role = route.params.role;
const slug = route.query.payment_method;
const loading = ref(false);
const items = ref([
  {
    title: "Dashboard",
    to: `/${role}/dashboard`,
  },
  {
    title: "Payment Methods",
    to: `/${role}/dashboard/payment-methods`,
  },
  {
    title: "Settings Payment Method",
  },
]);

const submitData = async () => {
  emitter.emit("showLoading", true);
  try {
    loading.value = true;
    const formData = new FormData();
    Object.keys(data.value).forEach((key) => {
      if (data.value[key] != '') {
        formData.append(key, data.value[key]);
      }
      if (key == 'is_active') {
        console.log(key, data.value[key]);
        // data.value[key] = data.value[key];
        formData.append(key, +data.value[key]);
      }
      console.log(key, data.value[key]);
    });
    formData.append("_method", "PUT");
    axiosClient
      .post(`/dashboard/payment-methods/${slug}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        emitter.emit("alert", ["success", 'Update Information For Payment Method Successflly!!']);
        router.push({ name: 'dashboard-payment-methods' })
      });
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
    emitter.emit("showLoading", false);
  }
};

onMounted(async () => {
  emitter.emit("showLoading", true);
  title.value = "Edit Member Information";
  // await teamMemberStore.getMember(route.query.email);
  console.log(slug);
  await axiosClient
    .get(`/dashboard/payment-methods/${slug}`)
    .then((response) => {
      data.value = response.data;
    });
  imageSrc.value = data.value.icon;
  data.value.icon = "";
  for (let key in data.value) {
    if (data.value[key] === null) {
      data.value[key] = ""; // Replace null with an empty string
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

.legend {
  color: #646464;
}
</style>
