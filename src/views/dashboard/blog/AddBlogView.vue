<template>
  <div class="add-blog">
    <PageTitle :title :items />
    <v-row class="mt-4">
      <v-col cols="12" sm="10" md="7">
        <v-form @submit.prevent="submitBlog">
          <v-text-field
            variant="outlined"
            type="text"
            required
            label="Blog Title"
            :error-messages="errors.title"
            v-model="blog.title"
            color="#525C60"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            type="text"
            required
            label="Blog sub title"
            :error-messages="errors.subtitle"
            v-model="blog.subtitle"
            color="#525C60"
          ></v-text-field>
          <TextEditor
            ref="textEditor"
            :error="errors.text"
            label="Write Blog Content...."
            :content="blog.text"
          />

          <v-autocomplete
            :items="allCategories"
            item-value="id"
            item-title="name"
            label="Selected Category"
            variant="outlined"
            type="text"
            class="mt-6"
            color="#525C60"
            :error-messages="errors.category_id"
            v-model="blog.category_id"
          ></v-autocomplete>
          <v-radio-group
            label="Blog Status"
            v-model="blog.status"
            :error-messages="errors.status"
            inline
          >
            <v-radio
              label="Archived"
              color="orange-lighten-2"
              class="mr-12"
              value="archived"
            ></v-radio>
            <v-radio label="Publish" color="green" value="Publish"></v-radio>
          </v-radio-group>
          <ImageFiled
            id="blogImage"
            :error="errors.image"
            label="Upload Blog Image"
            v-model:image-src="imageSrc"
            v-model:model-value="blog.image"
          />
          <v-btn
            type="submit"
            elevation="0"
            color="#7EB693"
            class="text-none w-100 open-sans text-capitalize"
            height="50px"
            :loading
            >{{ buttonLabel }}</v-btn
          >
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
import { useBlogStore } from "@/stores/dashboard/blog";
import ImageFiled from "@/components/dashboard/global/ImageFiled.vue";
import TextEditor from "@/components/dashboard/global/TextEditor.vue";
import { useCategoryStore } from "@/stores/dashboard/category";
import BlogsView from "./BlogsView.vue";

// const router = useRouter();
const route = useRoute();
const title = ref("Add Blog");
const buttonLabel = ref("save");
const image = ref(null);
const emitter = inject("emitter");
const dragActive = ref(false);
const blogStore = useBlogStore();
const CategoryStore = useCategoryStore();
const { blog, errors, loading } = storeToRefs(blogStore);
const { allCategories } = storeToRefs(CategoryStore);
const textEditor = ref(null);
const isChecked = ref(false);
const imageSrc = ref("");

const items = ref([
  {
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    title: "Blogs",
    to: "/dashboard/blogs",
  },
  {
    title: "Add Blog",
    // to: "/dashboard/category",
  },
]);

const submitBlog = async () => {
  // loading.value = true;
  emitter.emit("showLoading", true);

  const formData = new FormData();
  Object.keys(blog.value).forEach((key) => {
    formData.append(key, blog.value[key]);
  });
  const content = await textEditor.value.getContent().then((res) => {
    if (res.blocks.length) {
      formData.append("text", JSON.stringify(res));
    }
  });
  // console.log(formData.get("text"), content);
  if (route.params.blog == undefined) {
    await blogStore.addBlog(formData);
  } else {
    formData.append("_method", "PUT");
    await blogStore.updateCategory(formData);
  }
  emitter.emit("showLoading", false);
};

onBeforeMount(() => {
  blogStore.$reset();
});
onMounted(async () => {
  await CategoryStore.getAllCategories();
  if (route.query.id == undefined) {
    return;
  }
  emitter.emit("showLoading", true);
  title.value = "Edit Blog";
  await blogStore.show(route.query.id);
  items.value.push({ title: blog.value.name });
  items.value[items.value.length - 2] = {
    title: blog.value.title,
    to: `/dashboard/blogs/${blog.value.slug}/show`,
  };
  items.value[items.value.length - 1] = {
    title: "Edit Blog",
  };
  buttonLabel.value = "update";
  imageSrc.value = blog.value.image;
  delete blog.value.image;
  for (let key in blog.value) {
    if (blog.value[key] === null) {
      blog.value[key] = "";
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
