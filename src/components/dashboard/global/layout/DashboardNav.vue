<template>
  <v-app-bar class="app-nav bg-grey-lighten-4 elevation-1 position-absolute">
    <v-container class="d-flex justify-space-between align-center">
      <div class="d-flex align-center gc-4">
        <v-app-bar-nav-icon
          class="menu-bars d-block d-lg-none"
          @click="showLinks"
        />
        <p
          class="roboto cursor-pointer main-transition"
          @click="router.push({ name: 'dashboard' })"
        >
          <span>Admin Dashboard</span>
        </p>
        <div class="position-relative">
          <span class="badge position-absolute">20</span>
          <v-icon
            icon="mdi-bell-ring-outline"
            class="cursor-pointer"
            color="#274C5B"
          />
          <v-menu :activator="`parent`" location="bottom center">
            <v-list color="#525C60" mandatory bg-color="#F9F8F8">
              <v-list-item
                link
                v-for="notify in notification"
                :key="notify.id"
                >{{ notify }}</v-list-item
              >
              <v-list-item link>item one</v-list-item>
              <v-list-item link>item one</v-list-item>
              <v-list-item link>item one</v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <div class="logout">
        <button class="roboto main-transition" @click="logout">
          <span>Logout</span>
          <v-icon icon="mdi-logout"></v-icon>
        </button>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import AppLogo from "@/components/front/svgs/icons/AppLogo.vue";
import { inject, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../../stores/auth/auth";
import { storeToRefs } from "pinia";
import axiosClient from "@/axiosClient";

const emitter = inject("emitter");
const authStore = useAuthStore();
const { redirect } = storeToRefs(authStore);
const router = useRouter();
const notification = reactive({});

const showLinks = () => {
  emitter.emit("showLinks");
};
const logout = async () => {
  await authStore.logout();
  if (redirect) {
    router.push({ name: "home" });
  }
};

onMounted(() => {
  axiosClient
    .get("/dashboard/notifications")
    .then((response) => {
      notification.value = response.data.notifications;
    })
    .catch((e) => console.error(e));
});
</script>

<style lang="scss" scoped>
.app-nav {
  padding: 6px 0;
  .menu-bars {
    color: $arapawa;
    font-size: 18px;
    left: 2px;
  }
  p {
    color: $arapawa;
    font-size: 22px;
    font-weight: bold;
    &:hover {
      color: $green-sheen;
    }
  }
  .logout {
    button {
      font-size: 12px;
      color: $arapawa;
      font-weight: 500;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 20px;
        display: inline-block;
        margin-right: 6px;
      }
      &:hover {
        color: rgba(223, 22, 22, 0.747);
      }
    }
  }
}
.badge {
  font-size: 8px;
  cursor: pointer;
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  background-color: $arapawa;
  z-index: 20;
  top: -2px;
  left: 12px;
}
</style>
