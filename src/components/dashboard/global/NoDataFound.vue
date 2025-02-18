<template>
  <div class="no-data-found mt-8 d-flex justify-center align-center">
    <div>
      <NoDataFound />
      <p class="roboto">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import NoDataFound from "../../front/svgs/image/NoDataFound.vue";
defineProps({
  message: {
    type: String,
    default: "No Data Found",
  },
});
</script>

<style lang="scss">
.no-data-found {
  p {
    text-align: center;
    font-size: 35px;
    margin-top: 24px;
    color: #ff000096;
    font-weight: bold;
  }
  svg {
    @media (min-width: 1120px) {
      height: 460px;
    }
    @media (max-width: 959px) {
      height: 380px;
    }
    @media (max-width: 599px) {
      height: 280px;
    }
  }
}
</style>
