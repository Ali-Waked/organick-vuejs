<template>
  <div class="portfolio-details position-relative">
    <!-- <img src="@" alt="image" /> -->
    <div class="image"></div>
    <v-container>
      <div
        class="details d-flex align-stretch justify-center flex-column flex-md-row elevation-12 rounded-xl"
      >
        <div class="px-14 py-10 d-flex flex-column justify-center">
          <h2 class="title roboto">Black Raspberry</h2>
          <p class="open-sans">
            Established fact that a reader will be distracted by the readable
            content of a page when looking a layout. The point of using Lorem
            Ipsum is that it has a more-or-less normal distribution of letters,
            as opposed
          </p>
        </div>
        <ul class="pl-14 py-10">
          <li>
            <span class="roboto">Date<v-spacer></v-spacer>:</span>
            <span class="open-sans">December 4, 2022</span>
          </li>
          <li>
            <span class="roboto">Client<v-spacer></v-spacer>:</span>
            <span class="open-sans">Kevin Martin</span>
          </li>
          <li>
            <span class="roboto">Category<v-spacer></v-spacer>:</span>
            <span class="open-sans">Agriculture , Eco</span>
          </li>
          <li>
            <span class="roboto">Service<v-spacer></v-spacer>:</span>
            <span class="open-sans">Organic Products</span>
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="paragrph">
          <h3 class="paragraph-title roboto">About The Farm:</h3>
          <p class="open-sans">
            t is a long established fact that a reader will be distracted by the
            readable content of a page when looking a layout. The point of using
            Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here', making it
            look like readable English.
            <br />
            <br />
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and auncover many web sites still
            in their infancy. Various versions have evolved over the years
          </p>
        </div>
        <div class="image">
          <figure>
            <img src="@/assets/images/the-organic-products.png" alt="" />
            <figcaption class="open-sans">The Organic Products</figcaption>
          </figure>
        </div>
        <div class="paragrph">
          <h3 class="paragraph-title roboto">How To Farm:</h3>
          <p class="open-sans">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking a layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution
            of letters, as opposed to using 'Content here, content here', making
            it look like readable English. <br />
            <br />
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and auncover many web sites still
            in their infancy. Various versions have evolved over the years
          </p>
        </div>
        <div class="paragrph">
          <h3 class="paragraph-title roboto">Conclusion:</h3>
          <p class="open-sans">
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
      </div>
    </v-container>
  </div>
</template>
<script setup></script>

<style lang="scss">
.portfolio-details {
  > .image {
    height: 70vh;
    background-image: url("@/assets/images/single-protifolio.png");
    background-size: cover;
  }
  .details {
    margin-top: -170px;
    overflow: hidden;
    height: 300px;
    div {
      background-color: #fff;
      width: 60%;
      h2 {
        color: $arapawa;
        font-weight: 900;
        font-size: 50px;
      }
      p {
        color: $altamira;
        font-size: 15px;
        margin-top: 12px;
        line-height: 1.8;
      }
    }
    ul {
      width: 40%;
      background-color: #fafafa;
      display: flex;
      //   align-items: center;
      justify-content: center;
      flex-direction: column;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 6px;
        span.roboto {
          width: 120px;
          color: $arapawa;
          display: flex;
          align-items: center;
          font-weight: 500;
          font-size: 20px;
        }
        span.open-sans {
          color: $altamira;
          font-size: 15px;
          margin-left: 12px;
          flex: 1;
        }
      }
    }
    @media (max-width: 959px) {
      height: fit-content;
      margin-top: -250px;
      div {
        width: 100%;
        h2 {
          font-size: 45px;
        }
      }
      ul {
        width: 100%;
      }
    }
    @media (max-width: 599px) {
      div {
        h2 {
          font-size: 30px;
        }
      }
    }
  }
  .content {
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    .paragrph {
      margin: 40px 0;
      h3 {
        color: $arapawa;
        font-size: 32px;
        font-weight: 900;
      }
      p {
        color: $altamira;
        margin-top: 12px;
      }
      @media (max-width: 959px) {
        h3 {
          font-size: 28px;
        }
      }
      @media (max-width: 599px) {
        h3 {
          font-size: 22px;
        }
        p {
          font-size: 14px;
        }
      }
    }
    img {
      border-radius: 24px;
      max-width: 100%;
    }
    figcaption {
      color: $altamira;
      font-size: 14px;
      text-align: center;
      margin-top: 4px;
    }
    @media (max-width: 599px) {
      max-width: 90%;
    }
  }
}
</style>
