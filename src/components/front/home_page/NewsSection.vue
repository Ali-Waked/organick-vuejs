<template>
  <div class="news-section section-padding">
    <v-container>
      <v-row align="end">
        <v-col cols="12" md="7">
          <HeaderSection
            header="News"
            title="Discover weekly content about organic food, & more"
            class="flex-1"
          />
        </v-col>
        <v-col cols="12" md="5">
          <v-btn
            width="190"
            height="58"
            elevation="0"
            color="#274C5B"
            class="text-none d-none d-md-block ml-auto"
            variant="outlined"
            @click="showLoading"
          >
            <span>Explore Now</span>
            <v-icon icon="mdi-arrow-right"></v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <div
        class="d-flex justify-center align-center gr-6 gc-12 mt-12 flex-column flex-lg-row"
      >
        <SingleBlog />
        <SingleBlog />
      </div>
    </v-container>
  </div>
</template>

<script setup>
import HeaderSection from "@/components/front/global/HeaderSection.vue";
import SingleBlog from "@/components/front/global/SingleBlog.vue";
import { inject } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emitter = inject("emitter");

const showLoading = () => {
  emitter.emit("showLoading");
  window.scrollTo(0, 0);
  router.push({ name: "blogs" });
};
</script>

<style scoped lang="scss">
.news-section {
  overflow: hidden;
  button {
    font-size: 16px;
    font-weight: bold;
    border-radius: 12px;
    border-width: 2px;
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
}
</style>
