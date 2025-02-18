<template>
  <div class="dashboard-view">
    <div class="title-page position-relative">
      <PageTitle>
        <label for=""> time</label>
        <select class="select-time-period">
          <option>all time</option>
        </select>
      </PageTitle>
    </div>
    <v-row class="mt-1" justify="center">
      <v-col cols="10" sm="6" md="4" lg="3" v-for="card in cards">
        <!-- <v-card class="box text-blue bg-blue-lighten-5">
          <v-icon icon="mdi-food-apple"></v-icon>
          <div class="text-center">
            <span class="number roboto">20</span>
            <p class="roboto">Active Categories</p>
          </div>
        </v-card> -->
        <CardNumber
          :icon="card.icon"
          :title="card.title"
          :number="card.number"
          :theam="card.theam"
        />
      </v-col>
      <!-- <v-col cols="10" sm="6" md="4" lg="3">
        <v-card class="box text-green bg-green-lighten-5">
          <v-icon icon="mdi-food-apple"></v-icon>
          <div class="flex-1-1 text-center">
            <span class="number roboto">20</span>
            <p class="roboto">Active Products</p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="10" sm="6" md="4" lg="3">
        <v-card class="box text-orange bg-orange-lighten-5">
          <v-icon icon="mdi-newspaper"></v-icon>
          <div class="flex-1-1 text-center">
            <span class="number roboto">20</span>
            <p class="roboto">News</p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="10" sm="6" md="4" lg="3">
        <v-card class="box text-red bg-red-lighten-5">
          <v-icon icon="mdi-clipboard-arrow-down"></v-icon>
          <div class="flex-1-1 text-center">
            <span class="number roboto">20</span>
            <p class="roboto">Total Orders</p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="10" sm="6" md="4" lg="3">
        <v-card class="box text-pink bg-pink-lighten-5">
          <v-icon icon="mdi-account"></v-icon>
          <div class="flex-1-1 text-center">
            <span class="number roboto">20</span>
            <p class="roboto">Users</p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="10" sm="6" md="4" lg="3">
        <v-card class="box text-amber bg-amber-lighten-5">
          <v-icon icon="mdi-account"></v-icon>
          <div class="flex-1-1 text-center">
            <span class="number roboto">20</span>
            <p class="roboto">Subscribers</p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="10" sm="6" md="4" lg="3">
        <v-card class="box text-cyan bg-cyan-lighten-5">
          <v-icon icon="mdi-account"></v-icon>
          <div class="flex-1-1 text-center">
            <span class="number roboto">20</span>
            <p class="roboto">Completed Project</p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="10" sm="6" md="4" lg="3">
        <v-card class="box text-purple bg-purple-lighten-5">
          <v-icon icon="mdi-account"></v-icon>
          <div class="flex-1-1 text-center">
            <span class="number roboto">20</span>
            <p class="roboto">Total Income</p>
          </div>
        </v-card>
      </v-col> -->
    </v-row>
  </div>
  <div class="d-flex mt-4 ga-4">
    <v-card>
      <v-card-title>Last Order</v-card-title>
    </v-card>
    <div class="flex-0-1">
      <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
  </div>
  <v-card>
    <v-card-title>Last Registration Customer</v-card-title>
    <div class="box">
      <img src="@/assets/images/about/team1.jpg" alt="" />
      <div>
        <div>
          <span>Name</span>
          <span>Ali Waked</span>
        </div>
        <div>
          <span>Register Date</span>
          <span>Nov 3, 2024</span>
        </div>
      </div>
    </div>
  </v-card>
  <div class="flex-0-1">
    <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
  <!-- <Bar id="my-chart-id" :options="chartOptions" :data="chartData" /> -->
</template>

<script>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import CardNumber from "@/components/dashboard/global/CardNumber.vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

// ChartJS.register(
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   // LineElement,
//   // PointElement,
// );
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

