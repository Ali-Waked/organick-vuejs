<template>
  <div class="last-news">
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        v-bind="props"
        :class="[
          'last-news-pulished has-scroll overflow-x-hidden',
          isHovering ? 'overflow-y-auto' : '',
        ]"
      >
        <v-card-title
          class="d-flex justify-space-between align-center"
          style="background-color: rgb(0 0 0 / 17%)"
        >
          <span class="text-h6 font-weight-bold d-inline-block ml-2 py-3"
            >Last News Publish</span
          >
          <span class="see-more d-flex align-center">
            <span>See More</span>
            <v-icon icon="mdi-chevron-double-right" size="14px"></v-icon>
          </span>
        </v-card-title>
        <v-card-text class="pa-0 mt-3">
          <v-row class="pr-2">
            <v-col cols="12" class="open-sans" style="color: #525c60">
              <v-row v-for="news in data" class="news-row news" :key="news.id">
                <div class="image position-relative">
                  <img :src="news.image" :last="news.title" />
                </div>
                <div class="box-content">
                  <div>
                    <span>title:</span><span>{{ news.title }}</span>
                  </div>
                  <div>
                    <span>subtitle:</span><span>{{ news.subtitle }}</span>
                  </div>
                  <div>
                    <span>publish Date:</span
                    ><span>{{ dateFormat(news.published_at) }}</span>
                  </div>
                </div>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>

<script setup>
import formats from "@/mixins/formats";
defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const { dateFormat } = formats();
</script>

<style scoped lang="scss">
.text-h6 {
  color: $arapawa;

  &span {
    + i {
      font-size: 20px;
    }
  }
}
span.see-more {
  color: #616161;
  cursor: pointer;
  font-size: 12px;
  transition: 0.5s;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 2px;
    width: 0;
    background: #2196f3;
    transition: 0.5s;
  }
  &:hover {
    color: #2196f3;

    &::after {
      // width: 100%;
      width: calc(100% - 10px);
    }
  }
}
.news-row {
  border-bottom: 1px solid #525c6033;
  display: flex;
  align-items: center;
  position: relative;
  // font-size: 10px !important;

  &:not(:last-of-type) {
    border-bottom: 1px solid #525c6033;
    padding-bottom: 7px;
  }

  &::after {
    content: "";
    background-color: #99999914;
    position: absolute;
    transition: 0.5s;
    // left: 0%;
    right: 0px;
    top: 0%;
    // transform: translate(-50%, -50%);
    width: 0%;
    z-index: -1;
    height: 100%;
  }

  &:hover::after {
    width: 100%;
  }
}

.news {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  .box-content {
    margin-left: 140px;
    cursor: pointer;
  }

  // justify-content: center;
  .image {
    margin-right: 12px;
    // padding: 14px 0;
    height: 112px;

    img {
      width: 140px;
      position: absolute;
      left: 0;
      z-index: -1;
      top: 0;
      height: 106%;
    }

    + div {
      div {
        line-height: 1.6;

        span:first-of-type {
          font-size: 14px;
          text-transform: capitalize;
          margin-right: 8px;
          color: $arapawa;
          font-weight: 500;
        }

        span:last-of-type {
          color: rgb(39 76 91 / 54%);
        }
      }
    }
  }
}
</style>