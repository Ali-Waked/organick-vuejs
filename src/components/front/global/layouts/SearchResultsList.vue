<template>
  <v-menu :activator="id" location="bottom" width="140px">
    <v-list mandatory bg-color="#fff" elevation="1" class="mt-3">
      <template v-if="results.products?.length">
        <v-subheader class="px-4 text-grey-darken-2 group-title">Products</v-subheader>

        <v-list-item v-for="prod in results.products" :key="'p-' + prod.id" class="pa-2 pl-4 list-item-link"
          @click="goToProduct(prod.slug)" link>
          <template #prepend>
            <v-avatar size="46" class="rounded overflow-hidden" tile>
              <v-img :src="prod.image" :alt="prod.name" aspect-ratio="1" contain class="rounded" />
            </v-avatar>
          </template>

          <v-list-item-title class="title">{{ prod.name }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ prod.category.name }}
          </v-list-item-subtitle>
        </v-list-item>
      </template>
      <template v-if="results.news?.length">
        <v-subheader class="px-4 text-grey-darken-2 group-title">News</v-subheader>

        <v-list-item v-for="news in results.news" :key="'n-' + news.slug" class="pa-2 pl-4 list-item-link"
          @click="goToNews(news.slug)" link>
          <template #prepend>
            <v-avatar size="46" class="rounded overflow-hidden" tile>
              <v-img :src="news.image" :alt="news.name" aspect-ratio="1" contain class="rounded" />
            </v-avatar>
          </template>

          <v-list-item-title class="title">{{ news.title }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ news.type }} &mdash; {{ news.subtitle }}
          </v-list-item-subtitle>
        </v-list-item>
      </template>
      <v-list-item v-if="!search || loading" class="text-center mx-auto">
        <v-progress-circular indeterminate color="#7EB693" size="35"></v-progress-circular>
      </v-list-item>
      <v-list-item v-if="!results.products?.length && !results.news?.length && search && !loading"
        class="pa-4 text-caption text-center text-red">
        No matches found.
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { useRouter } from "vue-router";
const props = defineProps({
  id: {
    type: String,
  },
  search: {
    type: String,
  },
  results: {
    type: Object,
  },
  loading: {
    type: Boolean,
    default: false,
  }
});
const router = useRouter();
const emit = defineEmits(['update:search'])

const goToProduct = (slug) => {
  emit('update:search', '');
  router.push({ name: 'single-shop', params: { product: slug } });
}

const goToNews = (slug) => {
  emit('update:search', '');
  router.push({ name: 'show-news', params: { news: slug } });
}
</script>

<style lang="scss" scoped>
.title {
  color: $arapawa;
}

.group-title {
  background-color: #d4d4d431;
  padding: 10px 0;
  display: block;
}
</style>