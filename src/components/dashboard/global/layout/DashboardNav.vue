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
          <span class="text-capitalize"
            >{{ route.params.role.toLowerCase() }} Dashboard</span
          >
        </p>
        <v-hover v-slot="{ isHovering, props }">
          <div
            :class="[
              'position-relative active-badge main-transition',
              isHovering ? 'active' : '',
            ]"
          >
            <span
              class="badge position-absolute main-transition"
              v-if="notifications.total_unread_count"
              >{{ notifications.total_unread_count }}</span
            >
            <v-icon
              icon="mdi-bell-ring-outline"
              class="cursor-pointer main-transition"
            />
            <v-menu
              :activator="`parent`"
              v-bind="props"
              location="bottom center"
            >
              <v-list
                color="#525C60"
                mandatory
                bg-color="#F9F8F8"
                class="pa-0 mt-2 has-scroll"
                max-height="85vh"
              >
                <template
                  v-for="notify in notifications.notifications.data"
                  :key="notify.id"
                >
                  <v-list-item
                    width="240"
                    :class="[
                      'py-2 px-3 main-transition',
                      notify.read_at ? 'bg-white' : 'bg-grey-lighten-2',
                    ]"
                    link
                    @click="showNotifyDetails(notify)"
                  >
                    <div class="d-flex align-center ga-4">
                      <div>
                        <v-icon
                          :icon="getNotificationIcon(notify.data.type_notify)"
                          class="text-grey"
                          size="28"
                        />
                      </div>
                      <div>
                        <div class="title roboto text-capitalize">
                          {{ notify.data.type_notify.replace("_", " ") }}
                        </div>
                        <div class="message open-sans">
                          <span>{{ notify.data.message }} </span>
                        </div>
                      </div>
                    </div>
                  </v-list-item>
                </template>
                <v-list-item
                  v-if="notifications.notifications.data.length === 0"
                  class="text-center py-4"
                >
                  <div class="open-sans no-notifications">
                    No notifications available
                  </div>
                </v-list-item>
                <v-hover v-slot="{ isHovering, props }">
                  <v-list-item
                    v-bind="props"
                    v-if="notifications.notifications.last_page > 1"
                    :class="[
                      'text-center pa-0 load-more main-transition',
                      isHovering ? 'text-blue-darken-4' : 'text-grey-darken-2',
                    ]"
                    @click="getAllNotifications"
                  >
                    Load More
                  </v-list-item>
                </v-hover>
              </v-list>
            </v-menu>
          </div>
        </v-hover>
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
import { inject, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth/auth";
import { storeToRefs } from "pinia";
import { echo } from "@/echo";
import { getNotificationIcon } from "@/utils/getNotificationIcon.js";
import { useNotificationStore } from "@/stores/notifications";

const emitter = inject("emitter");
const authStore = useAuthStore();
const { redirect, user } = storeToRefs(authStore);
const router = useRouter();
const route = useRoute();
const notificationStore = useNotificationStore();
const { notifications } = storeToRefs(notificationStore);

const showLinks = () => {
  emitter.emit("showLinks");
};
const logout = async () => {
  await authStore.logout();
  if (redirect) {
    router.push({ name: "home" });
  }
};
const getNotifications = async () => {
  emitter.emit("showLoading", true);
  try {
    await notificationStore.getNotifications();
  } catch (e) {
    console.error(e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const showNotifyDetails = (notify) => {
  notificationStore.showNotifyDetails(notify);
};

const getAllNotifications = () => {
  emitter.emit("showLoading", true);
  router.push({ name: "dashboard-notifications" });
};

onMounted(async () => {
  console.log(`user.${user.value.id}.notifications`);
  echo
    .private(`user.${user.value.id}.notifications`)
    .listen(".order.created", (e) => {
      emitter.emit("alert", [
        "info",
        e.message,
        getNotificationIcon(e.type_notify),
      ]);
      console.log(e);
      getNotifications();
    })
    .listen(".product.out_of_stock", (e) => {
      emitter.emit("alert", [
        "info",
        e.message,
        getNotificationIcon(e.type_notify),
      ]);
      console.log(e);
      getNotifications();
    })
    .listen(".product.low_stock", (e) => {
      emitter.emit("alert", [
        "info",
        e.message,
        getNotificationIcon(e.type_notify),
      ]);
      console.log(e);
      getNotifications();
    })
    .listen(".rate-site", (e) => {
      emitter.emit("alert", [
        "info",
        e.message,
        getNotificationIcon(e.type_notify),
      ]);
      console.log(e);
      getNotifications();
    })
    .listen(".rate-product", (e) => {
      emitter.emit("alert", [
        "info",
        e.message,
        getNotificationIcon(e.type_notify),
      ]);
      console.log(e);
      getNotifications();
    })
    .listen(".customer.register", (e) => {
      emitter.emit("alert", [
        "info",
        e.message,
        getNotificationIcon(e.type_notify),
      ]);
      console.log(e);
      getNotifications();
    });
  await getNotifications();
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
.active-badge {
  color: $arapawa;
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
  &.active,
  &:hover {
    color: $green-sheen;
    .badge {
      background-color: $green-sheen;
    }
  }
}
.v-list-item {
  &:not(:last-of-type) {
    border-bottom: 1px solid #d4d0d0b0;
  }
  .title {
    color: $arapawa;
    font-size: 15px;
    font-weight: 500;
  }
  .message {
    color: $light-gray;
    color: #333333c7;
    height: 38px;
    font-size: 12px;
    .span {
      text-overflow: ellipsis;
    }
  }
}
.no-notifications {
  color: $arapawa;
  font-size: 14px;
  font-weight: 500;
}
.load-more {
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}
</style>
