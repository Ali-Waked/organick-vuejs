<template>
  <div class="dashboard-view">
    <div class="title-page position-relative">
      <PageTitle>
      </PageTitle>
    </div>
    <v-row class="mt-1" justify="center">
      <v-col cols="10" sm="6" md="4" lg="3" v-for="card in cards" :key="card.icon">
        <CardNumber :icon="card.icon" :title="card.title" :number="card.number" :theam="card.theam" />
      </v-col>
    </v-row>
  </div>
  <!-- <div class="d-flex mt-4 ga-4">
    <v-card>
      <v-card-title>Last Order</v-card-title>
    </v-card>
    <div class="flex-0-1">
      <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
  </div> -->
  <v-row>
    <v-col cols="12" md="7" lg="5" class="last-customer">
      <v-hover v-slot="{ isHovering, props }">
        <v-card v-bind="props"
          :class="['last-customer-card has-scroll', isHovering ? 'overflow-y-auto' : 'overflow-hidden']">
          <v-card-title class="d-flex justify-space-between align-center" style="background-color: rgb(0 0 0 / 17%)">
            <span class="text-h6 font-weight-bold d-inline-block ml-4 py-3">Last Registration Customer</span>
            <span class="see-more  d-flex align-center">
              <span>See More</span>
              <v-icon icon="mdi-chevron-double-right" size="14px"></v-icon>
            </span>
          </v-card-title>
          <template v-for="customer in data.last_customers_registered" :key="customer.id">
            <LastRegisteredCustomer :first-name="customer.first_name" :last-name="customer.last_name"
              :email="customer.email" :date="customer.created_at" :image="customer.avatar" />
          </template>
        </v-card>
      </v-hover>
    </v-col>
    <v-col cols="12" md="10" lg="7" class="order-city-char" v-if="chartData.labels.length > 0">
      <Bar :data="chartData" :options="chartOptions" />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="10" lg="5" class="order-city-char" v-if="chartData.labels.length > 0">
      <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
    </v-col>
    <v-col cols="12" md="7" lg="7" class="last-customer">
      <v-hover v-slot="{ isHovering, props }">
        <v-card v-bind="props"
          :class="['last-customer-card has-scroll', isHovering ? 'overflow-y-auto' : 'overflow-hidden']">
          <v-card-title class="d-flex justify-space-between align-center" style="background-color: rgb(0 0 0 / 17%)">
            <span class="text-h6 font-weight-bold d-inline-block ml-4 py-3">Last Orders Income</span>
            <span class="see-more  d-flex align-center">
              <span>See More</span>
              <v-icon icon="mdi-chevron-double-right" size="14px"></v-icon>
            </span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-row class="font-weight-bold text-uppercase mt-1" style="color: #274C5B">
                  <v-col cols="2">#No.</v-col>
                  <v-col cols="5">Email</v-col>
                  <v-col cols="3">Status</v-col>
                  <v-col cols="2" class="text-center">Action</v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="text-grey-lighten-4">
                <v-row v-for="order in data.last_order_incoming" :key="order.id">
                  <v-col cols="2">#{{ order.number }}</v-col>
                  <v-col cols="5">{{ order.customer.email }}</v-col>
                  <v-col cols="3">{{ order.status }}</v-col>
                  <v-col cols="2" class="position-relative">
                    <v-hover v-slot="{ isHovering, props }">
                      <span v-bind="props"
                        :class="['main-transition d-inline-block pa-2 rounded-circle position-absolute', isHovering ? 'bg-green-lighten-5' : '']"
                        style="left: 50%;top:50%;transform: translate(-50%,-50%)">
                        <v-icon icon="mdi-eye" color="green" class="cursor-pointer" />
                      </span>
                    </v-hover>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <pre>

          {{ data.last_order_incoming }}
        </pre>
        </v-card>
      </v-hover>
    </v-col>

  </v-row>
  <!-- <div class="flex-0-1">
    <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div> -->
  <pre>
  {{ data }}
</pre>
</template>

