<template>
  <div class="add-news">
    <PageTitle :title :items />
    <v-row class="mt-4">
      <v-col cols="12" sm="10" md="7">
        <v-form @submit.prevent="submitNews">
          <v-text-field variant="outlined" type="text" required label="News Title" :error-messages="errors.title"
            v-model="news.title" color="#525C60"></v-text-field>
          <v-text-field variant="outlined" type="text" required label="News sub title" :error-messages="errors.subtitle"
            v-model="news.subtitle" color="#525C60"></v-text-field>
          <TextEditor ref="textEditor" :error="errors.content" label="Write News Content...." :content="news.content" />

          <v-autocomplete :items="types" item-value="id" item-title="name" label="Selected News Type" variant="outlined"
            type="text" class="mt-6" color="#525C60" :error-messages="errors.type" v-model="news.type"></v-autocomplete>
          <v-radio-group label="News Status" v-model="news.is_published" :error-messages="errors.is_published" inline>
            <v-radio label="Archived" color="orange-lighten-2" class="mr-12" :value="0"></v-radio>
            <v-radio label="Publish" color="green" :value="1"></v-radio>
          </v-radio-group>
          <ImageFiled id="newsImage" :error="errors.image" label="Upload News Image" v-model:image-src="imageSrc"
            v-model:model-value="news.image" />
          <v-btn type="submit" elevation="0" color="#7EB693" class="text-none w-100 open-sans text-capitalize"
            height="50px" :loading>{{ buttonLabel }}</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import { inject, onBeforeMount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useNewsStore } from "@/stores/dashboard/news";
import ImageFiled from "@/components/dashboard/global/ImageFiled.vue";
import TextEditor from "@/components/dashboard/global/TextEditor.vue";
// import { useCategoryStore } from "@/stores/dashboard/category";
import NewsView from "./NewsView.vue";
import axiosClient from "../../../axiosClient";

// const router = useRouter();
const route = useRoute();
const title = ref("Add News");
const buttonLabel = ref("save");
const image = ref(null);
const emitter = inject("emitter");
const dragActive = ref(false);
const newsStore = useNewsStore();
// const CategoryStore = useCategoryStore();
const { news, errors, loading } = storeToRefs(newsStore);
// const { allCategories } = storeToRefs(CategoryStore);
const textEditor = ref(null);
const isChecked = ref(false);
const types = ref([]);
const role = route.params.role;
const imageSrc = ref("");

const items = ref([
  {
    title: "Dashboard",
    to: `/${role}/dashboard`,
  },
  {
    title: "News",
    to: `/${role}/dashboard/news`,
  },
  {
    title: "Add News",
    // to: "/dashboard/category",
  },
]);

const submitNews = async () => {
  // loading.value = true;
  emitter.emit("showLoading", true);

  const formData = new FormData();
  Object.keys(news.value).forEach((key) => {
    formData.append(key, news.value[key]);
  });
  const content = await textEditor.value.getContent().then((res) => {
    if (res.blocks.length) {
      formData.append("content", JSON.stringify(res));
    }
  });
  // console.log(formData.get("text"), content);
  if (route.name === "dashboard-add-news") {
    await newsStore.addNews(formData);
  } else {
    formData.append("_method", "PUT");
    formData.delete("image");
    if (imageSrc.value !== "") {
      formData.append("image_file", imageSrc.value);
    }
    await newsStore.updateNews(formData, news.value.slug);
  }
  emitter.emit("showLoading", false);
};

// onBeforeMount(() => {
//   newsStore.$reset();
// });
onMounted(async () => {
  // await CategoryStore.getAllCategories();
  await newsStore.$reset();
  await axiosClient.get('/dashboard/news/get-types').then(response => {
    // console.log('hi');
    // console.log(response);
    types.value = response.data.types;
  }).catch(e => {
    console.error(e);
  })
  if (route.query.slug == undefined) {
    return;
  }
  emitter.emit("showLoading", true);
  title.value = "Edit News";
  await newsStore.show(route.query.slug);
  // items.value.push({ title: news.value.name });
  // items.value[items.value.length - 2] = {
  //   title: news.value.title,
  //   to: `/dashboard/news/${news.value.slug}/show`,
  // };
  items.value[items.value.length - 1] = {
    title: "Edit News",
  };
  buttonLabel.value = "update";
  imageSrc.value = news.value.image;
  delete news.value.image;
  for (let key in news.value) {
    if (news.value[key] === null) {
      news.value[key] = "";
    }
  }
  emitter.emit("showLoading", false);
});
</script>

<style lang="scss" scoped>
form {
  button {
    font-size: 18px;
    font-weight: bold;
  }
}

div[role="application"] {
  border: 1px solid #9b9b9b;

  &:hover {
    border-color: $arapawa;
  }
}

.tox .tox-statusbar {
  display: none !important;
}
</style>
