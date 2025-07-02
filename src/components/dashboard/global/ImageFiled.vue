<template>
  <div class="position-relative">
    <div class="file" ref="fileContainer">
      <label :for="id" :class="[
        'main-transition',
        hasError ? 'error' : '',
        loading ? 'cursor-progress event-none' : '',
      ]" @dragleave="dragLeave" @dragover.prevent="dragOver" @drop.prevent="onDrop" tabindex="0" v-if="!imageSrc">
        <div class="d-flex align-center justify-center flex-column" v-if="!loading">
          <v-icon icon="mdi-cloud-upload" />
          <span class="open-sans">{{ label }}</span>
        </div>
        <!-- <div class="loading text-center" style="width: 140px" v-if="loading">
          <v-progress-linear indeterminate></v-progress-linear>
          <span class="text-h6 mt-2 d-block">Loading...</span>
        </div> -->
        <LoadingProgressLinear v-if="loading" class="mt-n8" />
      </label>
      <div class="image position-relative" v-if="imageSrc">
        <img :src="imageSrc" alt="uploaded Image" />
        <v-icon icon="mdi-close" @click="removeImage" />
      </div>
      <input type="file" @change="uploadedFile" :id accept="image/*" />
    </div>
    <!-- <div class="mt-n6">
      <v-checkbox
        v-model="isChecked"
        label="Are You Went To Remove Backgound Image??"
        color="blue"
      ></v-checkbox>
    </div> -->
    <FiledError :error />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import FiledError from "../global/FiledError.vue";
import axios from "axios";
import LoadingProgressLinear from "./LoadingProgressLinear.vue";

const props = defineProps({
  id: {
    type: String,
    default: "image",
  },
  error: {
    type: Array,
    default: [],
  },
  label: {
    type: String,
    default: "Upload Image",
  },
  imageSrc: {
    type: String,
    default: "",
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "update:modelValue",
  "update:imageSrc",
  "update:isChecked",
]);

const fileContainer = ref(null);
const dragActive = ref(false);
const loading = ref(false);
const formData = new FormData();
const imageWithBackground = ref("");

const isChecked = computed({
  get: () => props.isChecked,
  set: (value) => emit("update:isChecked", value),
});

watch(
  () => {
    isChecked.value;
    props.imageSrc;
  },
  (newVal) => {
    if (
      isChecked.value &&
      !formData.has("image_file") &&
      props.imageSrc !== ""
    ) {
      imageWithBackground.value = props.imageSrc;
      emit("update:imageSrc", "");
      loading.value = true;
      console.log("hello");
      fetchImageRemovedBackground();
    }
  },
  { deep: true }
);

const fetchImageRemovedBackground = async () => {
  await axios
    .post(import.meta.env.VITE_REMOVE_BACKGROUND_URL, formData, {
      headers: {
        "content-type": "multipart/form-data",
        "X-Api-Key": import.meta.env.VITE_REMOVE_BACKGROUND_KEY,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      // emit("update:imageSrc", imageWithBackground.value);
      console.error(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const hasError = computed(() => props.error.length > 0);

const uploadedFile = (event) => {
  const file = event.target.files[0];
  formData.append("size", "auto");
  formData.append("image_file", file);
  handleFile(file);
};

const dragLeave = (event) => {
  event.target.style.opacity = 0.7;
};

const dragOver = (event) => {
  event.target.style.opacity = 1;
};

const onDrop = (event) => {
  const file = event.dataTransfer.files[0];
  handleFile(file);
  dragActive.value = false;
};

const handleFile = (file) => {
  if (file && file.type.startsWith("image/")) {
    const url = URL.createObjectURL(file);
    formData.delete("image_file");
    emit("update:modelValue", file);
    emit("update:imageSrc", url);
  }
};

const removeImage = () => {
  emit("update:modelValue", null);
  emit("update:imageSrc", null);
};
</script>

<style lang="scss">
.image img {
  max-height: 400px;
  max-width: 350px;
}

.file {
  height: 200px;

  label {
    width: 100%;
    padding: 16px;
    height: 180px;
    color: #9b9b9b;
    border: 2px solid currentColor;
    border-style: dashed;
    border-radius: 8px;
    margin-bottom: 16px;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }

    cursor: pointer;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;

    i {
      color: currentColor;
      font-size: 70px;
    }

    span {
      color: currentColor;
      font-size: 22px;
      font-weight: bold;
    }

    &.error {
      color: #b00020;
    }
  }

  .image {
    height: 180px;
    // display: none;
    width: fit-content;
    position: relative;

    img {
      height: 100%;
      border-radius: 6px;
    }

    i {
      background: #333;
      border-radius: 50%;
      color: #eee;
      font-size: 13px;
      padding: 12px;
      cursor: pointer;
      position: absolute;
      top: -8px;
      right: -8px;
      transition: 0.5s;
    }
  }

  input[type="file"] {
    display: none;
  }
}
</style>
