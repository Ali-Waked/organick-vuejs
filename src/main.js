import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

// mitt
import mitt from "mitt";
const emitter = mitt();

// pinia
import { createPinia } from "pinia";

// mdi font
import "@mdi/font/css/materialdesignicons.css";

// swiper
import "swiper/css";
import "swiper/css/pagination";
// // i18n
// import { createI18n } from "vue-i18n";
// // import en from "./lang/en.json";
// import ar from "./lang/ar.json";

// const i18n = createI18n({
//   locale: "en",
//   // fallbackLocale: "en",
//   messages: {
//     // en,
//     // ar,
//   },
//   missing: (locale, key) => {
//     // Provide a default message for missing keys
//     return key;
//   },
// });

// CROPT JS
// import VueCryptojs from 'vue-cryptojs'

// import sweetalert
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useAuthStore } from "./stores/auth/auth";
// import Pusher from "pusher-js";

// console.log(import.meta.env.PUSHER_APP_KEY, import.meta.env.PUSHER_APP_SECRET);

// import mavonEditor from "mavon-editor";
// import "mavon-editor/dist/css/index.css";
const app = createApp(App);
app.use(createPinia());
const authStore = useAuthStore();
await authStore.checkAuth();
app.use(router);
app.use(vuetify);
// app.use()

app.provide("emitter", emitter);
// var pusher = "";
// import axios from "axios";

// await axios.get("/sanctum/csrf-cookie").then((response) => {
//   pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
//     cluster: import.meta.env.VITE_PUSHER_APP_SECRET,
//     // channelAuthorization: {
//     //   endpoint: "http://localhost/broadcasting/auth",
//     // },
//     authEndpoint: "http://localhost/api/broadcasting/auth",
//     auth: {
//       headers: {
//         "X-CSRF-TOKEN": document
//           .querySelector('meta[name="csrf-token"]')
//           .getAttribute("content"), // Assuming you're storing the token in localStorage
//       },
//     },
//     encrypted: true,
//   });
// });
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// import axios from "axios";
// import axiosClient from "./axiosClient";
// axios.defaults.withCredentials = true;
// axios.defaults.withXSRFToken = true;
// window.Pusher = Pusher;
// const echo = new Echo({
//   broadcaster: "pusher",
//   cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//   encrypted: true,
//   key: import.meta.env.VITE_PUSHER_APP_KEY,
//   authorizer: (channel, options) => {
//     return {
//       authorize: (socketId, callback) => {
//         axiosClient
//           .post("/broadcasting/auth", {
//             socket_id: socketId,
//             channel_name: channel.name,
//           })
//           .then((response) => {
//             callback(false, response.data);
//           })
//           .catch((error) => {
//             callback(true, error);
//           });
//       },
//     };
//   },
// });
// // app.use(mavonEditor);
// app.provide("Echo", echo);
app.use(VueSweetalert2);
// app.use(i18n);
// app.config.globalProperties.loading = false;
// console.log("befor mounted this", authStore.isAuth);
app.mount("#app");

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
