<template>
  <div class="content-of-service section-padding">
    <v-container>
      <div class="image text-center">
        <img
          src="@/assets/images/single_service/organick-store-service.png"
          alt="organick store service"
        />
      </div>
      <div class="content mx-auto">
        <div class="my-12">
          <h2 class="title roboto">Organic Store Services</h2>
          <p class="text open-sans">
            t is a long established fact that a reader will be distracted by the
            readable content of a page when looking a layout. The point of using
            Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here', making it
            look like readable English. <br />
            <br />
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and auncover many web sites still
            in their infancy. Various versions have evolved over the years
          </p>
        </div>
        <div class="box d-flex justify-center align-center ga-4 mb-8">
          <img
            src="@/assets/images/single_service/orgainck-service.jpg"
            alt=""
          />
          <div class="text">
            <h4 class="title roboto">Why Organic</h4>
            <p class="open-sans">
              Sed ut perspiciatis unde omnis iste natus error sit voluptat. page
              editors now use Lorem Ipsum as their default model text, and
              auncover.
            </p>
          </div>
        </div>
        <div class="box d-flex justify-center align-center ga-4">
          <div class="text">
            <h4 class="title roboto">Speciality Produce</h4>
            <p class="open-sans">
              Sed ut perspiciatis unde omnis iste natus error sit voluptat. page
              editors now use Lorem Ipsum as their default model text, and
              auncover.
            </p>
          </div>
          <img
            src="@/assets/images/single_service/service-orgaincik.jpg"
            alt=""
            class="flex-1"
          />
        </div>
        <div class="mt-12 mb-9">
          <h4 class="title roboto">We farm your land</h4>
          <p class="text open-sans">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking a layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution
            of letters, as opposed to using 'Content here, content here', making
            it look like readable English.
          </p>
        </div>
        <div class="roboto d-flex align-center ga-6">
          <div
            class="d-flex align-center py-2 pr-9 rounded-pill"
            style="background-color: #f9f8f8"
          >
            <span class="counter ml-2">01</span>
            <span class="ml-2">Best quality support</span>
          </div>
          <div
            class="d-flex align-center py-2 pr-9 rounded-pill"
            style="background-color: #f9f8f8"
          >
            <span class="counter ml-2">02</span>
            <span class="ml-2">Money back guarantee</span>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup></script>
<style lang="scss">
.content-of-service {
  .image {
    margin-top: 32px;
    max-height: 580px;
    overflow: hidden;
    img {
      max-width: 100%;
    }
  }
  .content {
    max-width: 70%;
    h2.title {
      color: $arapawa;
      font-size: 45px;
      font-weight: 900;
    }
    p.text {
      color: $altamira;
      font-size: 15px;
      margin-top: 12px;
    }
    .box {
      height: 190px;
      img {
        border-radius: 16px;
        height: 100%;
      }
      .text {
        background-color: $cultured;
        padding: 40px;
        border-radius: 16px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        h4 {
          color: $arapawa;
          font-size: 22px;
          font-weight: 600;
          margin-top: 6px;
        }
        p {
          color: $altamira;
          font-size: 15px;
          max-width: 96%;
        }
      }
    }
    h4.title {
      color: $arapawa;
      font-size: 30px;
      font-weight: bold;
      + p {
        color: $altamira;
        font-size: 15px;
      }
    }
    div {
      span {
        &.counter {
          background-color: $green-sheen;
          color: #fff;
          font-weight: bold;
          font-size: 22px;
          width: 50px;
          height: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          + span {
            color: $arapawa;
            font-size: 22px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
