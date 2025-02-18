<template>
  <div class="offer-banner section-padding">
    <v-container>
      <div class="parent">
        <v-hover v-slot="{ isHovering, props }">
          <div
            class="natural content"
            v-bind="props"
            :class="[isHovering ? 'elevation-6' : '', 'main-transition']"
          >
            <div>
              <span class="block yellowtail font-italic">Natural!!</span>
              <h3 class="roboto">Get Garden Fresh Fruits</h3>
            </div>
          </div>
        </v-hover>
        <v-hover v-slot="{ isHovering, props }">
          <div
            class="offer content"
            v-bind="props"
            :class="[isHovering ? 'elevation-6' : '', 'main-transition']"
          >
            <div>
              <span class="block yellowtail font-italic">Offer!!</span>
              <h3 class="roboto">Get 10% off on Vegetables</h3>
            </div>
          </div>
        </v-hover>
      </div>
      <!-- <img src="@/assets/images/banana.jpg" alt="" /> -->
    </v-container>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
%main-banner-offer-style {
  background-size: cover;
  border-radius: 20px;
  height: 320px;
  padding: 24px 30px;
  max-width: 48.8%;
  flex: 1;
  display: flex;
  justify-content: flex-start;
  background-position: center;
  align-items: center;
  cursor: pointer;
  div {
    width: 46%;
    > {
      span {
        font-size: 30px;
      }
      h3 {
        font-size: 35px;
        font-weight: 900;
      }
    }
  }
}
.offer-banner {
  .parent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    div.content {
      &.natural {
        @extend %main-banner-offer-style;
        background-image: url("@/assets/images/banana.jpg");
        div {
          > {
            span {
              color: #fff;
            }
            h3 {
              color: #fff;
            }
          }
        }
      }
      &.offer {
        @extend %main-banner-offer-style;
        background-image: url("@/assets/images/apricot.jpg");
        div {
          > {
            span {
              color: $green-sheen;
            }
            h3 {
              color: $arapawa;
            }
          }
        }
      }
    }
  }
}

// media
@media (max-width: 1120px) {
  %main-banner-offer-style {
    height: 280px;
    div {
      width: 80%;
      > {
        h3 {
          font-weight: 700;
        }
      }
    }
  }
}
@media (max-width: 959px) {
  %main-banner-offer-style {
    height: 240px;
    max-width: 48.8%;
    div {
      width: 90%;
      > {
        span {
          font-size: 24px;
        }
        h3 {
          font-size: 29px;
        }
      }
    }
  }
}
@media (max-width: 750px) {
  %main-banner-offer-style {
    min-height: 250px;
    min-width: 80%;
  }
  .parent {
    flex-direction: column;
    row-gap: 24px;
  }
}
@media (max-width: 600px) {
  %main-banner-offer-style {
    min-width: 100%;
    div {
      width: 80%;
    }
  }
}
</style>
