<template>
  <v-card height="100%" class="d-flex flex-column">
    <v-toolbar flat>
      <v-toolbar-title>{{ conversation?.customer.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        Moderators:
        <span v-if="conversation?.moderators.length">
          {{conversation.moderators.map(m => m.name).join(', ')}}
        </span>
        <span v-else>None</span>
      </div>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card-text class="flex-grow-1 overflow-auto" style="max-height: 400px;">
      <div v-if="loading" class="text-center py-5">Loading messages...</div>
      <div v-else>
        <div v-for="msg in messages" :key="msg.id" :class="[
          'mb-3',
          msg.sender.id === userId ? 'text-end' : 'text-start'
        ]">
          <v-chip :color="msg.sender.id === userId ? 'primary' : 'grey lighten-3'"
            :text-color="msg.sender.id === userId ? 'white' : 'black'" class="max-w-75">
            <strong>{{ msg.sender.name }}</strong>: {{ msg.content }}
          </v-chip>
          <div class="text-caption text-muted">{{ new Date(msg.created_at).toLocaleString() }}</div>
        </div>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-text-field v-model="newMessage" label="Type a message" @keyup.enter="sendMessage" :disabled="sending" clearable
        class="flex-grow-1"></v-text-field>
      <v-btn color="primary" :loading="sending" @click="sendMessage">Send</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from '@/axiosClient' // adjust import

const props = defineProps({
  conversation: Object,
  userId: Number,
})

const newMessage = ref('')
const messages = ref([])
const loading = ref(false)
const sending = ref(false)

const fetchMessages = async () => {
  if (!props.conversation) return
  loading.value = true
  try {
    const res = await axios.get(`/conversations/${props.conversation.id}/messages`)
    messages.value = res.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const sendMessage = async () => {
  if (!newMessage.value.trim()) return

  sending.value = true
  try {
    const res = await axios.post(`/conversations/${props.conversation.id}/messages`, {
      content: newMessage.value.trim(),
    })
    messages.value.push(res.data)
    newMessage.value = ''
  } catch (e) {
    console.error(e)
  } finally {
    sending.value = false
  }
}

watch(() => props.conversation, () => {
  newMessage.value = ''
  messages.value = []
  fetchMessages()
})

onMounted(() => {
  fetchMessages()
})
</script>
