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
            type="text"
            required
            label="Facebook Link"
            :error-messages="errors?.social?.facebook ?? ''"
            v-model="data.social.facebook"
            color="#525C60"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            type="text"
            required
            label="X Link"
            :error-messages="errors.social?.x"
            v-model="data.social.x"
            color="#525C60"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            type="text"
            required
            label="Instagram Link (optional)"
            :error-messages="errors.social?.instagram"
            v-model="data.social.instagram"
            color="#525C60"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            type="text"
            required
            label="Job Title (optional)"
            :error-messages="errors.job_title"
            v-model="data.job_title"
            color="#525C60"
          ></v-text-field>

          <ImageFiled
            id="MemberAvatar"
            :error="errors.image"
            label="Upload Member Photo"
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
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { computed, inject, onBeforeMount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTeamStore } from "../../../stores/dashboard/team";
import { storeToRefs } from "pinia";
import ImageFiled from "../../../components/dashboard/global/ImageFiled.vue";
// const router = useRouter();
const route = useRoute();
const title = ref("Add Member For Team");
const buttonLabel = ref("save");
const emitter = inject("emitter");
const teamMemberStore = useTeamStore();
const { data, errors } = storeToRefs(teamMemberStore);
const imageSrc = ref("");
const isChecked = ref(false);
const items = ref([
  {
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    title: "Team",
    to: "/dashboard/team-members",
  },
  {
    title: "Add Member",
  },
]);

const submitData = async () => {
  emitter.emit("showLoading", true);
  const formData = new FormData();
  Object.keys(data.value).forEach((key) => {
    formData.append(key, data.value[key]);
  });
  if (route.name == "dashboard-add-member") {
    await teamMemberStore.addMember(formData);
  } else {
    formData.append("_method", "PUT");
    console.log("data", data.value.image);
    await teamMemberStore.updateMemberInfo(formData, data.value.email);
  }
  emitter.emit("showLoading", false);
};
onBeforeMount(() => {
  // teamMemberStore.$reset();
});
const fullName = computed(() => {
  return `${data.value.first_name} ${data.value.last_name}`;
});
onMounted(async () => {
  if (route.name == "dashboard-add-member") {
    return;
  }
  emitter.emit("showLoading", true);
  title.value = "Edit Member Information";
  await teamMemberStore.getMember(route.query.email);
  items.value.push({ title: data.value.name });
  items.value[items.value.length - 2] = {
    title: fullName.value,
    to: `team-members/show-member-info/?name=${fullName.value}&email=${data.value.email}`,
  };
  items.value[items.value.length - 1] = {
    title: "Edit Member Info",
  };
  buttonLabel.value = "update";
  // fileContainer.value.children[1].children[0].src = data.value.image;
  // removeLabel();
  imageSrc.value = data.value.avatar;
  data.value.image = "";
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
</style>
