<template>
  <!-- <v-container> -->
  <v-row class="position-relative mb-n12">
    <v-col cols="4" class="conversation-list pa-0 mt-n2 border">
      <v-list two-line class="bg-transparent pa-0">
        <v-subheader class="roboto active-conversations bg-blue-darken-1">Active Conversations</v-subheader>
        <v-list-item v-for="conv in conversations" :key="conv.id" :active="conv.id === selectedConversation?.id"
          @click="selectConversation(conv)" class="list-item-link">
          <template #prepend>
            <v-avatar size="46" class="rounded overflow-hidden" tile>
              <v-img :src="conv.avatar" alt="customer photo" aspect-ratio="1" contain class="customer-photo" />
            </v-avatar>
          </template>
          <v-list-item-content>
            <v-list-item-title class="name roboto">{{ conv.customer_name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ conv.last_message_excerpt || 'No messages yet' }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action-text class="date text-grey-lighten-1">{{ formatDate(conv.updated_at)
          }}</v-list-item-action-text>
        </v-list-item>
      </v-list>
    </v-col>

    <!-- Right Side: Chat Window -->
    <v-col cols="8" class="chat-window bg-white mt-n3 position-relative">
      <div v-if="selectedConversation">
        <h3 class="roboto chat-with">Chat with: {{ selectedConversation.customer_name }}</h3>

        <div ref="messagesContainer" class="messages-container has-scroll">
          <div v-if="loadingMore" class="loading text-center">
            <v-progress-circular indeterminate class="mb-2 text-grey"></v-progress-circular>
          </div>
          <div v-for="msg in messages" :key="msg.id" :class="{
            'my-message': msg.sender_id === userId,
            'other-message': msg.sender_id !== userId,
          }" class="message">
            <div class="message-sender text-capitalize">{{ msg.sender_name }}</div>
            <div class="message-text text-grey-darken-3">{{ msg.message }}</div>
            <div class="message-time text-right">{{ formatDate(msg.created_at) }}</div>
          </div>
        </div>

        <v-row class="mt-4 open-sans mb-12" justify="center" align="center" no-gutters>
          <v-col class="position-relative" cols="11">
            <input type="text" v-model="newMessage" placeholder="Type your message here..." @keyup.enter="sendMessage"
              :disabled="sending" variant="outlined" class=" position-absolute left-0 right-0" />
            <v-btn color="primary" :disabled="sending || !newMessage.trim()" @click="sendMessage"
              class="ml-2 elevation-0" height="40" width="120" rounded>
              {{ sending ? 'Sending...' : 'Send' }}
            </v-btn>
          </v-col>

        </v-row>
      </div>

      <div v-else>
        <p class="select-chat">Select a conversation to start chatting</p>
      </div>
      <LoadingProgressLinear v-if="loading" />
    </v-col>
  </v-row>
  <!-- </v-container> -->
  <!-- <pre>
  {{ conversations }}
</pre> -->
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import axios from '@/axiosClient'
import { useAuthStore } from '@/stores/auth/auth'
import { echo } from '@/echo'
import LoadingProgressLinear from '@/components/dashboard/global/LoadingProgressLinear.vue'

const messagesContainer = ref(null);
const userId = ref(null)
const authStore = useAuthStore()

const conversations = ref([])
const selectedConversation = ref(null)
const messages = ref([])
const newMessage = ref('')
const sending = ref(false)
const page = ref(1);
const totalPages = ref(1);
const loadingMore = ref(false);
const loading = ref(false);

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleString()
}

async function loadConversations() {
  try {
    const res = await axios.get('/dashboard/conversations?status=open')
    conversations.value = res.data
  } catch (e) {
    console.error('Failed to load conversations', e)
  }
}

