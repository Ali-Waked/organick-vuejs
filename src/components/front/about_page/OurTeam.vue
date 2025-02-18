<template>
  <div class="our-team section-padding">
    <v-container>
      <div>
        <HeaderSection
          header="Team"
          title="Our Organic Experts"
          class="text-center"
        />
      </div>
      <p class="open-sans">
        Simply dummy text of the printing and typesetting industry. Lorem had
        ceased to been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley.
      </p>
      <v-row class="mt-6" justify="center">
        <v-col cols="12" sm="6" md="5" lg="4" v-for="num in numbers" :key="num">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              :color="isHovering ? '#fff' : '#F9F8F8'"
              class="main-transition cursor-pointer card"
              :elevation="isHovering ? 12 : 0"
              v-bind="props"
            >
              <div class="image">
                <img
                  src="@/assets/images/about/team1.jpg"
                  alt="team image"
                  class="main-transition"
                  :style="{ scale: isHovering ? '1.05' : '1' }"
                />
              </div>
              <div class="px-2 pa-4">
                <v-card-title class="member-name roboto"
                  >Giovani Bacardo</v-card-title
                >
                <v-card-text class="d-flex justify-space-between align-center">
                  <span class="work-type yellowtail">Farmer</span>
                  <!-- <span class="social-media d-flex align-center gc-2">
                    <v-icon
                      :class="['main-transition', isHovering ? 'active' : '']"
                      icon="mdi-instagram"
                      style="--color-on-hover: #c13584"
                    ></v-icon>
                    <v-icon
                      :class="['main-transition', isHovering ? 'active' : '']"
                      icon="mdi-twitter"
                      style="--color-on-hover: #33ccff"
                    ></v-icon>
                    <v-icon
                      :class="['main-transition', isHovering ? 'active' : '']"
                      icon="mdi-facebook"
                      style="--color-on-hover: #3b5998"
                    ></v-icon>
                  </span> -->
                  <SocialsMedia :isHovering />
                </v-card-text>
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import HeaderSection from "@/components/front/global/HeaderSection.vue";
import SocialsMedia from "./SocialsMedia.vue";
defineProps({
  numbers: {
    type: Number,
    default: 3,
  },
});
</script>

<style lang="scss" scoped>
.our-team {
  p.open-sans {
    color: $altamira;
    font-size: 15px;
    max-width: 70%;
    margin: 6px auto 0px;
    text-align: center;
  }
  .card {
    .image {
      width: 100%;
      height: 380px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    border-radius: 24px;
    .member-name {
      font-size: 22px;
      font-weight: bold;
      color: $arapawa;
    }
    .work-type {
      font-size: 19px;
      font-weight: italic;
      color: $green-sheen;
    }
    // i {
    //   color: $arapawa;
    //   font-size: 22px;
    //   &.active {
    //     color: var(--color-on-hover);
    //     rotate: 360deg;
    //   }
    // }
  }
}
</style>
