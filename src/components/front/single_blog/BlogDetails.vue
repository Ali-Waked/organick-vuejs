<!-- eslint-disable prettier/prettier -->
<template>
  <div class="portfolio-details position-relative">
    <!-- <img src="@" alt="image" /> -->
    <div class="image"></div>
    <v-container>
      <div
        class="details elevation-12 rounded-xl d-flex flex-column justify-center bg-white"
      >
        <ul
          class="d-flex px-14 roboto gc-6 flex-column flex-sm-row gr-1 gr-sm-0 align-start align-sm-center pt-10"
        >
          <li>
            <span>Posted On: </span> <span class="date">January 6, 2022</span>
          </li>
          <li class="d-flex align-center gc-1">
            <span><v-icon icon="mdi-account" color="#7EB693"></v-icon></span>
            <span class="auth">By Rachi Card</span>
          </li>
        </ul>
        <div class="px-14 pb-10 d-flex flex-column justify-center">
          <h2 class="title roboto">Research More Organic Food</h2>
          <p class="open-sans">
            Established fact that a reader will be distracted by the readable
            content of a page when looking a layout. The point of using Lorem
            Ipsum is that it has a more-or-less normal distribution of letters,
            as opposed
          </p>
        </div>
      </div>
      <div class="content">
        <div class="paragrph">
          <p class="open-sans">
            Uniquely matrix economically sound value through cooperative
            technology. Competently parallel task fully researched data and
            enterprise process improvements. Collaboratively expedite quality
            manufactured products via client-focused results quickly communicate
            enabled technology and turnkey leadership skills. Uniquely enable
            accurate supply chains rather than friction technology.
          </p>
        </div>
        <div class="paragrph">
          <h3 class="paragraph-title roboto">Preferred Form of Vitamin D?</h3>
          <p class="open-sans">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking a layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution
            of letters, as opposed to using 'Content here, content here', making
            it look like readable English.
          </p>
          <ul style="list-style-type: disc">
            <li>
              Publishing packages and web pageLorem Ipsum as their default
            </li>
            <li>Content here, content here', making it look like readable</li>
            <li>Packages and web pageLorem Ipsum as their default</li>
          </ul>
          <q class="open-sans">
            The first rule of any organic used in a business is that nature
            applied to an efficient operation will magnify the efficiency. The
            second is that organic applied to an inefficient operation will
            magnify the health.
          </q>
        </div>
        <div class="paragrph">
          <h3 class="paragraph-title roboto">
            Make perfect organic product with us
          </h3>
          <p class="open-sans">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking a layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution
            of letters, as opposed to using 'Content here, content here', making
            it look like readable English.
          </p>
          <ol class="open-sans">
            <li>
              Publishing packages and web pageLorem Ipsum as their default
            </li>
            <li>Content here, content here', making it look like readable</li>
            <li>Packages and web pageLorem Ipsum as their default</li>
            <li>more-or-less normal distribution of letters</li>
          </ol>
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
    background-image: url("@/assets/images/single-blog.png");
    background-size: cover;
    background-position: center;
  }

  .details {
    margin-top: -170px;
    overflow: hidden;
    height: 300px;
    > ul {
      li {
        span {
          color: $arapawa;
          font-size: 14px;
          &:first-of-type {
            font-weight: bold;
          }
        }
      }
    }
    div {
      background-color: #fff;
      width: 100%;

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

    @media (max-width: 959px) {
      // height: fit-content;
      // margin-top: -250px;

      div {
        width: 100%;

        h2 {
          font-size: 33px;
        }
      }
    }

    @media (max-width: 599px) {
      div {
        h2 {
          font-size: 23px;
          word-wrap: nowrap;
        }
      }
    }
  }

  .content {
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    ul,
    ol {
      color: $altamira;
      font-size: 15px;
      margin: 24px 0;
      margin-left: 32px;
      li {
        // list-style-type: disc;
        margin: 12px 0;
      }
    }
    q {
      color: $arapawa;
      font-size: 20px;
      font-weight: bold;
      background-color: #f1edea;
      text-align: center;
      padding: 60px 40px;
      display: block;
      border-radius: 24px;
      @media (max-width: 599px) {
        padding: 20px;
        font-size: 15px;
        line-height: 1.8;
      }
    }

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
