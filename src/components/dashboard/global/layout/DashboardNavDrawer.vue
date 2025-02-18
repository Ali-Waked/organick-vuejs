<template>
  <div class="drawer">
    <v-navigation-drawer
      :rail
      expand-on-hover
      class="main-transition"
      color="grey-lighten-4"
      v-model="drawer"
    >
      <v-list class="pt-4">
        <v-list-item class="pa-0 pl-3">
          <div
            class="logo d-flex align-center gc-1 cursor-pointer"
            @click="showLoading, router.push({ name: 'dashboard' })"
          >
            <AppLogo width="32" height="40" class="mr-2" />
            <span class="roboto">Organick</span>
          </div>
        </v-list-item>
        <v-divider class="mt-3"></v-divider>

        <v-list-item-group>
          <template v-for="item in navItems" :key="item.name">
            <v-list-item
              class="pa-0 pl-3 mt-3 py-3"
              :to="{ name: item.name }"
              active-color="grey"
              active-class="active-link"
            >
              <div class="link">
                <v-icon :icon="item.icon" />
                <span class="roboto">{{ item.label }}</span>
              </div>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { onMounted, ref, inject, computed } from "vue";
import AppLogo from "@/components/front/svgs/icons/AppLogo.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const drawer = ref(false);
const rail = ref(true);
const emitter = inject("emitter");

const navItems = [
  { name: "dashboard", label: "Home", icon: "mdi-home" },
  { name: "dashboard-categories", label: "Categories", icon: "mdi-sitemap" },
  { name: "dashboard-products", label: "Products", icon: "mdi-food-apple" },
  // { name: "dashboard-projects", label: "Projects", icon: "mdi-file-check" },
  { name: "dashboard-blogs", label: "News", icon: "mdi-newspaper" },
  {
    name: "dashboard-orders",
    label: "Orders",
    icon: "mdi-clipboard-arrow-down",
  },
  // {
  //   name: "dashboard-messages",
  //   label: "Messages",
  //   icon: "mdi-comment-account",
  // },
  // {
  //   name: "dashboard-team",
  //   label: "Team Member",
  //   icon: "mdi-account-multiple",
  // },
  // {
  //   name: "dashboard-users",
  //   label: "Team Suppoted",
  //   icon: "mdi-account-multiple",
  // },
  // { name: "dashboard-services", label: "Services", icon: "mdi-puzzle" },
  { name: "dashboard-roles", label: "Chat", icon: "mdi-wechat" },
  {
    name: "dashboard-drivers",
    label: "Drivers",
    icon: "mdi-account-multiple-outline",
  },
  {
    name: "dashboard-customers",
    label: "Customers",
    icon: "mdi-account-multiple",
  },
  {
    name: "dashboard-moderators",
    label: "Moderators",
    icon: "mdi-account-multiple-outline",
  },
  // { name: "dashboard-roles", label: "Roles", icon: "mdi-account-key" },
  { name: "dashboard-cities", label: "Cities", icon: "mdi-city" },
  {
    name: "dashboard-payment-methods",
    label: "Payment Methods",
    icon: "mdi-cash",
  },
  { name: "dashboard-roles", label: "Profile", icon: "mdi-account" },
  {
    name: "dashboard-reports",
    label: "Report",
    icon: "mdi-chart-bar",
  },
];

const isRail = () => {
  if (window.innerWidth >= 1120) {
    rail.value = true;
    drawer.value = true;
  } else {
    rail.value = false;
    drawer.value = false;
  }
};
const showLinks = () => {
  emitter.on("showLinks", () => {
    drawer.value = !drawer.value;
  });
};

onMounted(() => {
  isRail();
  window.addEventListener("resize", isRail);
  showLinks();
});
</script>

<style lang="scss">
.v-navigation-drawer {
  ::-webkit-scrollbar {
    width: 0px; /* Adjust the width as needed */
  }
  .logo {
    width: fit-content;
    span {
      font-size: 26px;
      font-weight: bold;
      color: $arapawa;
    }
  }
  .link {
    display: flex;
    align-items: center;
    text-wrap: nowrap;
    column-gap: 16px;
    i {
      font-size: 32px;
      color: $green-sheen;
    }
    span {
      color: $altamira;
      font-weight: 500;
      font-size: 20px;
    }
  }
}
</style>
