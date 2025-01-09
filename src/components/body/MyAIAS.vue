<script setup lang="ts">
import MyAIASTitle from './MyAIASTitle.vue';
import MyAIASSender from './MyAIASSender.vue';
import MyAIASChatBody from './MyAIASChatBody.vue';
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <MyAIASTitle />
    <div class="flex flex-col h-full overflow-hidden">
      <MyAIASChatBody />
    </div>
    <MyAIASSender />
  </div>
</template>
