<script setup lang="ts">
import { inject, ref } from 'vue'
import MyAIAS from './MyAIAS.vue'
import { onClickOutside } from '@vueuse/core'
const myAIAS = ref(null)
const chatOpened = inject('chatOpened', ref(false))
const toggleChat = () => (chatOpened.value = !chatOpened.value)
onClickOutside(myAIAS, (event) => {
  chatOpened.value = false
})
</script>
<template>
  <div ref="myAIAS" class="flex flex-col items-center justify-center w-hull h-full">
    <button
      v-if="!chatOpened"
      v-motion-slide-visible-once-right
      :initial="{
        translateY: 3,
      }"
      :enter="{
        translateY: -3,
        transition: {
          repeat: Infinity,
          stiffness: 50,
          mass: 50,
          repeatType: 'mirror',
        },
      }"
      @click="toggleChat"
      class="p-1 rounded-full relative !z-[100] pointer-events-auto"
    >
      <img src="@/assets/logo.png" alt="MyAIAS" class="h-8 w-8 drop-shadow-lg" />
    </button>

    <MyAIAS
      v-if="chatOpened"
      v-motion-slide-visible-right
      class="bg-white bg-dark-theme border rounded-lg shadow-lg w-full h-full pointer-events-auto"
    />
  </div>
</template>
