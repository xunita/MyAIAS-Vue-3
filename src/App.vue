<script setup lang="ts">
import MainMyAIAS from './components/body/MainMyAIAS.vue'
const modelSettings = {
  endpoint: 'https://<sasURL>.openai.azure.com/',
  apiKey: 'hhijjkdfdsfkddklopaaakdjkfjdskfjdfslpdfdsdfdsfdsaaFTYuhgJK', // this is not a real api key
  apiVersion: '2024-08-01-preview',
  deployment: 'gpt-4o-mini',
  maxTokens: 800, // if not set, default is 800
  oldMessages: 50, // if not set, default is 10 (ai + user included)
  stream: true, // if not set, default is true
}
const sysPrompt =
  '{ "role": "system", "content": [ {"type": "text", "text": "You are a helpfull assistant." } ] }' // add the attribute "type": "text" to the content object to avaid 429 rate limit error
</script>
<template>
  <MainMyAIAS
    :enableRemoteEndpoint="true"
    :endpoint="null"
    :modelSettings="modelSettings"
    :sysPrompt="sysPrompt"
  />
</template>
