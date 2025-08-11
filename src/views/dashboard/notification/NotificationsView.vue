<template>
  <div class="notifications">
    <PageTitle title="Notifications" :items />
    <v-row justify="center">
      <v-col cols="10" sm="8" md="6" lg="5">
        <div class="filter open-sans d-flex justify-space-between">
          <div class="status d-flex justify-">
            <v-label class="mr-4 roboto">Status:</v-label>
            <v-chip-group
              filter
              mandatory
              variant="outlined"
              v-model="filter.status"
              class="text-capitalize"
            >
              <v-chip
                v-for="sta in notificationStatus()"
                :key="sta.name"
                :value="sta.name"
                :color="sta.color"
                link
              >
                {{ sta.name }}
              </v-chip>
            </v-chip-group>
          </div>
          <SortingButton v-model:sorting-order="filter.sortingOrder" />
        </div>
      </v-col>
    </v-row>
    <div ref="notificationContainer" class="notification-container mt-4">
      <v-row justify="center">
        <v-col cols="10" sm="8" md="6" lg="5">
          <v-list
            color="#525C60"
            mandatory
            bg-color="#F9F8F8"
            class="pa-0 mt-2 has-scroll mx-auto"
            v-if="allNotifications.notifications"
          >
            <template
              v-for="notify in allNotifications.notifications.data"
              :key="notify.id"
            >
              <v-list-item
                width="100%"
                :class="[
                  'py-4 px-5 main-transition mx-auto',
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
              v-if="allNotifications?.notifications?.data?.length === 0"
              class="text-center py-4"
            >
              <div class="open-sans no-notifications">
                No notifications available
              </div>
            </v-list-item>
            <v-list-item v-if="loadingMore" class="text-center py-4">
              <div class="open-sans no-notifications">Loading...</div>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { inject, nextTick, onMounted, onUnmounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getNotificationIcon } from "@/utils/getNotificationIcon.js";
import { useNotificationStore } from "@/stores/notifications";
import SortingButton from "@/components/dashboard/global/SortingButton.vue";
import { storeToRefs } from "pinia";
import debounce from "lodash.debounce";
import { onBeforeUnmount } from "vue";
import { watch } from "vue";
import formats from "@/mixins/formats";
import { toLower } from "lodash";

const notificationStore = useNotificationStore();
const { allNotifications, totalPages } = storeToRefs(notificationStore);
const notificationContainer = ref(null);

const filter = reactive({
  status: "All",
  sortingOrder: "desc",
});

const router = useRouter();
const route = useRoute();
const page = ref(1);
const lastPage = ref(1);
const emitter = inject("emitter");
const loadingMore = ref(false);
const role = route.params.role;
const { capitalizeFirstLetter } = formats();

const notificationStatus = () => {
  return [
    {
      name: "All",
      color: "blue",
    },
    {
      name: "Read",
      color: "green",
    },
    {
      name: "Unread",
      color: "red",
    },
  ];
};

const items = [
  {
    title: "Dashboard",
    to: `/${role}/dashboard`,
  },
  {
    title: "Notifications",
    to: `/${role}/dashboard/notifications`,
  },
];

const getNotifications = async () => {
  if (page.value > totalPages.value) return;
  try {
    console.log(30, filter, page.value);
    await notificationStore.getAllNotifications(30, filter, page.value);
  } catch (e) {
    console.error(e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const showNotifyDetails = (notify) => {
  notificationStore.showNotifyDetails(notify);
};

const updateRoute = () => {
  const query = {
    status: filter.status.toLowerCase(),
    sorting_order: filter.sortingOrder,
  };

  // if (page && totalPage.value > 1) query.page = page;

  router.push({ path: route.path, query: query });
};
const debouncedFetch = debounce(async () => {
  emitter.emit("showLoading", true);
  await getNotifications();
  updateRoute();
}, 750);

watch(
  () => ({ ...filter }),
  () => {
    emitter.emit("showLoading", true);
    page.value = 1;
    debouncedFetch();
  },
  { deep: true, immediate: true }
);

const onScroll = async () => {
  const container = notificationContainer.value;
  if (!container) return;
  const scrollBottom =
    container.scrollHeight - container.scrollTop - container.clientHeight;
  if (scrollBottom < 60 && page.value <= totalPages.value) {
    page.value++;
    loadingMore.value = true;
    await getNotifications();
    loadingMore.value = false;
  }
};

onBeforeUnmount(() => {
  debouncedFetch.cancel();
});

onUnmounted(() => {
  const container = notificationContainer.value;
  if (container) {
    container.removeEventListener("scroll", onScroll);
  }
});

onMounted(async () => {
  filter.status = ["all", "read", "unread"].includes(
    toLower(route.query.status)
  )
    ? capitalizeFirstLetter(route.query.status)
    : "All";

  filter.sortingOrder = ["desc", "asc"].includes(
    toLower(route.query.sorting_order)
  )
    ? (filter.sortingOrder = route.query.sorting_order)
    : "desc";

  await nextTick();
  const container = notificationContainer.value;
  console.log("container", container);
  if (container) {
    container.addEventListener("scroll", onScroll);
  } else {
    console.warn(
      "notificationContainer is not a valid DOM element:",
      container
    );
  }
});
</script>

<style lang="scss" scoped>
.notification-container {
  max-height: calc(100vh - 204px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
.notifications {
  .v-label {
    color: $arapawa;
    opacity: 1;
    font-size: 18px;
    font-weight: 500;
  }
  .v-list-item {
    &:not(:last-of-type) {
      border-bottom: 1px solid #d4d0d0b0;
    }
    .title {
      color: $arapawa;
      font-size: 17px;
      font-weight: 500;
    }
    .message {
      color: $light-gray;
      color: #333333c7;
      // height: 38px;
      font-size: 14px;
      .span {
        text-overflow: ellipsis;
      }
    }
  }
  .no-notifications {
    color: $arapawa;
    font-size: 14px;
    font-weight: 500;
    margin-top: 12px;
  }
}
.open-sans {
  color: $altamira;
}
</style>