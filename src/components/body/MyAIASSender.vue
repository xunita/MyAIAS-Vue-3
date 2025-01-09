<script setup lang="ts">
import { computed, ref } from 'vue'
import { askMyAIAS } from '@/controller/ask'
import { useMyAIAS } from '@/composables/useMyAIAS'
const { isThinking } = useMyAIAS()
const focused = ref(false)
const message = ref('')
const messageLength = computed(() => message.value.length)
const messageKey = ref(-1)
//

const sendMessage = () => {
  // Send message to the server
  if (!isThinking.value) askMyAIAS(message, messageKey)
}
</script>
<template>
  <div
    :class="{
      'border border-t-inherit border-transparent': !focused,
      'border border-gray-200': focused,
    }"
    class="w-full rounded-bl-md rounded-br-md bg-white bg-dark-theme flex items-center relative"
  >
    <div
      :key="messageKey"
      @keypress.enter.exact="sendMessage"
      @keypress.shift.enter.exact="message += '\n'"
      contenteditable="true"
      @focus="focused = true"
      @blur="focused = false"
      @input="message = $event.target.innerText.trim()"
      class="focus:outline-none rounded-bl-md z-10 px-2 text-sm TEA-router-view overflow-y-scroll w-full break-words font-semibold"
    ></div>
    <p v-if="!messageLength" class="absolute z-0 pl-2 inline-block">
      <span class="text-xs font-semibold text-gray-500 line-clamp-1 pr-12"
        >Message... (Shit + Alt)</span
      >
    </p>
    <button
      :disabled="isThinking"
      class="sm:bg-inherit bg-black/80 bg-logo-color-hover hover:text-white sm:text-inherit text-white rounded-md m-1 p-2 self-end"
      @click="sendMessage"
    >
      <svg
        class="w-4 h-4"
        data-slot="icon"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z"
        ></path>
      </svg>
    </button>
  </div>
</template>
