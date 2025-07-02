<template>
  <v-layout class="position-relative">
    <DashboardNavDrawer />
    <DashboardNav />

    <v-main class="content pt-2 mb-8 position-relative">
      <ActionAlert :icon="alert.icon" :background-color="alert.backgroundColor" :message="alert.message"
        :class="alertClass" />
      <v-progress-linear indeterminate size="100" bg-color="#525C60" width="30" color="#525C60"
        class="position-absolute top-0 left-0" v-if="isLoading"></v-progress-linear>
      <v-container>
        <slot />
      </v-container>
    </v-main>
    <DashboardFooter />
  </v-layout>
</template>

<script setup>
import DashboardNav from "./DashboardNav.vue";
import DashboardNavDrawer from "./DashboardNavDrawer.vue";
import DashboardFooter from "./DashboardFooter.vue";
import { inject, onMounted, reactive, ref } from "vue";
import ActionAlert from "../ActionAlert.vue";
import debounce from "lodash.debounce";

const isLoading = ref(false);
const emitter = inject("emitter");
const alert = reactive({});
const alertClass = reactive({
  active: false,
});

onMounted(() => {
  emitter.on("showLoading", (status) => {
    isLoading.value = status;
  });
  emitter.on("alert", (data) => {
    const [type, message, icon] = data;
    alert.backgroundColor =
      type === "error"
        ? "red"
        : type === "info"
          ? "blue"
          : type === "worning"
            ? "orange"
            : "green";
    alert.message = message;
    alert.icon = icon;
    alertClass.active = true;
    console.log(type, message);
    removeAlert();
  });
});
const removeAlert = debounce(() => {
  alertClass.active = false;
}, 5000);
</script>

<style lang="scss" scoped>
.content {
  background-color: #eeeeee4b;
  min-height: calc(100vh - 76px);
  margin-top: 76px;
  width: 100%;
}
</style>
