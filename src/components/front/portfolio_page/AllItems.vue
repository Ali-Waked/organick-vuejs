<template>
  <div class="all-items section-padding">
    <v-container>
      <v-row justify="center" class="gc-md-4 gc-lg-0">
        <v-col
          cols="12"
          sm="6"
          md="5"
          lg="4"
          v-for="num in 6"
          :key="num"
          style="width: fit-content"
        >
          <div class="box" @click="showLoading">
            <div class="image cursor-pointer main-transition position-relative">
              <img
                src="@/assets/images/organic-carrot.png"
                alt="organic-carrot"
              />
              <v-icon>mdi-chevron-right</v-icon>
            </div>
            <div class="info">
              <h3 class="title roboto">Green & Tasty Lemon</h3>
              <span class="type yellowtail">Farmer</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emitter = inject("emitter");

const showLoading = () => {
  emitter.emit("showLoading");
  window.scrollTo(0, 0);
  router.push({ name: "single-portfolio" });
};
</script>

<style lang="scss">
.all-items {
  .box {
    .image {
      max-width: 370px;
      max-height: 340px;
      border-radius: 22px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        border-radius: 22px;
      }
      @media (max-width: 599px) {
        margin: auto;
      }
      &::after {
        content: "";
        background-color: hsla(0, 0%, 100%, 0.897);
        border-radius: 22px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        transition-duration: 0.5s;
        z-index: 10;
      }
      i {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        background-color: $green-sheen;
        color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -250px);
        width: 50px;
        height: 50px;
        transition: 0.2s;
        z-index: 20;
      }
      &:hover {
        &::after {
          width: 86%;
          height: 86%;
        }
        i {
          animation: show-cheveron 1s 0.5s infinite ease-in-out;
        }
      }
    }
    .info {
      margin-left: 8px;
      margin-top: 6px;
      .title {
        color: $arapawa;
        font-size: 22px;
        font-weight: 900;
      }
      span.type {
        color: $green-sheen;
        font-size: 20px;
      }
      @media (max-width: 599px) {
        text-align: center;
      }
    }
  }
}

@keyframes show-cheveron {
  0%,
  20%,
  60%,
  100% {
    transform: translate(-50%, -50%);
  }

  40%,
  80% {
    transform: translate(-50%, -50px);
  }
}
</style>
