<template>

  <v-row class="mt-8 cursor-default justify-center">
    <v-col cols="12" sm="10" :md="!authStore.isCustomer() || !product.canRate ? '10' : 6">
      <v-card elevation="0" v-if="product.feedbacks.length > 0">
        <v-card-title class="text-h6 title roboto">Customer Reviews</v-card-title>
        <v-divider length="250" class="mx-auto" />
        <v-list lines="two" class="customer-comments has-scroll">
          <v-list-item v-for="r in product.feedbacks" :key="r.id" :class="['py-4 feedback main-transition text-grey-lighten-3',
            r.customer?.id === authStore.user.id ? 'has-me' : '']">
            <template #prepend>
              <v-img :src="r.customer?.avatar" :alt="`${r.customer?.first_name} ${r.customer?.last_name}`" width="50"
                height="50" class="rounded-circle mr-4 text-capitailze" cover referrerpolicy="no-referrer" />
            </template>
            <template #title>
              <div class="d-flex justify-space-between roboto">
                <div class="d-flex align-center mb-2">
                  <span class="font-weight-medium mr-4 name">{{ r.customer?.first_name }} {{
                    r.customer?.last_name }}</span>
                  <v-rating readonly half-increments density="compact" length="5" color="amber" :model-value="r.rating"
                    size="14" style="font-size: 13px" class="mt-n1" />
                </div>
                <span class="text-caption text-grey">{{ dateFormat(r.created_at) }}</span>
              </div>
            </template>
            <template #subtitle>
              <div
                class="mt-1 line-clamp-2 text-sm text-ellipsis overflow-hidden text-left open-sans comment text-grey-darken-2"
                v-if="r.comment">
                {{
                  r.comment }}
              </div>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
      <v-card v-else class="pa-4 mb-8" elevation="0">
        <v-row class="text-center">
          <v-col cols="12">
            <h2 class="text-subtitle-1 title roboto">No reviews yet</h2>
            <p class="text-grey-darken-2" v-if="authStore.isCustomer() && product.canRate">Be the first to review this
              product.</p>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-divider vertical class="d-md-block d-none" v-if="authStore.isCustomer() && product.canRate" />
    <!-- v-if="product.canRate" -->
    <v-col cols="12" sm="10" md="6" v-if="authStore.isCustomer() && product.canRate">
      <v-card class="pa-4 mb-8" elevation="0">
        <h2 class="text-subtitle-1 mb-4 title roboto">
          <span>Rate this product</span>
          <v-divider length="220" class="mx-auto mt-1" />
        </h2>
        <v-row>
          <v-col cols="7" md="8">
            <v-textarea variant="outlined" color="#525C60" no-resize v-model="newRating.comment"
              label="Comment (optional)" rows="2" />
          </v-col>
          <v-col cols="5" md="4">
            <v-rating v-model="newRating.rating" half-increments hover length="5" size="26px" color="amber" />
          </v-col>
          <v-col cols="12" class="text-right roboto mt-n5 mt-sm-3">
            <v-btn :loading="saving" color="green" @click="submitRating" append-icon="mdi-send">
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { useAuthStore } from "@/stores/auth/auth";
import axiosClient from '@/axiosClient';
import formats from "@/mixins/formats";

const { capitalizeFirstLetter, dateFormat } = formats();

const authStore = useAuthStore();
const emitter = inject('emitter');

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});
// const isLoggedIn = computed(() => authStore.isAuth);

const newRating = ref({ rating: 0, comment: '' });
const saving = ref(false);

const submitRating = async () => {
  saving.value = true;
  try {
    // Assuming you have an API endpoint to submit ratings
    // await authStore.submitRating(product.id, newRating.value);
    axiosClient.post(`/send-feedback/${props.product.slug}`, newRating.value)
      .then(response => {
        const existingIndex = props.product.feedbacks.findIndex(
          f => f.customer?.id === response.data.feedback.customer?.id
        );

        if (existingIndex !== -1) {
          props.product.feedbacks.splice(existingIndex, 1, response.data.feedback);
        } else {
          props.product.feedbacks.unshift(response.data.feedback);
        }
        emitter.emit("showAlert", response.data.message);
        newRating.value.rating = 0;
        newRating.value.comment = '';
      });
  } catch (error) {
    console.error("Error submitting rating:", error);
  } finally {
    saving.value = false;
  }
};

// onMounted(() => {
//   if (authStore.isCustomer()) {
//     newRating.value.customer = {
//       id: authStore.user.id,
//       first_name: authStore.user.first_name,
//       last_name: authStore.user.last_name,
//       avatar: authStore.user.avatar
//     };
//   }
// })
</script>

<style lang="scss" scoped>
.title {
  font-size: 22px !important;
  font-weight: 500;
  color: $arapawa;
}

.name {
  color: $arapawa;
}

.comment {
  line-height: 1.4;
  // font-size: 14px;
}

// .backgound {
//   // content: '';
//   position: absolute;
//   left: 0;
//   top: 0;
//   translate: 0.3s;
//   background-color: currentColor;
//   height: 100%;
//   width: 100%;
//   z-index: -1;
// }

.feedback {
  position: relative;

  &:hover {
    background-color: currentColor;
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid currentColor;
  }

  &.has-me {
    border: 2px solid rgba(17, 17, 223, 0.507);
    //border-radius: 4px !important;
    background-color: currentColor;
  }

  // &:hover ::after {
  //   width: 100%;
  // }

}

.customer-comments {
  max-height: 450px;
  // background: red;
}
</style>