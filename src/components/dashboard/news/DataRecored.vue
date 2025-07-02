<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card class="card cursor-pointer mx-auto pb-4 open-sans" min-width="280px" max-width="420px" v-bind="props"
      :elevation="isHovering ? 5 : 2">
      <v-img class="align-end text-white position-relative" height="200" :src="news.image" cover>
        <v-card-title class="text-capitalize roboto" style="background-color: #00000061;">{{
          news.title
          }}</v-card-title>
        <span class="position-absolute d-flex flex-column align-center justify-center views">
          <span class="num">{{ news.number_of_views }}</span>
          <v-icon icon="mdi-eye" />
        </span>
      </v-img>
      <v-card-subtitle class="mt-2 roboto" lines="3">{{
        news.subtitle
        }}</v-card-subtitle>
      <v-card-text class="py-2">
        <span class="text-color font-weight-bold">Type:</span>
        <span class="text-color ml-2">{{ news.type }}</span>
      </v-card-text>
      <v-card-text class="py-2">
        <span class="text-color font-weight-bold">Pablished at:</span>
        <span class="text-color ml-2">{{ dateFormat(news.created_at) }}</span>
      </v-card-text>
      <v-card-text class="py-2">
        <span class="text-color font-weight-bold">Last Modified:</span>
        <span class="text-color ml-2">{{ dateFormat(news.updated_at) }}</span>
      </v-card-text>
      <v-card-actions class="ml-2 flex-wrap">
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script setup>
import ActionButton from "./ActionButton.vue";
import formats from "@/mixins/formats";

const { dateFormat } = formats();

defineProps({
  news: {
    type: Object,
  },
});

// const fullname = computed(() => {
//   return `${news.user.first_name} ${news.user.last_name}`;
// });
</script>

<style lang="scss" scoped>
.text-color {
  color: $arapawa;
  // font-size: 16px;
}

.views {
  top: 0;
  right: 0px;
  width: 52px;
  height: 52px;
  background: #ffffffa8;
  color: $arapawa;
  font-size: 12px;

  .num {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
