<script setup lang="ts">
import { inject } from 'vue';
const chatOpened = inject('chatOpened', true)
const closeChat = () => {
  chatOpened.value = false
}
</script>

<template>
  <div
    class="flex items-center w-hull justify-between space-x-3 pl-4 pr-2 py-2 border-b border-gray-200"
  >
    <div class="flex items-center space-x-2">
      <img src="@/assets/logo.png" alt="MyAIAS" class="h-5 w-5 drop-shadow-lg" />
      <span class="text-xs font-semibold">MyAIAS</span>
    </div>
    <button
      @click="closeChat"
      class="dark:hover:bg-gray-600/50 hover:bg-gray-200/25 bg-inherit p-1 rounded-full"
    >
      <svg
        class="h-5 w-5"
        data-slot="icon"
        fill="none"
        stroke-width="1.5"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
</template>
