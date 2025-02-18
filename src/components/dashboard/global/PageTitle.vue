<template>
  <div
    class="page-title d-flex align-start align-sm-center justify-space-between flex-column flex-sm-row"
  >
    <h1 class="roboto d-flex align-center">
      <span>{{ title }}</span>
      <span
        v-if="urlTrash"
        style="font-size: 22px; cursor: pointer; margin-left: 12px"
        @click="router.push({ name: urlTrash })"
      >
        <v-icon icon="mdi-login" />
        <v-tooltip :text="urlTrashTitle" activator="parent"> </v-tooltip>
      </span>
    </h1>
    <slot />
    <v-breadcrumbs class="open-sans" :items style="color: #274c5b">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
defineProps({
  title: {
    type: String,
    default: "Dashboard",
  },
  items: {
    type: Array,
    default: [
      {
        title: "Dashboard",
        to: "/dashboard",
      },
    ],
  },
  urlTrash: String,
  urlTrashTitle: {
    type: String,
    default: "Go To",
  },
});
const route = useRoute();
onMounted(() => {
  // console.log(router.getRoutes());
});
</script>
<style lang="scss">
h1 {
  color: $arapawa;
  font-size: 35px;
}
@media (max-width: 595px) {
  h1 {
    font-size: 30px;
  }
  ul {
    li {
      font-size: 12px;
    }
  }
}
</style>
