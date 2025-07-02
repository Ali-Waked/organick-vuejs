<template>
  <div class="general-information mt-4" v-if="data">
    <div class="d-flex flex-column align-center">
      <div class="image mb-12" @click="showImage(data.avatar_url)">
        <img :src="data.avatar_url" alt="photo image" />
      </div>
      <div class="box edit-data position-relative">
        <v-icon icon="mdi-pencil-circle-outline" class="position-absolute icon-edit" @click="$emit('edit-information')"/>
        <div class="row">
          <span class="roboto">First Name:</span>
          <span class="open-sans capitalize">{{ data.first_name }}</span>
        </div>
        <div class="row">
          <span class="roboto">Last Name:</span>
          <span class="open-sans capitalize">{{ data.last_name }}</span>
        </div>
        <div class="row">
          <span class="roboto">Email:</span>
          <span class="open-sans">{{ data.email }}</span>
        </div>
        <div class="row">
          <span class="roboto">Gender:</span>
          <span class="open-sans capitalize">{{ data.gender ?? "Un" }}</span>
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
// .edit-data {
//    border: 2px solid $arapawa;
//    border-radius: 8px;
//    padding: 16px;
//    background-color: #ffffff;
//    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//    transition: border-color 0.3s ease;
//   }
.capitalize {
  text-transform: capitalize;
}
  .image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid $arapawa;
    cursor: pointer;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      border-radius: inherit;
      width: 100%;
      height: 100%;
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
    width: 134px;
  }
  span.open-sans {
    color: $altamira;
    font-size: 18px;
  }
  i.icon-edit {
    top: -40px;
    right: 0;
    font-size: 25px;
    color: $light-gray;
    transition: 0.5s;
    &:hover {
      color: $arapawa;
    }
  }
}
</style>
