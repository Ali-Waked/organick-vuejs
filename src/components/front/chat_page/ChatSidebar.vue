<template>
  <v-list>
    <v-subheader>Conversations</v-subheader>
    <v-list-item v-for="conv in conversations" :key="conv.id" :active="conv.id === selectedConversation?.id"
      @click="$emit('select', conv)" class="cursor-pointer">
      <v-list-item-avatar>
        <v-icon>mdi-account-circle</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          {{ conv.customer.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          Moderators: {{conv.moderators.map(m => m.name).join(', ') || 'None'}}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="!conversations.length">
      <v-list-item-content>No conversations found.</v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  conversations: Array,
  selectedConversation: Object,
})

const emit = defineEmits(['select'])
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
