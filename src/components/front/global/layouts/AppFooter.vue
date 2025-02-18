<template>
  <v-footer :app="true" absolute>
    <div class="footer-app pt-8">
      <v-container>
        <v-row justify="stretch">
          <v-col cols="12" sm="6" md="3" class="order-1 order-md-0">
            <div class="contact-us position-relative">
              <h3 class="roboto">Contact Us</h3>
              <ul>
                <li class="open-sans">
                  <span class="title">Email</span>
                  <span
                    class="main-transition position-relative underline-on-hover cursor-pointer"
                    >needhelp@Organia.com</span
                  >
                </li>
                <li class="open-sans">
                  <span class="title">Phone</span>
                  <span
                    class="main-transition position-relative underline-on-hover cursor-pointer"
                    >666 888 888</span
                  >
                </li>
                <li class="open-sans">
                  <span class="title">Address</span>
                  <span
                    class="main-transition position-relative underline-on-hover cursor-pointer"
                    >88 road, borklyn street, USA</span
                  >
                </li>
              </ul>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="order-0 order-md-2">
            <div class="logo">
              <div class="d-flex justify-center align-center">
                <AppLogo width="35" height="40" />
                <span class="roboto">Organick</span>
              </div>
              <p class="text open-sans">
                Simply dummy text of the printing and typesetting industry.
                Lorem Ipsum simply dummy text of the printing
              </p>
              <!-- <ul class="d-flex justify-center align-center ga-2">
                <li>
                  <v-icon
                    class="main-transition"
                    icon="mdi-instagram"
                    style="--color-on-hover: #c13584"
                  ></v-icon>
                </li>
                <li>
                  <v-icon
                    class="main-transition"
                    icon="mdi-twitter"
                    style="--color-on-hover: #33ccff"
                  ></v-icon>
                </li>
                <li>
                  <v-icon
                    class="main-transition"
                    icon="mdi-facebook"
                    style="--color-on-hover: #3b5998"
                  ></v-icon>
                </li>
                <li>
                  <v-icon
                    class="main-transition"
                    icon="mdi-pinterest"
                    style="--color-on-hover: #910101"
                  ></v-icon>
                </li>
              </ul> -->
              <SocialMediaIcon
                :socials="{
                  facebook: 'https://facebook.com',
                  x: 'https://x.com',
                  instagram: 'https://instagram.com',
                  pinterest: 'https://pinterest.com',
                }"
                class="mt-12"
              />
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="3" class="order-3">
            <div class="utility-pages position-relative">
              <h3 class="roboto">Utility Pages</h3>
              <ul class="open-sans">
                <li>
                  <router-link
                    class="main-transition position-relative underline-on-hover"
                    to="/"
                    >Style Guide</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="main-transition position-relative underline-on-hover"
                    to="/"
                    >404 Not Found</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="main-transition position-relative underline-on-hover"
                    to="/"
                    >Password Protected</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="main-transition position-relative underline-on-hover"
                    to="/"
                    >Licences</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="main-transition position-relative underline-on-hover"
                    to="/"
                    >Changelog</router-link
                  >
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-divider
        color="#D4D4D4"
        class="mt-6 mt-sm-14 mb-4"
        width="100%"
      ></v-divider>
      <p class="copyright open-sans text-center">
        Copyright &copy; <strong>Organick</strong> | Designed by
        <strong>VictorFlow</strong> Templates - Powered by
        <strong>Webflow</strong>
      </p>
    </div>
  </v-footer>
</template>

<script setup>
import AppLogo from "@/components/front/svgs/icons/AppLogo.vue";
import SocialMediaIcon from "../SocialMediaIcon.vue";
</script>

<style lang="scss">
%after-style {
  content: "";
  width: 1px;
  height: calc(100% + 25px);
  background-color: $light-gray;
  position: absolute;
  top: 9px;
}
.footer-app {
  width: 100%;
  .contact-us {
    text-align: right;
    padding-right: 25px;
    h3 {
      font-weight: bold;
      font-size: 26px;
      color: $arapawa;
    }
    ul {
      margin-top: 16px;
      li {
        margin-top: 12px;
        span {
          color: $altamira;
          display: block;
          width: fit-content;
          margin-left: auto;
          &:last-of-type {
            &:hover {
              color: $green-sheen;
            }
          }
          &.title {
            font-weight: bold;
          }
        }
      }
    }
    &::after {
      @extend %after-style;
      right: 0px;
    }
  }
  .logo {
    text-align: center;
    padding-right: 25px;
    padding-left: 25px;
    span {
      color: $arapawa;
      font-size: 32px;
      font-weight: bold;
    }
    p.text {
      color: $altamira;
      margin-top: 12px;
    }
  }

  .utility-pages {
    text-align: left;
    padding-left: 25px;
    h3 {
      color: $arapawa;
      font-size: 26px;
      font-weight: bold;
    }
    ul {
      margin-top: 16px;
      li {
        a {
          color: $altamira;
          &:hover {
            color: $green-sheen;
          }
          &::after {
            left: 0%;
            transform: translateY(-50%);
          }
        }
        margin-bottom: 12px;
      }
    }
    &::after {
      @extend %after-style;
      left: 0px;
    }
  }
  .copyright {
    color: $arapawa;
  }
  @media (max-width: 959px) {
    .contact-us {
      text-align: left;
      ul {
        li {
          span {
            margin-left: unset;
            // margin-right: auto
          }
        }
      }
      &::after {
        display: none;
      }
    }
    .utility-pages {
      // text-align: center;
      &::after {
        // display: none;
      }
    }
  }
  @media (max-width: 600px) {
    // margin-top: 60px;
    .contact-us {
      text-align: center;
      margin-top: 12px;
      margin-bottom: 12px;
      padding: 0;
      ul {
        li {
          span {
            margin-left: auto;
            margin-right: auto;
          }
        }
      }
      &::after {
        display: none;
      }
    }
    .utility-pages {
      text-align: center;
      padding: 0;
      &::after {
        display: none;
      }
    }
  }
}
</style>
