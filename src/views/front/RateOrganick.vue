<template>
  <BannerSection title="Rate Organick" />
  <v-container class="open-sans mt-8">
    <div class="max-w-xl mx-auto p-4">
      <v-row v-if="!success">
        <v-col cols="12" sm="10" md="8" lg="7" class="text-center mx-auto">
          <h2 class="text-h4 font-semibold mb-4 roboto">Rate Your Experience with Organick</h2>
        </v-col>
        <v-col cols="12" sm="10" md="8" lg="7" class="text-center mb-4 mx-auto">
          <p class="text-grey">Your feedback helps us improve our services. Please take a moment to rate your
            experience.</p>
        </v-col>
        <v-col cols="12" sm="10" md="8" lg="6" class="text-left mb-4 mx-auto">
          <div class="mb-2">
            <label class="d-block mb-4 text-grey-darken-3">Site Rating:</label>
            <div class="flex space-x-1">
              <v-rating v-model="rating" half-increments hover length="5" size="26px" color="amber" />
            </div>
          </div>
          <div class="mb-4">
            <v-textarea variant="outlined" label="Comment (optional):" color="#525C60" no-resize v-model="comment"
              class="w-full rounded-md p-2" rows="4" placeholder="Write your feedback here..."></v-textarea>
          </div>
          <v-col cols="12" class="text-right">
            <button @click="submitFeedback" class="bg-green text-white px-4 py-2 rounded" :disabled="loading">
              {{ loading ? "Submitting..." : "Submit Feedback" }}
            </button>
          </v-col>
        </v-col>
      </v-row>
      <p v-if="success" class="text-green text-h4 my-12 text-center">Thank you! Your feedback has been submitted.</p>
    </div>
  </v-container>
</template>

<script setup>
import { useLoadingStore } from "@/stores/loading";
import { inject, onMounted } from "vue";
import ProductItem from "@/components/front/global/ProductItem.vue";
import BannerSection from "@/components/front/global/BannerSection.vue";

import { ref } from 'vue'
import axios from '@/axiosClient' // adjust path as needed
import { useRouter } from "vue-router";

const rating = ref(0)
const comment = ref('')
const loading = ref(false)
const success = ref(false)
const emitter = inject('emitter');
const router = useRouter();
const submitFeedback = async () => {
  if (rating.value === 0) {
    alert('Please select a rating before submitting your feedback.')
    return
  }

  loading.value = true
  try {
    await axios.post('/site-feedbacks', {
      rating: rating.value,
      comment: comment.value,
    }).then(response => {
      success.value = true
      rating.value = 0
      comment.value = '';
      emitter.emit('showAlert', response.data.message);
    });
  } catch (error) {
    console.error(error)
    alert('An error occurred while submitting your feedback.')
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  axios.get('/site-feedbacks/check-eligibility')
    .then(response => {
      if (!response.data.can_rate) {
        emitter.emit('showAlert', 'You are not eligible to rate the site');
        router.push('/');
      }
    })
    .catch(error => {
      console.error('Error checking eligibility:', error)
    }).finally(() => {
      useLoadingStore().stopLoading();
    });
  useLoadingStore().stopLoading();
});
</script>

<style lang="scss" scoped>
.text-h4 {
  color: $arapawa;
}
</style>
