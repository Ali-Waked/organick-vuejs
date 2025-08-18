<template>
  <div class="dashboard-view">
    <div class="title-page position-relative">
      <PageTitle> </PageTitle>
    </div>
    <v-row
      :class="['mt-1 statistic position-relative', expanded ? 'view-all' : '']"
      justify="center"
    >
      <v-col
        cols="10"
        sm="6"
        md="4"
        lg="3"
        v-for="card in cards"
        :key="card.icon"
      >
        <CardNumber
          :icon="card.icon"
          :title="card.title"
          :number="card.number"
          :theam="card.theam"
        />
      </v-col>
    </v-row>
    <v-col cols="12">
      <div
        :class="[
          'position-relative right-0 show-more-botton',
          expanded ? 'red' : 'blue',
        ]"
        @click="expanded = !expanded"
      >
        {{ expanded ? "less show" : "show More" }}
        <v-icon
          :icon="
            expanded ? 'mdi-minus-circle-outline' : 'mdi-plus-circle-outline'
          "
          size="14px"
        />
      </div>
    </v-col>
  </div>

  <v-row justify="">
    <v-col cols="12" md="7" lg="8" class="last-order">
      <LastOrder :data="data.last_order_incoming" />
    </v-col>
    <v-col
      cols="12"
      md="10"
      lg="4"
      class="order-city-char"
      v-if="orderStatusChartData.labels.length > 0"
    >
      <Doughnut
        :data="orderStatusChartData"
        :options="orderStatusChartOptions"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col
      cols="12"
      md="10"
      lg="6"
      class="order-city-char"
      v-if="chartData.labels.length > 0"
      style="align-self: flex-end"
    >
      <Bar :data="chartData" :options="chartOptions" />
    </v-col>
    <v-col cols="12" md="7" lg="6" class="last-customer">
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          v-bind="props"
          :class="[
            'last-customer-card has-scroll',
            isHovering ? 'overflow-y-auto' : '',
          ]"
        >
          <v-card-title
            class="d-flex justify-space-between align-center"
            style="background-color: rgb(0 0 0 / 17%)"
          >
            <span class="text-h6 font-weight-bold d-inline-block ml-4 py-3"
              >Last Registration Customer</span
            >
            <span class="see-more d-flex align-center">
              <span>See More</span>
              <v-icon icon="mdi-chevron-double-right" size="14px"></v-icon>
            </span>
          </v-card-title>
          <template
            v-for="customer in data.last_customers_registered"
            :key="customer.id"
          >
            <LastRegisteredCustomer
              :first-name="customer.first_name"
              :last-name="customer.last_name"
              :email="customer.email"
              :date="customer.created_at"
              :image="customer.avatar"
            />
          </template>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="7" lg="8" class="last-customer">
      <LastNews :data="data.last_publish_news" />
    </v-col>
    <v-col
      cols="12"
      md="10"
      lg="4"
      class="order-city-char"
      v-if="paymentMethodChartData.labels.length > 0"
    >
      <Doughnut
        :data="paymentMethodChartData"
        :options="paymentMethodChartOptions"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="7" lg="6" class="last-customer">
      <LastSiteFeedback :data="data.last_site_feedback" />
    </v-col>
    <v-col
      cols="12"
      md="10"
      lg="6"
      v-if="ordersOverTimeChartData.labels.length > 0"
      style="align-items: stretch; align-self: flex-end"
    >
      <Line
        id="my-chart-id"
        :options="ordersOverTimeChartOptions"
        :data="ordersOverTimeChartData"
      />
    </v-col>
  </v-row>
  <!-- <div class="flex-0-1">
    <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div> -->
  <!-- <pre>
  {{ data }}
</pre
  > -->
</template>

<script>
import PageTitle from "@/components/dashboard/global/PageTitle.vue";
import CardNumber from "@/components/dashboard/global/CardNumber.vue";
import LastRegisteredCustomer from "@/components/dashboard/index/LastRegisteredCustomer.vue";
import LastOrder from "@/components/dashboard/index/LastOrder.vue";
import LastNews from "@/components/dashboard/index/LastNews.vue";
import { Line, Doughnut, Bar } from "vue-chartjs";
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
  ArcElement,
} from "chart.js";
import axiosClient from "../../axiosClient";
import LastSiteFeedback from "../../components/dashboard/index/LastSiteFeedback.vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement
);

