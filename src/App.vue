<script setup lang="ts">
import MainMyAIAS from './components/body/MainMyAIAS.vue'
const modelSettings = {
  endpoint: '',
  apiKey: '',
  apiVersion: '',
  deployment: '',
}
const sysPrompt = '{ "role": "system", "content": [ { "text": "You are a helpfull assistant." } ] }'
</script>
<template>
  <MainMyAIAS :modelSettings="modelSettings" :sysPrompt="sysPrompt" />
</template>
