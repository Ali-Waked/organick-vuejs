<template>
  <div class="general-information mt-4" v-if="data">
    <div class="d-flex flex-column align-center">
      <div class="image mb-12" @click="showImage(data.avatar)">
        <img :src="data.avatar" alt="photo image" />
      </div>
      <div class="box">
        <div class="row">
          <span class="roboto">First Name:</span>
          <span class="open-sans">{{ data.first_name }}</span>
        </div>
        <div class="row">
          <span class="roboto">Last Name:</span>
          <span class="open-sans">{{ data.last_name }}</span>
        </div>
        <div class="row">
          <span class="roboto">Email:</span>
          <span class="open-sans">{{ data.email }}</span>
        </div>
        <div class="row">
          <span class="roboto">Gender:</span>
          <span class="open-sans">{{ data.gender ?? "Un" }}</span>
        </div>
      </div>
    </div>
  </div>
  <ShowImage :image-src="imageSrc" v-model:model-value="dialog" />
</template>

<script setup>
import { ref } from "vue";
import ShowImage from "../../dashboard/global/ShowImage.vue";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const dialog = ref(false);
const imageSrc = ref("");

const showImage = (url) => {
  imageSrc.value = url;
  dialog.value = true;
};
</script>

<style lang="scss" scoped>
.general-information {
  .image {
    width: 108px;
    height: 108px;
    border-radius: 50%;
    border: 3px solid $arapawa;
    cursor: pointer;
    padding: 3px;
    img {
      border-radius: inherit;
    }
  }
  div.box {
    @media (min-width: 769px) {
      width: 500px;
      // width: 600px;
    }
  }
  div.row {
    &:not(:last-of-type) {
      border-bottom: 1px solid #55555526;
    }
    padding: 12px 8px;
    cursor: default;
    position: relative;
    transition: 0.5s;
    &::after {
      content: "";
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      width: 0px;
      transition: 0.5s;
      background-color: #99999914;
    }
    &:hover::after {
      width: 100%;
    }
  }
  span.roboto {
    color: $arapawa;
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 4px;
    display: inline-block;
    width: 126px;
  }
  span.open-sans {
    color: $altamira;
    font-size: 18px;
  }
}
</style>
