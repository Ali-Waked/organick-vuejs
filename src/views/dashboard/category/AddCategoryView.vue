<template>
  <div class="add-category">
    <PageTitle :title :items />
    <v-row class="mt-4">
      <v-col cols="12" sm="10" md="7">
        <v-form @submit.prevent="submitCategory">
          <v-text-field
            variant="outlined"
            type="text"
            required
            label="Category Name"
            :error-messages="errors.name"
            v-model="category.name"
            color="#525C60"
          ></v-text-field>
          <v-textarea
            variant="outlined"
            type="text"
            color="#525C60"
            label="Category description"
            :error-messages="errors.description"
            v-model="category.description"
            no-resize
          ></v-textarea>
          <v-select
            :items="subCategories"
            label="Selected Sub Category (opcnial)"
            variant="outlined"
            type="text"
            color="#525C60"
            :error-messages="errors.parent_id"
            v-model="category.parent_id"
          ></v-select>
          <v-radio-group
            label="Category Status"
            v-model="category.is_active"
            :error-messages="errors.is_active"
            inline
          >
            <v-radio
              label="Active"
              color="green"
              :value="1"
              class="mr-12"
            ></v-radio>
            <v-radio
              label="Archived"
              color="orange-lighten-2"
              :value="0"
            ></v-radio>
          </v-radio-group>
          <ImageFiled
            id="categoryImage"
            :error="errors.image"
            label="Upload Category Image"
            v-model:image-src="imageSrc"
            v-model:model-value="category.image"
            v-model:is-checked="isChecked"
          />
          <div>
            <v-checkbox
              v-model="category.is_featured"
              class="text-grey-darken-2"
              label="Make category as featured category"
              color="blue"
              :value="1"
            ></v-checkbox>
          </div>
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
import { useCategoryStore } from "@/stores/dashboard/category";
import { storeToRefs } from "pinia";
import ImageFiled from "@/components/dashboard/global/ImageFiled.vue";

const route = useRoute();
const title = ref("Add Category");
const buttonLabel = ref("save");
const imageSrc = ref("");
const emitter = inject("emitter");
const categoryStore = useCategoryStore();
const { category, errors, allCategories, loading } = storeToRefs(categoryStore);
const isChecked = ref(false);
const role = route.params.role;
const items = ref([
  {
    title: "Dashboard",
    to: `/${role}/dashboard`,
  },
  {
    title: "Categories",
    to: `/${role}/dashboard/categories`,
  },
  {
    title: "Add Category",
  },
]);

const subCategories = ref([
  {
    title: "Main Category",
    value: "",
  },
]);

const submitCategory = async () => {
  emitter.emit("showLoading", true);
  const formData = new FormData();
  Object.keys(category.value).forEach((key) => {
    formData.append(key, category.value[key]);
  });
  if (route.params.category == undefined) {
    await categoryStore.addCategory(formData);
  } else {
    formData.append("_method", "PUT");
    await categoryStore.updateCategory(formData);
  }
  emitter.emit("showLoading", false);
};
onBeforeMount(() => {
  categoryStore.$reset();
});

onMounted(async () => {
  // emitter.emit("showLoading", false);
  // return;
  // }
  const categoryId = ref(0);
  emitter.emit("showLoading", true);
  if (route.params.category != undefined) {
    title.value = "Edit Category";
    await categoryStore.showCategory(route.params.category);
    categoryId.value = category.value.id;
    items.value.push({ title: category.value.name });
    items.value[items.value.length - 2] = {
      title: category.value.name,
      to: `/admin/dashboard/categories/${category.value.slug}/show`,
    };
    items.value[items.value.length - 1] = {
      title: "Edit Category",
    };
    buttonLabel.value = "update";
    imageSrc.value = category.value.image;
    delete category.value.image;
    for (let key in category.value) {
      if (category.value[key] === null) {
        category.value[key] = "";
      }
    }
  }
  await categoryStore.getAllCategories(categoryId.value);
  allCategories.value.forEach((ele) => {
    subCategories.value.push({
      title: ele.name,
      value: ele.id,
    });
  });
  emitter.emit("showLoading", false);
});
</script>

<style lang="scss" scoped>
.add-category {
  form {
    button {
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
