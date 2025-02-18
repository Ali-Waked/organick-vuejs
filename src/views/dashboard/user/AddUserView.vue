<template>
  <div class="add-member">
    <PageTitle :title :items />
    <v-row class="mt-4">
      <v-col cols="12" sm="10" md="7">
        <v-form @submit.prevent="submitData">
          <v-text-field
            variant="outlined"
            type="text"
            required
            label="First Name"
            :error-messages="errors.first_name"
            v-model="data.first_name"
            color="#525C60"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            type="text"
            required
            label="Last Name"
            :error-messages="errors.last_name"
            v-model="data.last_name"
            color="#525C60"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            type="email"
            required
            label="Email"
            :error-messages="errors.email"
            v-model="data.email"
            color="#525C60"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            type="date"
            required
            label="Birthday"
            :error-messages="errors.birthday"
            v-model="data.birthday"
            color="#525C60"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            type="number"
            required
            label="Phone Number"
            :error-messages="errors.phone_number"
            v-model="data.phone_number"
            color="#525C60"
          ></v-text-field>
          <v-select
            variant="outlined"
            required
            label="Gender"
            :error-messages="errors.gender"
            color="#525C60"
            v-model="data.gender"
            :items="gender"
          ></v-select>
          <!-- <v-select
            variant="outlined"
            required
            label="Member Type"
            :error-messages="errors.type"
            color="#525C60"
            v-model="data.type"
            :items="userTypes"
          ></v-select>
          <div v-if="data.type == 'member'">
            <v-text-field
              variant="outlined"
              type="text"
              required
              label="Facebook Link"
              :error-messages="errors?.socials?.facebook ?? ''"
              v-model="data.socials.facebook"
              color="#525C60"
            ></v-text-field>
            <v-text-field
              variant="outlined"
              type="text"
              required
              label="X Link"
              :error-messages="errors.socials?.x"
              v-model="data.socials.x"
              color="#525C60"
            ></v-text-field>
            <v-text-field
              variant="outlined"
              type="text"
              required
              label="Instagram Link (optional)"
              :error-messages="errors.socials?.instagram"
              v-model="data.socials.instagram"
              color="#525C60"
            ></v-text-field>
            <v-text-field
              variant="outlined"
              type="text"
              required
              label="Job Title"
              :error-messages="errors.job_title"
              v-model="data.job_title"
              color="#525C60"
            ></v-text-field>
          </div> -->

          <ImageFiled
            id="MemberAvatar"
            :error="errors.image"
            :label="imageLable"
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
            >{{ buttonLabel }}</v-btn
          >
        </v-form>
        <pre>
          {{ data }}
        </pre>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import {
  computed,
  inject,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../../stores/dashboard/user";
import { storeToRefs } from "pinia";
import formats from "@/mixins/formats";
import ImageFiled from "../../../components/dashboard/global/ImageFiled.vue";
// const router = useRouter();
const route = useRoute();
const title = ref("Add Member");
const buttonLabel = ref("save");
const emitter = inject("emitter");
const userStore = useUserStore();
const { data, errors } = storeToRefs(userStore);
const imageSrc = ref("");
const isChecked = ref(false);
const url = ref("");
const role = route.params.role;
const imageLable = ref("");
const { getSingularName } = formats();
const gender = [
  {
    title: "Male",
    value: "male",
  },
  {
    title: "Female",
    value: "female",
  },
];
const items = reactive([
  {
    title: "Dashboard",
    to: "/dashboard",
  },
]);

const userTypes = [
  {
    title: "Team Member",
    value: "member",
  },
  {
    title: "Team Moderator",
    value: "moderator",
  },
];

const singularName = computed(() => {
  return getSingularName(url.value);
});

const submitData = async () => {
  emitter.emit("showLoading", true);
  const formData = new FormData();
  const length = Object.keys(data.value).length;
  for (let i = 0; i < length; i++) {
    const key = Object.keys(data.value)[i];
    if (key == "socials") {
      Object.keys(data.value[key]).forEach((e) => {
        formData.append(`socials[${e}]`, data.value.socials[e]);
      });
      continue;
    }
    formData.append(key, data.value[key]);
  }
  console.log(formData.get("socials"));
  if (route.name.includes("add")) {
    await userStore.addUser(singularName.value, formData);
  } else {
    formData.append("_method", "PUT");
    console.log("data", data.value.image);
    await userStore.updateUserInfo(
      singularName.value,
      formData,
      data.value.email
    );
  }
  emitter.emit("showLoading", false);
};
onBeforeMount(() => {
  userStore.$reset();
});
const fullName = computed(() => {
  return `${data.value.first_name} ${data.value.last_name}`;
});

const getUserData = async () => {
  if (route.name.includes("add")) {
    return;
  }
  // items.push({
  //   title: "Edit Info",
  // });
  emitter.emit("showLoading", true);
  await userStore.getUser(singularName.value, route.query.email);
  items.push({ title: data.value.name });
  delete items[2];
  items[2] = {
    title: `Edit ${fullName.value} Info`,
    // to: `team-members/show-member-info/?name=${fullName.value}&email=${data.value.email}`,
  };

  if (route.name.includes("driver")) {
    title.value = "Edit Driver Information";
    // items[2] = {
    //   title: `Edit ${fullName.value} Info`,
    // };
  } else if (route.name.includes("moderator")) {
    title.value = "Edit Moderator Information";
    // items[3] = {
    //   title: "Edit Moderator Info",
    // };
  }

  buttonLabel.value = "update";
  imageSrc.value = data.value.avatar;
  data.value.phone_number = data.value.billing_address?.phone_number;
  delete data.value.billing_address;
  delete data.value.image;
  for (let key in data.value) {
    if (data.value[key] === null) {
      data.value[key] = "";
    }
  }
  emitter.emit("showLoading", false);
};

watch(
  () => route.name,
  async (newName) => {
    switch (newName) {
      case "dashboard-add-moderator":
      case "dashboard-edit-moderator-information":
        title.value = "Add Moderator";
        url.value = "moderators";
        imageLable.value = "Upload Moderator Photo";
        items[1] = {
          title: "Moderators",
          to: `/${role}/dashboard/moderators`,
        };
        if (route.name.includes("add"))
          items[2] = {
            title: "Add New Moderator",
          };
        break;
      case "dashboard-add-driver":
      case "dashboard-edit-driver-information":
        title.value = "Add Driver";
        url.value = "drivers";
        imageLable.value = "Upload Driver Photo";
        items[1] = {
          title: "Drivers",
          to: `/${role}/dashboard/drivers`,
        };
        if (route.name.includes("add"))
          items[2] = {
            title: "Add New Driver",
          };
        break;
    }
    await getUserData();
  },
  { immediate: true }
);
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
