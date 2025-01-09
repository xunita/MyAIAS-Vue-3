<script setup lang="ts">
import Message from '../../models/message';
const props = defineProps({
  message: {
    type: Message,
    required: true,
  },
})
</script>
<template>
  <div
    v-motion-fade
    v-if="message.sender"
    :class="{
      'self-start': message.isFromAI(),
      'self-end': message.isFromUser(),
    }"
    class="flex space-x-1.5"
  >
    <img
      v-if="message.isFromAI()"
      src="@/assets/logo.png"
      alt="MyAIAS"
      class="h-5 w-5 rounded-full"
    />
    <span
      class="text-[13px] rounded-md p-2"
      :class="{
        'bg-logo-color': message.isFromAI(),
        'bg-gray-100 dark:bg-gray-700/50': message.isFromUser(),
      }"
    >
      <div
        v-if="message.isThinking && message.isFromAI()"
        class="flex space-x-1 justify-center items-center pt-1"
      >
        <div class="h-1.5 w-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div
          class="h-1.5 w-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"
        ></div>
        <div class="h-1.5 w-1.5 bg-white rounded-full animate-bounce"></div>
      </div>
      <span
        v-else
        :class="{
          'text-white': message.isFromAI(),
        }"
        class="font-semibold text-[13px]"
        >{{ message.content }}</span
      >
    </span>
  </div>
</template>