export default {
  name: "BarChart",
  components: { Line, PageTitle, CardNumber },
  data() {
    return {
      chartData: {
        labels: ["January", "February", "March"],
        datasets: [{ data: [40, 20, 12] }],
      },
      chartOptions: {
        responsive: true,
      },
      cards: [
        {
          title: "Active Categories",
          number: 20,
          icon: "mdi-sitemap",
          theam: "text-blue bg-blue-lighten-5",
        },
        {
          title: "Archived Categories",
          number: 0,
          icon: "mdi-sitemap",
          theam: "text-orange bg-orange-lighten-5",
        },
        {
          title: "Active Products",
          number: 20,
          icon: "mdi-food-apple",
          theam: "text-green bg-green-lighten-5",
        },
        {
          title: "Archived Products",
          number: 20,
          icon: "mdi-food-apple",
          theam: "text-orange bg-orange-lighten-5",
        },
        {
          title: "Deleted Products",
          number: 20,
          icon: "mdi-food-apple",
          theam: "text-red bg-red-lighten-5",
        },
        {
          title: "publish blogs",
          number: 20,
          icon: "mdi-newspaper",
          theam: "text-orange bg-orange-lighten-5",
        },
        {
          title: "archived blogs",
          number: 20,
          icon: "mdi-newspaper",
          theam: "text-red bg-red-lighten-5",
        },
        {
          title: "Pending Orders",
          number: 20,
          icon: "mdi-clipboard-arrow-down",
          theam: "text-amber bg-amber-lighten-5",
        },
        {
          title: "Processing Orders",
          number: 20,
          icon: "mdi-clipboard-arrow-down",
          theam: "text-orange bg-orange-lighten-5",
        },
        {
          title: "Out for Delivery Orders",
          number: 20,
          icon: "mdi-clipboard-arrow-down",
          theam: "text-pink bg-pink-lighten-5",
        },
        {
          title: "Drivied Orders",
          number: 20,
          icon: "mdi-clipboard-arrow-down",
          theam: "text-green bg-green-lighten-5",
        },
        {
          title: "Completed Orders",
          number: 20,
          icon: "mdi-clipboard-arrow-down",
          theam: "text-green bg-green-lighten-5",
        },
        {
          title: "Canceled Orders",
          number: 20,
          icon: "mdi-clipboard-arrow-down",
          theam: "text-blue bg-blue-lighten-5",
        },
        {
          title: "Refuneded Orders",
          number: 20,
          icon: "mdi-clipboard-arrow-down",
          theam: "text-blue bg-blue-lighten-5",
        },
        {
          title: "Customers",
          number: 20,
          icon: "mdi-account",
          theam: "text-pink bg-pink-lighten-5",
        },
        {
          title: "Team Members",
          number: 20,
          icon: "mdi-account",
          theam: "text-pink bg-pink-lighten-5",
        },
        {
          title: "Team Modrators",
          number: 20,
          icon: "mdi-account",
          theam: "text-pink bg-pink-lighten-5",
        },
        {
          title: "Drivers",
          number: 20,
          icon: "mdi-account",
          theam: "text-pink bg-pink-lighten-5",
        },
        {
          title: "Subscribers",
          number: 20,
          icon: "mdi-account",
          theam: "text-amber bg-amber-lighten-5",
        },
        // {
        //   title: "Completed Project",
        //   number: 20,
        //   icon: "mdi-account",
        //   theam: "text-cyan bg-cyan-lighten-5",
        // },
        {
          title: "Total Income",
          number: 20,
          icon: "mdi-account",
          theam: "text-purple bg-purple-lighten-5",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.box {
  height: 140px;
  display: flex;
  align-items: center;
  column-gap: 30px;
  max-width: 320px;
  // justify-content: center;
  // border-bottom: 2px solid black;
  padding: 12px;
  i {
    font-size: 64px;
  }
  span.number {
    font-size: 46px;
  }
  p {
    font-size: 18px;
    font-weight: bold;
  }
}
.select-time-period {
  position: absolute;
  right: 120px;
  border: 1px solid $altamira;
  border-radius: 5px;
  padding: 2px 20px 4px 12px;
  display: inline-block;
  font-size: 14px;
  width: 120px;
  color: $arapawa;
  text-transform: capitalize;
  outline: none;
}
</style>
