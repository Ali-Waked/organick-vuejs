<template>
  <div class="box d-flex align-center py-2 px-4 cursor-pointer ">
    <v-avatar size="64" class="me-4" @click="showImage(image)">
      <img :src="image" alt="Customer Image" referrerpolicy="no-referrer" />
    </v-avatar>
    <div class="customer-info" @click="ShowUserInfo()">
      <div class="info-row">
        <span class="label roboto">Name:</span>
        <span class="value open-sans">{{ fullName }}</span>
      </div>
      <div class="info-row">
        <span class="label roboto">Email:</span>
        <span class="value open-sans">{{ email }}</span>
      </div>
      <div class="info-row">
        <span class="label roboto">Register Date:</span>
        <span class="value open-sans">{{ dateFormat(date) }}</span>
      </div>
    </div>
  </div>
  <ShowImage :image-src="imageSrc" v-model:model-value="dialog" />
</template>

<script setup>
import { computed, inject, onMounted, ref } from "vue";
import formats from "@/mixins/formats";
import ShowImage from "@/components/dashboard/global/ShowImage.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  firstName: String,
  lastName: String,
  date: String,
  image: {
    type: String,
  },
  email: {
    type: String,
    default: "",
  },
});
const { dateFormat } = formats();
const dialog = ref(false);
const imageSrc = ref("");
const emitter = inject('emitter');
const router = useRouter();

const showImage = (url) => {
  imageSrc.value = url;
  dialog.value = true;
};

const ShowUserInfo = () => {
  emitter.emit("showLoading", true);
  router.push({
    name: `dashboard-show-customer-information`,
    query: { name: fullName, email: props.email },
  });
};

const fullName = computed(() => `${props.firstName} ${props.lastName}`);
onMounted(() => {
  console.log('enter');
})
</script>

<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;
  position: relative;

  &:not(:last-of-type) {

    border-bottom: 1px solid #525c6033;
    padding-bottom: 7px;
  }

  &::after {
    content: '';
    background-color: #99999914;
    position: absolute;
    transition: 0.5s;
    left: 0;
    top: 0;
    width: 0%;
    z-index: -1;
    height: 100%;
  }

  &:hover::after {
    width: 100%;
  }
}

.customer-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  // justify-content: space-between;
  gap: 12px;
}

.label {
  font-weight: 600;
  color: $arapawa; // Tailwind gray-500
}

.value {
  font-weight: 500;
  color: $altamira; // Tailwind gray-900
  text-align: left;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
}
</style>