export default {
  name: "BarChart",
  components: {
    Line,
    PageTitle,
    CardNumber,
    LastRegisteredCustomer,
    Bar,
    Doughnut,
    LastOrder,
    LastNews,
    LastSiteFeedback,
  },
  data() {
    return {
      data: {},
      expanded: false,

      chartData: {
        labels: [],
        datasets: [
          {
            label: "Orders by City",
            backgroundColor: "#ab47bc",
            data: [],
          },
        ],
      },
      ordersOverTimeChartData: {
        labels: [],
        datasets: [
          {
            label: "Orders Over Time",
            data: [],
            borderColor: "#42A5F5",
            backgroundColor: "rgba(66,165,245,0.2)",
            fill: true,
          },
        ],
      },
      orderStatusChartData: {
        labels: [],
        datasets: [
          {
            label: "Orders by Status",
            data: [],
            backgroundColor: [
              "#FFA726", // pending - orange
              "#42A5F5", // processing - blue
              "#66BB6A", // completed - green
              "#AB47BC", // driving - purple
              "#EF5350", // canceled - red
              "#FF7043", // refunded - dark orange
            ],
          },
        ],
      },
      paymentMethodChartData: {
        labels: [],
        datasets: [
          {
            label: "Orders by Status",
            data: [],
            backgroundColor: [
              "#66BB6A", // cod
              "#AB47BC", // stripe
              "#42A5F5", // paypal
            ],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          legend: { display: true },
        },
      },
      ordersOverTimeChartOptions: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Orders Over Time" },
        },
      },
      orderStatusChartOptions: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Orders by Status" },
        },
      },
      paymentMethodChartOptions: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Income by Payment Method" },
        },
      },
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
      ];
    },
  },
  methods: {},
  mounted() {
    axiosClient
      .get("/dashboard")
      .then((response) => {
        this.data = response.data;
        const data = response.data.order_depended_city;
        this.chartData.labels = data.map((item) => item.city);
        this.chartData.datasets[0].data = data.map((item) => item.total);

        this.ordersOverTimeChartData.labels = response.data.order_over_time.map(
          (item) => item.period
        );
        this.ordersOverTimeChartData.datasets[0].data =
          response.data.order_over_time.map((item) => item.total);

        this.orderStatusChartData.labels = response.data.order_by_status.map(
          (item) => item.status
        );
        this.orderStatusChartData.datasets[0].data =
          response.data.order_by_status.map((item) => item.total);

        this.paymentMethodChartData.labels =
          response.data.income_by_payment_method.map((item) => item.name);
        this.paymentMethodChartData.datasets[0].data =
          response.data.income_by_payment_method.map(
            (item) => item.total_income
          );
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
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

.text-h6 {
  color: $arapawa;

  &span {
    + i {
      // color: $arapawa;
      font-size: 20px;
    }
  }
}

.last-customer {
  align-self: end;

  + .order-city-char {
    align-self: start;
  }

  .last-customer-card {
    height: 326px;
    overflow-y: auto;
  }
}

.statistic {
  height: 166px;
  overflow: hidden;
  transition: 0.3s;

  &.view-all {
    height: 100%;
  }
}

.last-order {
  align-self: end;

  + .order-city-char {
    align-self: start;
  }

  .last-order-card {
    height: 358px;
    overflow-y: auto;
  }

  // .last-customer-card {
  //   height: 340px;
  //   overflow-y: auto;
  // }
}

span.see-more {
  color: #616161;
  cursor: pointer;
  font-size: 12px;
  transition: 0.5s;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    height: 2px;
    width: 0;
    background: #2196f3;
    transition: 0.5s;
  }

  &:hover {
    color: #2196f3;

    &::after {
      // width: 100%;
      width: calc(100% - 10px);
    }
  }
}

.news-row {
  border-bottom: 1px solid #525c6033;
  display: flex;
  align-items: center;
  position: relative;
  // font-size: 10px !important;

  &:not(:last-of-type) {
    border-bottom: 1px solid #525c6033;
    padding-bottom: 7px;
  }

  &::after {
    content: "";
    background-color: #99999914;
    position: absolute;
    transition: 0.5s;
    // left: 0%;
    right: 0px;
    top: 0%;
    // transform: translate(-50%, -50%);
    width: 0%;
    z-index: -1;
    height: 100%;
  }

  &:hover::after {
    width: 100%;
  }
}

.news {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  .box-content {
    margin-left: 140px;
    cursor: pointer;
  }

  // justify-content: center;
  .image {
    margin-right: 12px;
    // padding: 14px 0;
    height: 112px;

    img {
      width: 140px;
      position: absolute;
      left: 0;
      z-index: -1;
      top: 0;
      height: 106%;
    }

    + div {
      div {
        line-height: 1.6;

        span:first-of-type {
          font-size: 14px;
          text-transform: capitalize;
          margin-right: 8px;
          color: $arapawa;
          font-weight: 500;
        }

        span:last-of-type {
          color: rgb(39 76 91 / 54%);
        }
      }
    }
  }
}

.show-more-botton {
  width: fit-content;
  margin-left: auto;
  cursor: pointer;
  color: #61616152;
  font-size: 12px;
  top: -2px;
  transition: 0.3s;

  &.blue {
    &:hover {
      color: #2196f3;
    }
  }

  &.red {
    &:hover {
      color: #f44336;
    }
  }
}
</style>
