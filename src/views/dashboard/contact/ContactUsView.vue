<template>
  <div class="contact-us">
    <PageTitle title="Contact Us Messages" :items />
    <FilterSection
      v-if="!loading"
      v-model:search="filter.name"
      search-label="Search By name Or email"
    >
      <template #options
        ><div
          class="d-flex flex-column flex-sm-row align-start align-sm-center gr-4 mt-1 mt-md-3"
        >
          <div class="ml-0 ml-md-6">
            <FilterOption
              :options="sortOptions"
              v-model:model-value="filter.sort_by"
              btn-id="filter_by"
              btn-label="Sort by"
            />
          </div>
          <div class="d-flex align-center">
            <div class="ml-0 ml-sm-6">
              <FilterOption
                :options="statusOption"
                v-model:model-value="filter.status"
                btn-id="is_active"
                btn-label="Status"
              />
            </div>
            <SortingButton v-model:sorting-order="filter.sortingOrder" />
          </div>
        </div>
      </template>
    </FilterSection>
    <TableData
      :data="contactsMessage"
      v-if="contactsMessage.length"
      @showContactMessage="showMessage($event)"
    >
      <template #actions="{ item }">
        <ActionButton
          v-if="!item.reply_id"
          @click.stop="showReplyDialog(item)"
          icon="mdi-reply"
          tooltip="Send Reply"
          color="primary"
          backgournd-color="primary-lighten-4"
        />
        <ActionButton
          v-else
          @click.stop="showMessage(item)"
          icon="mdi-eye"
          tooltip="Show"
          color="#4caf50"
          backgournd-color="#e5f5e9"
        />
      </template>
    </TableData>
    <DeleteAlert
      :title="alert.title"
      :text="alert.text"
      v-model:dialog="alert.dialog"
      :extra-data="alert.extraData"
      @delete="deleteCityForever($event)"
    />
    <NoDataFound v-if="!loading && contactsMessage.length == 0" />
    <ShowContactMessage
      v-model:dialog="data.dialog"
      :contact-message="data.contact_message"
      @showContactMessage="
        showReplyDialog($event);
        console.log('hi');
      "
    />
    <SendReply
      v-model:dialog="showReplayDialog.dialog"
      :contact-message="showReplayDialog.data"
      @fetchContactsMessage="getContactMessage"
    />
  </div>
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { inject, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import NoDataFound from "@/components/dashboard/global/NoDataFound.vue";
import FilterSection from "@/components/dashboard/global/FilterSection.vue";
import TableData from "@/components/dashboard/contact/TableData.vue";
import FilterOption from "@/components/dashboard/global/FilterOption.vue";
import debounce from "lodash.debounce";
import axiosClient from "@/axiosClient";
import DeleteAlert from "@/components/dashboard/global/DeleteAlert.vue";
import ActionButton from "@/components/dashboard/global/ActionButton.vue";
import SortingButton from "@/components/dashboard/global/SortingButton.vue";
import SendReply from "@/components/dashboard/contact/SendReply.vue";
import { toLower } from "lodash";
import ShowContactMessage from "@/components/dashboard/contact/ShowContactMessage.vue";
import formats from "@/mixins/formats";

const router = useRouter();
const emitter = inject("emitter");
const contactsMessage = ref([]);
const route = useRoute();
const page = ref(1);
const totalPage = ref(1);
const filter = reactive({
  name: "",
  sort_by: ["Send Date"],
  status: ["All"],
  sortingOrder: "desc",
});
const sortOptions = [
  { value: "Email", title: "Email" },
  { value: "Replyed Date", title: "Replyed Date" },
  { value: "Send Date", title: "Send Date" },
];

const statusOption = [
  { value: "All", title: "All" },
  { value: "Replyed", title: "Replyed" },
  { value: "Not Reply", title: "Not Reply" },
];
const position = reactive({
  x: 0,
  y: 0,
});
const showReplayDialog = reactive({
  data: {},
  dialog: false,
});
const data = reactive({
  contact_message: {},
  dialog: false,
});
const { capitalizeFirstLetter } = formats();

const showMessage = async ({ id }, notify_id = null) => {
  emitter.emit("showLoading", true);
  // const contact = contactsMessage.value.find((con) => con.id == id);
  // if (!contact) {
  //   emitter.emit("showLoading", false);
  //   return;
  // }
  await axiosClient
    .get(`/dashboard/contact/${id}?notify_id=${notify_id}`)
    .then((response) => {
      position.x = window.scrollX;
      position.y = window.scrollY;
      sessionStorage.setItem("scrollPosition", JSON.stringify(position));
      router.replace({
        query: {
          ...router.currentRoute.value.query,
          name: data.contact_message.name,
          email: data.contact_message.email,
          subject: data.contact_message.subject,
          id: data.contact_message.id,
        },
      });
      data.contact_message = response.data;
      data.dialog = true;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      emitter.emit("showLoading", false);
    });
};
watch(
  () => data.dialog,
  (newVal) => {
    if (!newVal) {
      const query = { ...router.currentRoute.value.query };

      delete query.id;
      delete query.name;
      delete query.subject;
      delete query.email;
      delete query.notify;

      sessionStorage.setItem("scrollPosition", JSON.stringify(position));
      router.replace({ query });
    }
  }
);
watch(
  () => showReplayDialog.dialog,
  (newVal) => {
    if (!newVal) {
      const query = { ...router.currentRoute.value.query };

      delete query.reply_id;

      sessionStorage.setItem("scrollPosition", JSON.stringify(position));
      router.replace({ query });
    }
  }
);
const alert = reactive({});
const role = route.params.role;
const items = [
  {
    title: "Dashboard",
    to: `/${role}/dashboard`,
  },
  {
    title: "Contact us",
    to: `/${role}/dashboard/contact-us`,
  },
];

const showReplyDialog = (message) => {
  position.x = window.scrollX;
  position.y = window.scrollY;
  sessionStorage.setItem("scrollPosition", JSON.stringify(position));
  router.replace({
    query: {
      ...router.currentRoute.value.query,
      reply_id: message.id,
    },
  });
  showReplayDialog.data = message;
  showReplayDialog.dialog = true;
};

const fetchMessages = async () => {
  try {
    const sort_by = filter.sort_by[0].toLowerCase().replaceAll(" ", "_");
    const sort_by_value =
      sort_by == "replyed_date"
        ? "reply_at"
        : sort_by == "email"
        ? "email"
        : "created_at";
    const filterOption = {
      search: filter.name,
      status: filter.status[0].toLowerCase().replaceAll(" ", "_"),
      sort_by: sort_by_value,
      sortingOrder: filter.sortingOrder,
    };
    await axiosClient
      .get(`/dashboard/contact?filter=${JSON.stringify(filterOption)}`)
      .then((response) => {
        contactsMessage.value = response.data.data;
        totalPage.value = response.data.last_page;
        page.value = response.data.current_page;
        isShowMessage();
        isShowReplyDialog();
        console.log(contactsMessage.value);
      });
  } catch (e) {
    console.log("error", e);
  } finally {
    emitter.emit("showLoading", false);
  }
};

const debouncedFetch = debounce(async () => {
  await fetchMessages();
  updateRoute(page.value);
}, 750);

watch(
  () => filter,
  () => {
    emitter.emit("showLoading", true);
    debouncedFetch();
  },
  { deep: true, immediate: true }
);

watch(
  () => route.query.notify,
  async (newVal, oldVal) => {
    if (newVal == oldVal) {
      return;
    }
    emitter.emit("showLoading", true);
    const notify = route.query.notify;
    const id = route.query.id;
    const email = route.query.email;
    if (notify && id && email && route.query.name && route.query.subject) {
      await showMessage({ id: id }, notify);
    }
    emitter.emit("showLoading", false);
  }
);

const updateRoute = (page) => {
  const query = { ...route.query };

  if (filter.name) query.search = filter.name;

  if (filter.sort_by[0])
    query.sort_by = filter.sort_by[0].toLowerCase().replaceAll(" ", "_");

  if (filter.status[0])
    query.status = filter.status[0].toLowerCase().replaceAll(" ", "_");

  if (filter.sortingOrder) query.sorting_order = filter.sortingOrder;

  // if (
  //   route.query.id &&
  //   route.query.subject &&
  //   route.query.name &&
  //   route.query.email
  // ) {
  //   query.id = route.query.id;
  //   query.name = route.query.name;
  //   query.subject = route.query.subject;
  //   query.email = route.query.email;
  // }

  if (page && totalPage.value > 1) query.page = page;

  router.push({ path: route.path, query: query });
};

onBeforeUnmount(() => {
  debouncedFetch.cancel();
});

const getContactMessage = () => {
  emitter.emit("showLoading", true);
  fetchMessages();
};

const isShowReplyDialog = () => {
  if (route.query.reply_id) {
    const contact = contactsMessage.value.find(
      (con) => con.id == route.query.reply_id
    );
    if (contact) {
      showReplyDialog(contact);
    }
  }
};

const isShowMessage = async () => {
  if (
    route.query.id &&
    route.query.name &&
    route.query.subject &&
    route.query.email
  ) {
    await showMessage(route.query);
  }
};
onMounted(() => {
  emitter.emit("showLoading", true);
  filter.name = route.query.search ?? "";
  const hasPageNumber = +route.query.page;
  if (!isNaN(hasPageNumber)) {
    page.value = +route.query.page;
  }
  filter.sort_by = ["send_date", "email", "replyed_date"].includes(
    toLower(route.query.sort_by)
  )
    ? [capitalizeFirstLetter(route.query.sort_by)]
    : ["Send Date"];

  filter.status = ["all", "replyed", "not_reply"].includes(
    toLower(route.query.status)
  )
    ? [capitalizeFirstLetter(route.query.status)]
    : ["All"];

  filter.sortingOrder = ["desc", "asc"].includes(
    toLower(route.query.sorting_order)
  )
    ? (filter.sortingOrder = route.query.sorting_order)
    : "desc";
});
</script>