// Load messages of selected conversation
async function loadMessages(reset = false) {
  if (!selectedConversation.value) return
  if (reset) {
    page.value = 1;
    messages.value = [];
  }
  if (page.value > totalPages.value) return;
  if (!loading.value) {
    loadingMore.value = true;
  }
  try {
    const res = await axios.get(`/dashboard/conversations/${selectedConversation.value.id}/messages`, {
      params: { page: page.value }
    })
    totalPages.value = res.data.last_page;

    // prepend older messages on scroll (for page > 1)
    if (page.value === 1) {
      messages.value = res.data.data;
    } else {
      messages.value = [...res.data.data, ...messages.value];
    }

    page.value++;
    if (page.value > 2) {
      const container = messagesContainer.value;
      if (container) {
        container.scrollTop = container.scrollHeight / page.value;
      }
    } else {
      scrollToBottom();
    }
  } catch (e) {
    console.error('Failed to load messages', e)
  } finally {
    loadingMore.value = false;
  }
}
function onScroll() {
  const container = messagesContainer.value;
  if (!container) return;

  if (container.scrollTop < 50 && !loadingMore.value && page.value <= totalPages.value) {
    loadMessages();
  }
}

async function selectConversation(conv) {
  loading.value = true;
  selectedConversation.value = conv
  messages.value = []

  await loadMessages(true);
  subscribeToConversation(conv.id)
  loading.value = false;
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

async function sendMessage() {
  if (!newMessage.value.trim() || !selectedConversation.value) return
  sending.value = true
  try {
    await axios.post(`/dashboard/conversations/${selectedConversation.value.id}/messages`, {
      message: newMessage.value.trim(),
    })
    newMessage.value = ''
    await loadMessages()
  } catch (e) {
    console.error('Failed to send message', e)
  } finally {
    sending.value = false
  }
}

let activeChannel = null
function subscribeToConversation(conversationId) {
  if (activeChannel) {
    echo.leave(activeChannel)
  }
  activeChannel = `conversation.${conversationId}`
  echo.private(activeChannel)
    .listen('.send.message', (data) => {
      messages.value.push(data)
      scrollToBottom()
    })
}
watch(selectedConversation, async (val) => {
  if (val) {
    await nextTick(); // wait for DOM update
    const container = messagesContainer.value;
    if (container) {
      container.addEventListener('scroll', onScroll);
      console.info('Scroll listener added');
    } else {
      console.warn('messagesContainer still not found');
    }
  }
});

onMounted(async () => {
  userId.value = authStore.user.id;
  await loadConversations();
})

onBeforeUnmount(() => {
  if (activeChannel) {
    echo.leave(activeChannel)
  }
})
</script>

<style lang="scss" scoped>
.conversation-list {
  height: calc(100vh - 100px);
  // background-color: #fff;
  position: relative;
  left: -5px;
  top: -4px;
}

.active-conversations {
  color: $arapawa;
  color: #fff;
  padding: 16px;
  // background-color: #0000ff9c;
  background-color: $green-sheen !important;
  display: block;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}

.chat-with {
  color: $arapawa;
}

.list-item-link:not(:last-of-type) {
  border-bottom: 1px solid #e0e0e0;
}

.messages-container {
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 8px;
}

.my-message {
  background-color: #d1ffd1;
  // text-align: right;
  // text-transform: capitalize;
  margin-bottom: 6px;
  padding: 6px 12px;
  border-radius: 10px;
}

.other-message {
  background-color: #f0f0f0;
  // text-transform: capitalize;
  text-align: left;
  margin-bottom: 6px;
  padding: 6px 12px;
  border-radius: 10px;
}

.message-sender {
  font-weight: 600;
  font-size: 0.85em;
  color: $arapawa;
  margin-bottom: 2px;
}

.message-text {
  font-size: 1em;
  white-space: pre-wrap;
}

.message-time {
  font-size: 0.7em;
  color: #666;
  margin-top: 2px;
}

.customer-photo {
  border-radius: 50%;
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

.select-chat {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 1.2em;
  height: calc(100vh - 150px);
  ;
}

.date {
  font-size: 10px;
  text-align: right;
  display: block;
}

.name {
  color: $arapawa;
  font-weight: 500;
}
</style>
