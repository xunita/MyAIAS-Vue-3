<script setup lang="ts">
import MyAIASMessage from './MyAIASMessage.vue';
import { useMyAIAS } from '@/composables/useMyAIAS';
const { messages } = useMyAIAS()
</script>
<template>
  <div class="w-full h-full">
    <div
      v-if="messages.size === 0"
      class="flex flex-col items-center justify-center w-full h-full p-4"
    >
      <img
        v-motion-slide-visible-once-right
        :initial="{
          translateY: 5,
        }"
        :enter="{
          translateY: -5,
          transition: {
            repeat: Infinity,
            stiffness: 50,
            mass: 50,
            repeatType: 'mirror',
          },
        }"
        src="@/assets/logo.png"
        alt="MyAIAS"
        class="h-10 w-10 drop-shadow-lg"
      />
    </div>
    <div
      v-else
      class="flex flex-col w-ful h-full space-y-4 overflow-y-auto TEA-router-view2 p-4"
      id="chatMyAIAS"
    >
      <MyAIASMessage
        v-for="msg of messages"
        :key="msg + 'msg'"
        class="max-w-96"
        :message="msg[1]"
      />
    </div>
  </div>
</template>