<script>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import CardNumber from "@/components/dashboard/global/CardNumber.vue";
import LastRegisteredCustomer from "@/components/dashboard/index/LastRegisteredCustomer.vue";
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
import axiosClient from '../../axiosClient';
import { Bar } from 'vue-chartjs';

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
  components: {
    Line, PageTitle, CardNumber, LastRegisteredCustomer,
    Bar,
  },
  data() {
    return {
      // chartData: {
      //   labels: ["January", "February", "March"],
      //   datasets: [{ data: [40, 20, 12] }],
      // },
      // chartOptions: {
      //   responsive: true,
      // },
      data: {},

      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Orders by City',
            backgroundColor: '#7EB693',
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
      }

    };
  },
  computed: {
    cards() {
      return [
        {
          title: "Active Categories",
          number: this.data?.category?.active_count || 0,
          icon: "mdi-shape-outline", // more category-specific
          theam: "text-green bg-green-lighten-5",
        },
        {
          title: "Archived Categories",
          number: this.data?.category?.archived_count || 0,
          icon: "mdi-archive-outline",
          theam: "text-orange bg-orange-lighten-5",
        },
        {
          title: "Active Products",
          number: this.data?.product?.active_count || 0,
          icon: "mdi-package-variant",
          theam: "text-green bg-green-lighten-5",
        },
        {
          title: "Archived Products",
          number: this.data?.product?.archived_count || 0,
          icon: "mdi-package-variant-closed",
          theam: "text-orange bg-orange-lighten-5",
        },
        {
          title: "Deleted Products",
          number: this.data?.product?.deleted_count || 0,
          icon: "mdi-delete-forever",
          theam: "text-red bg-red-lighten-5",
        },
        {
          title: "Publish News",
          number: this.data?.news?.published_count || 0,
          icon: "mdi-newspaper-variant",
          theam: "text-green bg-green-lighten-5",
        },
        {
          title: "Archived News",
          number: this.data?.news?.archived_count || 0,
          icon: "mdi-newspaper-remove",
          theam: "text-orange bg-orange-lighten-5",
        },
        {
          title: "Pending Orders",
          number: this.data?.order?.pinding_count || 0,
          icon: "mdi-timer-sand",
          theam: "text-orange bg-orange-lighten-5",
        },
        {
          title: "Processing Orders",
          number: this.data?.order?.processing_count || 0,
          icon: "mdi-cogs",
          theam: "text-blue bg-blue-lighten-5",
        },
        {
          title: "Shipped Orders",
          number: this.data?.order?.shipped_count || 0,
          icon: "mdi-truck-fast",
          theam: "text-green bg-green-lighten-5",
        },
        {
          title: "Out for Delivery Orders",
          number: this.data?.order?.out_for_delivery_count || 0,
          icon: "mdi-truck-delivery-outline",
          theam: "text-pink bg-pink-lighten-5",
        },
        {
          title: "Drivied Orders",
          number: this.data?.order?.drivied_count || 0,
          icon: "mdi-map-marker-check-outline",
          theam: "text-green bg-green-lighten-5",
        },
        {
          title: "Completed Orders",
          number: this.data?.order?.completed_count || 0,
          icon: "mdi-clipboard-check-outline",
          theam: "text-green bg-green-lighten-5",
        },
        {
          title: "Canceled Orders",
          number: this.data?.order?.canceled_count || 0,
          icon: "mdi-cancel",
          theam: "text-red bg-red-lighten-5",
        },
        {
          title: "Refunded Orders",
          number: this.data?.order?.refunded_count || 0,
          icon: "mdi-cash-refund",
          theam: "text-red-darken-2 bg-red-lighten-5",
        },
        {
          title: "Customers",
          number: this.data?.customer_count || 0,
          icon: "mdi-account-group-outline",
          theam: "text-green bg-green-lighten-5",
        },
        {
          title: "Team Moderators",
          number: this.data?.moderator_count || 0,
          icon: "mdi-shield-account-outline",
          theam: "text-blue bg-blue-lighten-5",
        },
        {
          title: "Drivers",
          number: this.data?.driver_count || 0,
          icon: "mdi-steering",
          theam: "text-pink bg-pink-lighten-5",
        },
        {
          title: "Subscribers",
          number: this.data?.subscriber_count || 0,
          icon: "mdi-email-newsletter",
          theam: "text-orange bg-orange-lighten-5",
        },
        {
          title: "Total Income",
          number: this.data?.total_incoming || 0,
          icon: "mdi-cash-multiple",
          theam: "text-purple bg-purple-lighten-5",
        },
      ]
    },
  },
  methods: {

  },
  mounted() {
    axiosClient.get('/dashboard').then(response => {
      this.data = response.data;
      const data = response.data.order_depended_city;
      this.chartData.labels = data.map(item => item.city);
      this.chartData.datasets[0].data = data.map(item => item.total);
    }).catch(error => {
      console.error("Error fetching dashboard data:", error);
    });
  }
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

.text-h6 {
  color: $arapawa;

  &span {
    +i {
      // color: $arapawa;
      font-size: 20px;
    }
  }
}

.last-customer {
  align-self: end;

  +.order-city-char {
    align-self: end;
  }

  .last-customer-card {
    height: 326px;
    overflow-y: auto;
  }
}

span.see-more {
  color: #616161;
  cursor: pointer;
  font-size: 12px;
  transition: 0.5s;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 2px;
    width: 0;
    background: blue;
    transition: 0.5s;
  }

  &:hover {
    color: blue;

    &::after {
      // width: 100%;
      width: calc(100% - 10px);
    }
  }
}
</style>
