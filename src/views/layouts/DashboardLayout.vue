<template>
  <DashboardLayout>
    <RouterView />
    <div class="alert"></div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "@/components/dashboard/global/layout/DashboardLayout.vue";
// import Echo from "laravel-echo";
import axiosClient from "@/axiosClient";
import { inject, onMounted, onUnmounted } from "vue";

// export default {
//   data: () => ({
//     //   Toast: this.$swal.mixin({
//     //     toast: true,
//     //     position: "top-end",
//     //     showConfirmButton: false,
//     //     timer: 3000,
//     //     timerProgressBar: true,
//     //     didOpen: (toast) => {
//     //       toast.onmouseenter = this.$swal.stopTimer;
//     //       toast.onmouseleave = this.$swal.resumeTimer;
//     //     },
//     //   }),
//   }),
//   inject: ["emitter"],
//   components: { DashboardLayout },
//   methods: {
//     toast() {
//       return this.$swal.mixin({
//         toast: true,
//         position: "top-end",
//         showConfirmButton: false,
//         timer: 5000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.onmouseenter = this.$swal.stopTimer;
//           toast.onmouseleave = this.$swal.resumeTimer;
//         },
//       });
//     },
//     showAlert(type, title) {
//       // Use sweetalert2
//       // this.$swal("Hello Vue world!!!");
//       this.toast().fire({
//         icon: type,
//         title: title,
//       });
//     },
//   },

//   mounted() {
//     // const successMessage = sessionStorage.getItem("alert-success");
//     // if (successMessage) {
//     //   this.showAlert("success", successMessage);
//     //   sessionStorage.removeItem("alert-success");
//     // }

//   },
// };

const Echo = inject("Echo");
const categoryCreated = Echo.private("category.created");
categoryCreated.listen(".category.created", (data) => {
  console.log("EventOne received:", data);
});
onMounted(() => {
  // axiosClient.get("/dashboard").then((respones) => {
  //   console.log(respones);
  // });
});
// const Echo = inject("Echo");
// const categoryCreated = Echo.channel(
//   "Illuminate.Notifications.AnonymousNotifiable"
// );
// categoryCreated.listen(
//   "Illuminate\\Notifications\\Events\\BroadcastNotificationCreated",
//   (data) => {
//     console.log("EventOne received:", data);
//   }
// );
// onUnmounted(() => {
//   Echo.leave("category.created");
// });

// const created = Echo.channel("created");
// created.listen("write", () => console.log("wirt"));
// // this.emitter.on("alert", (data) => {
//   // console.log(data);
//   this.showAlert(data[0], data[1]);
// });
</script>
