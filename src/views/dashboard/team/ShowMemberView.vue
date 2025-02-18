<template>
  <div class="show-member">
    <PageTitle title="Team Members" :items />
    <!-- {{ data }} -->
    <div class="image" @click="showImage">
      <img :src="data.avatar" :alt="fullName + ' photo'" />
    </div>
    <div class="info">
      <div class="box">
        <span class="mr-4 roboto">Full Name</span>
        <span class="open-sans text-capitalize">{{ fullName }}</span>
      </div>
      <div class="box">
        <span class="mr-4 roboto">Email</span>
        <span class="open-sans">{{ data.email }}</span>
      </div>
      <div class="box">
        <span class="mr-4 roboto">Job title</span>
        <span class="open-sans">{{ data.job_title }}</span>
      </div>
      <div class="box">
        <span class="mr-4 roboto">Last Active</span>
        <span class="open-sans">{{
          data.last_active_at ?? "He hasn't entered the account yet"
        }}</span>
      </div>
      <div class="box">
        <span class="mr-4 roboto">Joined At</span>
        <span class="open-sans">{{ format(data.created_at) }}</span>
      </div>
      <div class="box">
        <span class="mr-4 roboto">Birthday</span>
        <span class="open-sans">{{ data.birthday }}</span>
      </div>
      <div class="box">
        <span class="mr-4 roboto">Number Of Projects Completed</span>
        <span class="open-sans">{{ "0" }}</span>
      </div>
      <div class="box">
        <span class="mr-4 roboto">Number Of Product Added</span>
        <span class="open-sans">{{ "0" }}</span>
      </div>
      <div class="box">
        <span class="mr-4 roboto">Number Of Category Added</span>
        <span class="open-sans">{{ "0" }}</span>
      </div>
      <div class="box">
        <span class="mr-4 roboto">roles</span>
        <span class="open-sans">{{ fullName }}</span>
      </div>
    </div>
  </div>
  <!-- <v-dialog
    class="dialog d-flex align-center justify-center"
    width="100vw"
    height="100vh"
    v-model="dialog"
  >
    <div
      class="d-flex align-center justify-center ma-auto"
      style="max-width: 80vw; max-height: 80vh"
    >
      <img
        :src="data.avatar"
        :alt="fullName + ' photo'"
        style="max-height: 100%; max-width: 100%"
      />
    </div>
    <v-btn
      icon="mdi-close"
      color="#00000094"
      style="font-size: 12px"
      width="35px"
      height="35px"
      class="position-absolute right-0 top-0 text-white"
      @click="dialog = false"
    />
  </v-dialog> -->
  <ShowImage :image-src="imageSrc" v-model:model-value="dialog" />
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { computed, inject, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useTeamStore } from "../../../stores/dashboard/team";
import { storeToRefs } from "pinia";
import NoDataFound from "../../../components/dashboard/global/NoDataFound.vue";
import formatDate from "../../../mixins/formatDate";
import ShowImage from "../../../components/dashboard/global/ShowImage.vue";
const route = useRoute();
const emitter = inject("emitter");
const teamMemberStore = useTeamStore();
const { data, loading } = storeToRefs(teamMemberStore);
const { format } = formatDate();
const dialog = ref(false);
const imageSrc = ref("");
// const category = "panana";
const items = ref([
  {
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    title: "Team Members",
    to: "/dashboard/team-members",
  },
]);

const fullName = computed(() => {
  return data.value.first_name + " " + data.value.last_name;
});

const showImage = () => {
  imageSrc.value = data.value.avatar;
  dialog.value = true;
};

onMounted(async () => {
  emitter.emit("showLoading", true);
  // await categoryStore.showCategory(route.params.category);
  // items.value.push({ title: category.value.name });
  const email = route.query.email;
  if (email) {
    await teamMemberStore.getMember(email);
    items.value.push({
      title: fullName.value,
    });
  }
  emitter.emit("showLoading", false);
  // console.log(route.params.category);
});
</script>

<style lang="scss" scoped>
.show-member {
  .image {
    img {
      max-width: 200px;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 4px;
      cursor: pointer;
    }
    margin: 8px 0px;
  }
  .info {
    border-radius: 8px;
    border: #d4d4d4 1px solid;
    overflow: hidden;
    .box {
      padding: 16px 12px;
      span {
        display: inline-block;
        &.roboto {
          color: $arapawa;
          font-size: 18px;
          font-weight: bold;
          width: 300px;
        }
        &.open-sans {
          color: $altamira;
        }
      }
      &:nth-of-type(odd) {
        background-color: #fff;
      }
      &:nth-of-type(even) {
        background-color: rgb(249, 248, 248);
      }
    }
  }
}
</style>
