<template>
  <div class="obber-offer-organic section-padding">
    <v-container>
      <div class="d-flex justify-space-between align-end">
        <HeaderSection
          header="Offer"
          title="We Offer Organic For You"
          title-color="#fff"
        />
        <v-btn
          width="190"
          height="58"
          elevation="0"
          class="text-none d-none d-md-block"
        >
          <span>Explore Now</span>
          <v-icon icon="mdi-arrow-right"></v-icon>
        </v-btn>
      </div>
      <v-row class="pt-12" justify="center">
        <v-col cols="9" sm="6" md="4" lg="3" v-for="num in 4" :key="num">
          <ProductItem
            :rating="4.5"
            category-name="vegetable"
            product-name="Calabrese Broccoli"
            :old-price="20.0"
            :new-price="13.0"
            bg-color="#f9f8f8"
          />
        </v-col>
      </v-row>
      <v-btn
        width="80%"
        height="58"
        elevation="0"
        class="text-none d-block d-md-none mt-8 mx-auto"
      >
        <span>Explore Now</span>
        <v-icon icon="mdi-arrow-right"></v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script setup>
import HeaderSection from "@/components/front/global/HeaderSection.vue";
import ProductItem from "@/components/front/global/ProductItem.vue";
</script>

<style scoped lang="scss">
.obber-offer-organic {
  background-color: $arapawa;
  button {
    background-color: $maize;
    font-size: 16px;
    font-weight: bold;
    color: $arapawa;
    border-radius: 12px;
    margin-top: 16px;
    i {
      width: 18px;
      height: 18px;
      background-color: $arapawa;
      color: #fff;
      border-radius: 50%;
      font-size: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 6px;
    }
  }
  ::v-deep {
  }
}
</style>
