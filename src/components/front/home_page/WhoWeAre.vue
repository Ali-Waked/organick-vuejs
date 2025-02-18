<template>
  <div class="who-we-are">
    <v-row>
      <v-col cols="12" lg="6" class="pb-1">
        <div class="image">
          <img src="@/assets/images/who-we-are.jpg" alt="" />
        </div>
      </v-col>
      <v-col cols="12" lg="6" class="position-relative col-tow">
        <div class="content-container">
          <HeaderSection
            header="Eco Friendly"
            title="Econis is a Friendly Organic Store"
          />
          <ul>
            <li>
              <span class="roboto">Start with Our Company First</span>
              <p class="open-sans">
                Sed ut perspiciatis unde omnis iste natus error sit voluptat
                accusantium doloremque laudantium. Sed ut perspiciatis.
              </p>
            </li>
            <li>
              <span class="roboto">Learn How to Grow Yourself</span>
              <p class="open-sans">
                Sed ut perspiciatis unde omnis iste natus error sit voluptat
                accusantium doloremque laudantium. Sed ut perspiciatis.
              </p>
            </li>
            <li>
              <span class="roboto">Farming Strategies of Today</span>
              <p class="open-sans">
                Sed ut perspiciatis unde omnis iste natus error sit voluptat
                accusantium doloremque laudantium. Sed ut perspiciatis.
              </p>
            </li>
          </ul>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import HeaderSection from "@/components/front/global/HeaderSection.vue";
</script>

<style scoped lang="scss">
.who-we-are {
  overflow: hidden;
  img {
    width: 100%;
    max-height: 100vh;
  }
  .content-container {
    position: relative;
    top: 50%;
    left: -60px;
    transform: translateY(-50%);
    padding: 40px 60px;
    border-radius: 12px;
    width: 95%;
    background-color: #fff;
    ul {
      margin-top: 16px;
      li {
        span {
          color: $arapawa;
          font-size: 22px;
          font-weight: 500;
        }
        p {
          color: $altamira;
          font-size: 15px;
        }
        &:not(:last-of-type) {
          margin-bottom: 16px;
        }
      }
    }
  }
}

// media
@media (max-width: 1120px) {
  .col-tow {
    height: 320px;
  }
  .who-we-are {
    // height: 850px;
    img {
      max-height: 90vh;
    }
    .content-container {
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%);
      width: 70%;
    }
  }
}
@media (max-width: 959px) {
  .who-we-are {
    .content-container {
      width: 86%;
    }
  }
}
@media (max-width: 599px) {
  .who-we-are {
    .content-container {
      width: 90%;
      ul {
        li {
          span {
            font-size: 18px;
          }
          p {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>
