<template>
  <div class="what-we-offer-for-you section-padding">
    <v-container>
      <HeaderSection
        header="About Us"
        title="What We Offer for You"
        title-color="#fff"
        class="text-center"
      />
      <v-row class="mt-4">
        <v-col cols="12" sm="6" md="4" lg="3" v-for="num in 4" :key="num">
          <v-sheet color="transparent d-flex flex-column align-center">
            <div class="category-image position-relative">
              <img src="@/assets/images/about/Spicy.png" alt="spicy" />
            </div>
            <p class="category-name roboto mt-2">Spicy</p>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import HeaderSection from "@/components/front/global/HeaderSection.vue";
</script>

<style lang="scss" scoped>
.what-we-offer-for-you {
  background-color: $arapawa;
  margin-bottom: 80px;
  .category-image {
    border-radius: 24px;
    width: 274px;
    height: 260px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .category-name {
    color: #fff;
    font-size: 22px;
    font-weight: 500;
  }
}
</style>
