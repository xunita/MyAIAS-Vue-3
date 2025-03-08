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
  endpoint: {
    type: String,
    default: null,
  },
  remoteEndpoint: {
    type: Boolean,
    default: false,
  },
})

const _setBackendEndpoint = (endpoint = null) => {
  if (endpoint) {
    setBackendEndpoint(endpoint)
  } else if (props.remoteEndpoint) {
    setBackendEndpoint('https://myaias.azurewebsites.net/api')
  } else {
    if (process.env.NODE_ENV === 'development') {
      setBackendEndpoint('http://localhost:9191/api')
    } else {
      setBackendEndpoint('https://myaias.azurewebsites.net/api')
    }
  }
}
onMounted(() => {
  setSettings(props.modelSettings)
  setSystemPrompt(props.sysPrompt)
  _setBackendEndpoint(props.endpoint)
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
