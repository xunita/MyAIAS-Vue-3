<script setup lang="ts">
import MainMyAIAS from './components/body/MainMyAIAS.vue'
const modelSettings = {
  endpoint: '',
  apiKey: '',
  apiVersion: '',
  deployment: '',
  maxTokens: 800, // if not set, default is 800
}
const sysPrompt = '{ "role": "system", "content": [ { "text": "You are a helpfull assistant." } ] }'
</script>
<template>
  <MainMyAIAS :modelSettings="modelSettings" :sysPrompt="sysPrompt" />
</template>
