<template>
  <div class="avatar-image">
    <label for="avatar">
      <img :src="image" alt="avatar" ref="imageAvatar" />
    </label>
    <input type="file" hidden id="avatar" @change="changeImage" />
  </div>
</template>

<script setup>
import {ref} from 'vue';
const props = defineProps({
  image: {
    type: String,
    required: true,
  }
});
const emit = defineEmits(['update:modelValue','update:avatarUrl']);
const imageAvatar = ref(null);
const changeImage = (input) => {
  const file = input.target.files[0];
  if(file && file.type.startsWith('image/')){
    const url = URL.createObjectURL(file);
    imageAvatar.value.src = url;
    emit('update:modelValue',file);
    emit('update:avatarUrl',url);
    console.log('url',url);
  }
  // imageAvatar.value.src = input.target.files[0];
};
</script>

<style scoped lang="scss">
label[for="avatar"]{
    cursor: pointer;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    display: block;
    width: fit-content;
    margin-bottom: 12px;
    margin-left: auto;
    margin-right: auto;
    img {
    border-radius: 50%;
    width: 95px;
    max-height: 95px;
    }
  }
</style>