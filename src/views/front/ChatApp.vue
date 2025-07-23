<template>
  <BannerSection title="Your Support Chat" />
  <v-container class="mt-8">
    <v-row class="open-sans" justify="center">
      <v-col cols="12" lg="7">
        <v-sheet ref="messagesContainer" height="60vh"
          class="pa-4 overflow-y-auto has-scroll rounded bg-grey-lighten-4 border" elevation="0"
          style="background-color: #f9f9f9;">
          <div v-for="msg in messages" :key="msg.id" :class="{
            'my-message bg-blue-lighten-2': msg.sender_id === userId,
            'other-message': msg.sender_id !== userId
          }" class="message pa-3 mb-3 rounded">
            <div class="message-sender font-weight-bold mb-1">{{ msg.sender_name }}</div>
            <div class="message-text">{{ msg.message }}</div>
            <div class="message-time text-caption text-end mt-1">{{ formatDate(msg.created_at) }}</div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row class="mt-4 open-sans mb-12" justify="center" align="center" no-gutters>
      <v-col class="position-relative" cols="12" lg="7">
        <input type="text" v-model="newMessage" placeholder="Type your message here..." @keyup.enter="sendMessage"
          :disabled="sending" variant="outlined" class=" position-absolute left-0 right-0" />
        <v-btn color="primary" :disabled="sending || !newMessage.trim()" @click="sendMessage" class="ml-2 elevation-0"
          height="40" width="120" rounded>
          {{ sending ? 'Sending...' : 'Send' }}
        </v-btn>
      </v-col>

    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import BannerSection from "@/components/front/global/BannerSection.vue"
import axios from '@/axiosClient'
import { useLoadingStore } from "@/stores/loading"
import { useAuthStore } from "@/stores/auth/auth"
import { echo } from '@/echo'

const authStore = useAuthStore()
const loadingStore = useLoadingStore()

const userId = ref(authStore.user?.id || null)
const conversationId = ref(null)
const messages = ref([])
const newMessage = ref('')
const sending = ref(false)
const messagesContainer = ref(null)

// 📌 Format timestamp to hh:mm
const formatDate = (datetime) => {
  const options = { hour: '2-digit', minute: '2-digit' }
  return new Date(datetime).toLocaleTimeString('en-US', options)
}

// 📩 Fetch conversation messages
const loadMessages = async () => {
  if (!conversationId.value) return

  try {
    const response = await axios.get(`/conversations/${conversationId.value}/messages`)
    messages.value = response.data
    scrollToBottom()
  } catch (error) {
    console.error('❌ Error loading messages:', error)
  }
}

// 📨 Send a message
const sendMessage = async () => {
  const content = newMessage.value.trim()
  if (!content || sending.value || !conversationId.value) return

  sending.value = true
  try {
    await axios.post(`/conversations/${conversationId.value}/messages`, { message: content })
    newMessage.value = ''
  } catch (error) {
    console.error('❌ Error sending message:', error)
  } finally {
    sending.value = false
  }
}

// 🔽 Auto scroll to latest message
const scrollToBottom = () => {
  nextTick(() => {
    const el = messagesContainer.value?.$el || messagesContainer.value
    if (el) el.scrollTop = el.scrollHeight
  })
}

// 🎧 Setup echo listener
const setupEcho = () => {
  echo.private(`conversation.${conversationId.value}`)
    .listen('.send.message', (data) => {
      messages.value.push(data)
      scrollToBottom()
    })
}

watch(conversationId, async (newId, oldId) => {
  if (!newId) return
  if (oldId) echo.leave(`conversation.${oldId}`)

  await loadMessages()
  setupEcho()
})

onMounted(async () => {
  // Optionally fetch or create conversation if not set
  if (!conversationId.value) {
    await axios.post('/conversations').then(res => {
      conversationId.value = res.data.id
    }).catch(err => {
      console.error('Error initializing conversation:', err)
    })
  }
  loadingStore.stopLoading();
})

onBeforeUnmount(() => {
  if (conversationId.value) {
    echo.leave(`conversation.${conversationId.value}`)
  }
})
</script>

<style scoped lang="scss">
h2 {
  color: $arapawa;
}

.my-message {
  background-color: #dcf8c6;
  align-self: flex-end;
  // max-width: 80%;
  margin-left: auto;
}

.other-message {
  background-color: #fff;
  align-self: flex-start;
  // max-width: 80%;
  border: 1px solid #ddd;
}

.message {
  word-wrap: break-word;
}

input[type="text"] {
  width: 100%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 200px;
  outline: none;
}

button {
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: 1000000;
}
</style>