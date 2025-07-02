<template>
  <div class="drawer">
    <v-navigation-drawer :rail expand-on-hover class="main-transition" color="grey-lighten-4" v-model="drawer">
      <v-list class="pt-4">
        <v-list-item class="pa-0 pl-3">
          <div class="logo d-flex align-center gc-1 cursor-pointer"
            @click="showLoading, router.push({ name: 'dashboard' })">
            <AppLogo width="32" height="40" class="mr-2" />
            <span class="roboto">Organick</span>
          </div>
        </v-list-item>
        <v-divider class="mt-3"></v-divider>

        <v-list-item-group>
          <template v-for="item in navItems" :key="item.name">
            <v-list-item class="pa-0 pl-3 mt-3 py-3" :to="{ name: item.name }" active-color="grey"
              active-class="active-link">
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
  {
    name: "dashboard",
    label: "Home",
    icon: "mdi-view-dashboard-outline", // more dashboard-specific
  },
  {
    name: "dashboard-categories",
    label: "Categories",
    icon: "mdi-shape-outline", // more category-related
  },
  {
    name: "dashboard-products",
    label: "Products",
    icon: "mdi-package-variant", // better for products
  },
  {
    name: "dashboard-news",
    label: "News",
    icon: "mdi-newspaper-variant-outline", // more distinct news icon
  },
  {
    name: "dashboard-orders",
    label: "Orders",
    icon: "mdi-cart-outline", // better suited than clipboard
  },
  // {
  //   name: "dashboard-chat",
  //   label: "Chat",
  //   icon: "mdi-chat-outline", // cleaner chat icon
  // },
  {
    name: "dashboard-drivers",
    label: "Drivers",
    icon: "mdi-steering", // steering wheel icon
  },
  {
    name: "dashboard-customers",
    label: "Customers",
    icon: "mdi-account-group-outline", // better for customer groups
  },
  {
    name: "dashboard-moderators",
    label: "Moderators",
    icon: "mdi-shield-account-outline", // signifies roles/authority
  },
  {
    name: "dashboard-cities",
    label: "Cities",
    icon: "mdi-city-variant-outline", // clearer city representation
  },
  {
    name: "dashboard-payment-methods",
    label: "Payment Methods",
    icon: "mdi-credit-card-outline", // more specific for payments
  },
  // {
  //   name: "dashboard-profile",
  //   label: "Profile",
  //   icon: "mdi-account-circle-outline", // clearer profile icon
  // },
  {
    name: "dashboard-reports",
    label: "Report",
    icon: "mdi-file-chart-outline", // clean report/chart look
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
    width: 0px;
    /* Adjust the width as needed */
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
