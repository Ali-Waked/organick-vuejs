<template>
  <div class="why-choose-us section-padding background-section">
    <v-container>
      <v-row>
        <v-col cols="12" lg="6">
          <div>
            <HeaderSection
              header="Why Choose Us"
              title="We do not buy from the open market & traders."
            />
          </div>
          <p class="open-sans">
            Simply dummy text of the printing and typesetting industry. Lorem
            had ceased to been the industry's standard dummy text ever since the
            1500s, when an unknown.
          </p>
          <ul>
            <li>
              <span class="roboto">100% Natural Product</span>
              <ul>
                <li class="open-sans">
                  Simply dummy text of the printing and typesetting industry
                  Lorem Ipsum
                </li>
              </ul>
            </li>
            <li>
              <span class="roboto"> Increases resistance</span>
              <ul>
                <li class="open-sans">
                  Filling, and temptingly healthy, our Biona Organic Granola
                  with Wild Berries is just the thing
                </li>
              </ul>
            </li>
          </ul>
        </v-col>
        <v-col cols="12" lg="6" class="d-none d-lg-block">
          <img
            src="@/assets/images/about/why-choose-us.jpg"
            alt="why choose us"
            class="why-choose-us-image"
          />
        </v-col>
      </v-row>
      <div>
        <ul class="details d-flex align-center justify-center ga-6">
          <li class="position-relative main-transition">
            <div
              class="icon position-relative d-flex align-center justify-center"
            >
              <img src="@/assets/images/icons/about/about-icon-one.png" />
            </div>
            <span class="title">Return Policy</span>
            <p>Simply dummy text of the printintypesetting industry.</p>
          </li>
          <li class="position-relative main-transition">
            <div
              class="icon position-relative d-flex align-center justify-center"
            >
              <img src="@/assets/images/icons/about/about-icon-two.png" />
            </div>
            <span class="title">100% Fresh</span>
            <p>Simply dummy text of the printintypesetting industry.</p>
          </li>
          <li class="position-relative main-transition">
            <div
              class="icon position-relative d-flex align-center justify-center"
            >
              <img src="@/assets/images/icons/about/about-icon-3.png" />
            </div>
            <span class="title">Support 24/7</span>
            <p>Simply dummy text of the printintypesetting industry.</p>
          </li>
          <li class="position-relative main-transition">
            <div
              class="icon position-relative d-flex align-center justify-center"
            >
              <img src="@/assets/images/icons/about/about-icon-three.png" />
            </div>
            <span class="title">Secured Payment</span>
            <p>Simply dummy text of the printintypesetting industry.</p>
          </li>
        </ul>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import HeaderSection from "@/components/front/global/HeaderSection.vue";
</script>

<style lang="scss" scoped>
.why-choose-us {
  p.open-sans {
    color: $altamira;
    font-size: 15px;
    margin: 12px 0 24px;
    + ul {
      li {
        margin-bottom: 24px;
        span {
          display: inline-block;
          font-size: 18px;
          font-weight: 500;
          color: $arapawa;
          padding: 16px 70px 16px 45px;
          border-radius: 45px;
          background-color: #ececec;
          position: relative;
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 3px solid $green-sheen;
          }
        }
        ul {
          li {
            color: $altamira;
            margin-left: 45px;
            max-width: 70%;
            margin-top: 12px;
          }
        }
      }
    }
  }
  ul.details {
    margin: 56px auto 0;
    max-width: 100%;
    flex-wrap: wrap;
    li {
      padding: 60px 20px;
      border-radius: 26px;
      max-width: 250px;
      text-align: center;
      background-color: #fff;
      &:hover {
        background-color: #274c5b09;
        cursor: default;
      }
      .icon {
        background-color: $cultured;
        border-radius: 16px;
        width: 80px;
        height: 80px;
        margin: auto;
        &::after {
          content: "";
          position: absolute;
          top: 22%;
          left: 52%;
          background-color: #fef1c2;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          z-index: 1;
        }
        img {
          z-index: 5;
        }
      }
      span.title {
        color: $arapawa;
        font-weight: bold;
        font-size: 22px;
        display: block;
        margin-top: 16px;
        margin-bottom: 12px;
      }
      p {
        color: $altamira;
        font-size: 15px;
      }
    }
  }
  img {
    &.why-choose-us-image {
      max-width: 100%;
      margin-left: 24px;
      border-radius: 28px;
      transform: translateY(40px);
    }
  }
}
</style>
