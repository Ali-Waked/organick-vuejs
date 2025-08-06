<template>
  <div class="show-member">
    <PageTitle :title :items />
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
      <div class="box" v-if="data.gender">
        <span class="mr-4 roboto">Gender</span>
        <span class="open-sans">{{ data.gender }}</span>
      </div>
      <div class="box">
        <span class="mr-4 roboto">Last Active</span>
        <span class="open-sans">{{
          data.last_active_at ?? "He hasn't entered the account yet"
        }}</span>
      </div>
      <div class="box">
        <span class="mr-4 roboto">Joined At</span>
        <span class="open-sans">{{ dateFormat(data.created_at) }}</span>
      </div>
      <div class="box" v-if="data.birthday">
        <span class="mr-4 roboto">Birthday</span>
        <span class="open-sans">{{ data.birthday }}</span>
      </div>
      <div class="box" v-if="data.type == 'customer'">
        <span class="mr-4 roboto">Number Of Request Orders</span>
        <span class="open-sans">{{ data.order_count ?? 0 }}</span>
      </div>
      <div class="box" v-if="data.type == 'driver'">
        <span class="mr-4 roboto">Number Of Orders Drived </span>
        <span class="open-sans">{{ "0" }}</span>
      </div>
      <div class="box" v-if="data.billing_address?.phone_number">
        <span class="mr-4 roboto">Phone Number</span>
        <span class="open-sans text-capitalize">{{
          data.billing_address.phone_number
        }}</span>
      </div>
      <div class="box" v-if="data.billing_address?.street">
        <span class="mr-4 roboto">Street</span>
        <span class="open-sans text-capitalize">{{
          data.billing_address.street
        }}</span>
      </div>
      <div class="box" v-if="data.billing_address?.city">
        <span class="mr-4 roboto">City</span>
        <span class="open-sans text-capitalize">{{
          data.billing_address.city.name
        }}</span>
      </div>
      <div class="box">
        <span class="mr-4 roboto">Type</span>
        <span class="open-sans text-capitalize">{{ data.type }}</span>
      </div>
      <div class="box" v-if="data.billing_address?.notes">
        <span class="mr-4 roboto">Note</span>
        <span class="open-sans text-capitalize">{{
          data.billing_address.notes
        }}</span>
      </div>
      <div class="box" v-if="data.socials">
        <span class="mr-4 roboto">Social Media</span>
        <span class="open-sans">
          <SocialMedia :socials="data.socials" />
        </span>
      </div>
      <div class="box" v-if="data.type != 'customer'">
        <span class="mr-4 roboto">Actions</span>
        <span class="open-sans">
          <div>
            <v-btn
              color="#ff9500"
              bg-color="#fff3e0"
              variant="outlined"
              class="mr-2"
              append-icon="mdi-pen"
              @click="editUser(data)"
              >Edit</v-btn
            >
            <v-btn
              color="#f44336"
              bg-color="#ffebee"
              variant="outlined"
              append-icon="mdi-delete"
              @click="deleteUser(data.email)"
              >Delete</v-btn
            >
          </div>
        </span>
      </div>
    </div>
  </div>
  <pre>
    {{ data }}
  </pre>
  <ShowImage :image-src="imageSrc" v-model:model-value="dialog" />
  <DeleteAlert
    :title="alert.title"
    :text="alert.text"
    v-model:dialog="alert.dialog"
    :extra-data="alert.extraData"
    @delete="deleteUserForever($event)"
  />
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { computed, inject, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../../stores/dashboard/user";
import { storeToRefs } from "pinia";
import NoDataFound from "../../../components/dashboard/global/NoDataFound.vue";
import ShowImage from "../../../components/dashboard/global/ShowImage.vue";
import formats from "@/mixins/formats";
import SocialMediaIcon from "../../../components/front/global/SocialMediaIcon.vue";
import SocialMedia from "../../../components/dashboard/user/SocialMedia.vue";
import DeleteAlert from "../../../components/dashboard/global/DeleteAlert.vue";

const router = useRouter();
const route = useRoute();
const emitter = inject("emitter");
const userStore = useUserStore();
const { data, loading } = storeToRefs(userStore);
const { dateFormat } = formats();
const dialog = ref(false);
const imageSrc = ref("");
const url = ref("customers");
const { getSingularName } = formats();
const title = ref("Show Info");
const role = route.params.role;
const alert = reactive({});
// const category = "panana";
const items = reactive([
  {
    title: "Dashboard",
    to: `/${role}/dashboard`,
  },
]);

const fullName = computed(() => {
  return data.value.first_name + " " + data.value.last_name;
});

const singularName = computed(() => {
  return getSingularName(url.value);
});

const showImage = () => {
  imageSrc.value = data.value.avatar;
  dialog.value = true;
};

const deleteUser = (email) => {
  alert.title = `Confirmation Required`;
  alert.text = `<div class="mb-2">Are you sure you want to delete ${singularName.value} <span class="text-red text-capitalize font-weight-bold text-decoration-underline">${fullName.value}</span>?</div>This action is permanent and cannot be undone`;
  alert.extraData = email;
  alert.dialog = true;
};
const deleteUserForever = () => {};
const editUser = ({ email, first_name, last_name }) => {
  emitter.emit("showLoading", true);
  router.push({
    name: `dashboard-edit-${singularName.value}-information`,
    query: { name: `${first_name} ${last_name}`, email: email },
  });
};

watch(
  () => route.name,
  (newName) => {
    switch (newName) {
      case "dashboard-show-customer-information":
        title.value = "Show Customer Information";
        url.value = "customers";
        items[1] = {
          title: "Customers",
          to: `/${role}/dashboard/customers`,
        };
        break;
      case "dashboard-show-moderator-information":
        title.value = "Show Moderator Information";
        url.value = "moderators";
        items[1] = {
          title: "Moderators",
          to: `/${role}/dashboard/moderators`,
        };
        break;
      case "dashboard-show-driver-information":
        title.value = "Show Driver Information";
        url.value = "drivers";
        items[1] = {
          title: "Drivers",
          to: `/${role}/dashboard/drivers`,
        };
        break;
    }
    // getUrlInfo();
  },
  { immediate: true }
);

watch(
  () => route.query.email,
  async (newVal, oldVal) => {
    emitter.emit("showLoading", true);
    console.log("new val", newVal, oldVal);
    const notify = route.query.notify;
    await userStore.getUser(singularName.value, newVal, notify);
    items[2] = {
      title: fullName.value,
    };
    emitter.emit("showLoading", false);
  },
  {
    immediate: true,
  }
);

onMounted(async () => {
  // emitter.emit("showLoading", true);
  // const email = route.query.email;
  // const notify = route.query.notify;
  // if (email) {
  //   items.push({
  //     title: fullName.value,
  //   });
  // }
  // emitter.emit("showLoading", false);
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
