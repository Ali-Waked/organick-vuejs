<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-btn :variant="isHovering ? 'flat' : 'outlined'" color="#4caf50" width="120" v-bind="props" append-icon="mdi-eye"
      :class="[isHovering ? 'elevation-2' : 'elevation-0']" @click="$emit('explore', news)">explore</v-btn>
  </v-hover>
  <v-hover v-slot="{ isHovering, props }">
    <v-btn :variant="isHovering ? 'flat' : 'outlined'" color="#ff9500" width="90" v-bind="props"
      :class="['', isHovering ? 'elevation-4 text-white' : 'elevation-0']" @click="$emit('edit', news)"
      append-icon="mdi-pen">eidt</v-btn>
  </v-hover>
  <v-hover v-slot="{ isHovering, props }">
    <v-btn :variant="isHovering ? 'flat' : 'outlined'" color="#f44336" width="110" v-bind="props"
      :class="[isHovering ? 'elevation-2' : 'elevation-0']" append-icon="mdi-delete-forever"
      @click="$emit('delete', news)">delete</v-btn>
  </v-hover>
</template>

<script setup>
defineProps({
  news: {
    type: Object,
    required: true,
  },
});
</script>
