<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import MyAIASContainer from './MyAIASContainer.vue'
import { useMyAIAS } from '@/composables/useMyAIAS'
const { setSettings, setSystemPrompt, setBackendEndpoint } = useMyAIAS()
const chatOpened = ref(false)
provide('chatOpened', chatOpened)
const props = defineProps({
  modelSettings: {
    type: Object,
    required: true,
  },
  sysPrompt: {
    type: String,
    required: true,
  },
})
onMounted(() => {
  setSettings(props.modelSettings)
  setSystemPrompt(props.sysPrompt)
  setBackendEndpoint('https://myaias.azurewebsites.net/api')
})
</script>
<template>
  <Teleport to="body">
    <div
      id="myaias-infynify"
      :class="{
        'z-10 my-36 sm:w-[24rem] sm:pl-0 pl-10 w-full': chatOpened,
        'w-fit': !chatOpened,
      }"
      class="m-5 fixed right-0 top-0 bottom-0 pointer-events-none"
    >
      <MyAIASContainer />
    </div>
  </Teleport>
</template>
