<template>
  <div class="add-product">
    <PageTitle :title :items />
    <v-row class="mt-4">
      <v-col cols="12" sm="10" md="7">
        <v-form @submit.prevent="submitProduct">
          <v-text-field
            variant="outlined"
            type="text"
            required
            label="Product Name"
            :error-messages="errors.name"
            v-model="product.name"
            color="#525C60"
          ></v-text-field>
          <v-textarea
            variant="outlined"
            type="text"
            color="#525C60"
            label="Product description"
            :error-messages="errors.description"
            v-model="product.description"
            no-resize
          ></v-textarea>
          <v-text-field
            variant="outlined"
            type="number"
            min="1"
            required
            label="Product Price"
            :error-messages="errors.price"
            v-model.number="product.price"
            color="#525C60"
          ></v-text-field>
          <v-combobox
            v-model="product.tags"
            label="Tags"
            chips
            clearable
            variant="outlined"
            multiple
            @remove="removeTag"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :key="item"
                :model-value="selected"
                closable
                @click="select"
                @click:close="removeTag(item)"
              >
                <strong>{{ item }}</strong
                >&nbsp;
                <span>(interest)</span>
              </v-chip>
            </template>
          </v-combobox>
          <v-text-field
            variant="outlined"
            type="number"
            min="1"
            required
            label="Qauntity"
            :error-messages="errors.quantity"
            v-model.number="product.quantity"
            color="#525C60"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            type="number"
            min="1"
            required
            label="Alert Before defoalt(5)"
            :error-messages="errors.low_stock_threshold"
            v-model.number="product.low_stock_threshold"
            color="#525C60"
          ></v-text-field>
          <!-- <v-textarea
            variant="outlined"
            type="text"
            color="#525C60"
            label="Product extra information"
            :error-messages="errors.extra_information"
            v-model="product.extra_information"
            no-resize
            ></v-textarea> -->
          <v-autocomplete
            :items="allCategories"
            item-value="id"
            item-title="name"
            label="Selected Category"
            variant="outlined"
            type="text"
            color="#525C60"
            :error-messages="errors.category_id"
            v-model="product.category_id"
          ></v-autocomplete>
          <v-radio-group
            label="Product Status"
            v-model="product.is_active"
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
            id="productImage"
            :error="errors.image"
            label="Upload Product Image"
            v-model:image-src="imageSrc"
            v-model:model-value="product.image"
          />
          <div>
            <v-checkbox
              v-model="product.is_featured"
              class="text-grey-darken-2"
              label="Make product as featured product"
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
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/dashboard/product";
import { useCategoryStore } from "@/stores/dashboard/category";
import ImageFiled from "@/components/dashboard/global/ImageFiled.vue";

const route = useRoute();
const title = ref("Add Product");
const buttonLabel = ref("save");
const emitter = inject("emitter");
const productStore = useProductStore();
const CategoryStore = useCategoryStore();
const { product, errors, loading } = storeToRefs(productStore);
const { allCategories } = storeToRefs(CategoryStore);
const imageSrc = ref("");
const isChecked = ref(true);
const role = route.params.role;
const items = ref([
  {
    title: "Dashboard",
    to: `/${role}/dashboard`,
  },
  {
    title: "Products",
    to: `/${role}/dashboard/products`,
  },
  {
    title: "Add Product",
  },
]);

const removeTag = (item) => {
  const index = product.value.tags.indexOf(item);
  if (index > -1) {
    product.value.tags.splice(index, 1);
  }
};

const submitProduct = async () => {
  emitter.emit("showLoading", true);
  const formData = new FormData();
  Object.keys(product.value).forEach((key) => {
    formData.append(key, product.value[key]);
  });
  if (route.params.product == undefined) {
    await productStore.addProduct(formData);
  } else {
    formData.append("_method", "PUT");
    await productStore.updateProduct(formData);
  }
  emitter.emit("showLoading", false);
};

onBeforeMount(() => {
  productStore.$reset();
});

onMounted(async () => {
  emitter.emit("showLoading", true);
  await CategoryStore.getAllCategories();
  if (route.params.product == undefined) {
    emitter.emit("showLoading", false);
    return;
  }
  const notify_id = route.query.notify;
  title.value = "Edit Product";
  await productStore.showProduct(route.params.product, notify_id);
  items.value.push({ title: product.value.name });
  items.value[items.value.length - 2] = {
    title: product.value.name,
    to: `/dashboard/categories/${product.value.slug}/show`,
  };
  items.value[items.value.length - 1] = {
    title: "Edit Product",
  };
  buttonLabel.value = "update";
  imageSrc.value = product.value.image;
  delete product.value.image;
  product.value.tags = product.value.tags.map((value) => value.name);
  for (let key in product.value) {
    if (product.value[key] === null) {
      product.value[key] = ""; // Replace null with an empty string
    }
  }
  emitter.emit("showLoading", false);
});
</script>

<style lang="scss" scoped>
.add-product {
  form {
    button {
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
