import { computed, reactive, ref } from 'vue'
import Message from '../models/message'
const _messages = reactive(new Map())
const _isThinking = ref(false)
const _hasError = ref(false)
const _endStream = ref(false)
const _settings = reactive({
  endpoint: '',
  apiKey: '',
  apiVersion: '',
  deployment: '',
  maxTokens: 800,
  oldMessages: 10,
  stream: true,
})
const _systemPrompt = ref('')
const _backend_endpoint = ref('')
//
const isThinking = computed(() => _isThinking.value)
const messages = computed(() => _messages)
const hasError = computed(() => _hasError.value)
const endStream = computed(() => _endStream.value)
const settings = computed(() => _settings)
const systemPrompt = computed(() => _systemPrompt.value)
const backend_endpoint = computed(() => _backend_endpoint.value)
//

const setBackendEndpoint = (backend_endpoint) => {
  _backend_endpoint.value = backend_endpoint
}

const setSystemPrompt = (systemPrompt) => {
  _systemPrompt.value = systemPrompt
}

const setSettings = (settings) => {
  _settings.endpoint = settings.endpoint
  _settings.apiKey = settings.apiKey
  _settings.apiVersion = settings.apiVersion
  _settings.deployment = settings.deployment
  _settings.maxTokens = settings.maxTokens || 800
  _settings.oldMessages = settings.oldMessages || 10
  _settings.stream = settings.stream ?? true
}

const getLastXMessages = () => {
  return Array.from(_messages.values()).slice(-_settings.oldMessages)
}

const buildPrompt = (prompt) => {
  const last5Msg = getLastXMessages()
  const prompts = []
  for (const msg of last5Msg) {
    if (msg.sender === 'user') {
      prompts.push({
        role: 'user',
        content: [
          {
            type: 'text',
            text: msg.content,
          },
        ],
      })
    } else if (msg.sender === 'ai' && !msg.isThinking && msg.content.length) {
      prompts.push({
        role: 'assistant',
        content: [
          {
            type: 'text',
            text: msg.content,
          },
        ],
      })
    }
  }
  return prompts
}

const setEndStream = (endStream) => {
  _endStream.value = endStream
}

const setIsThinking = (isThinking) => {
  _isThinking.value = isThinking
}
const setHasError = (hasError) => {
  _hasError.value = hasError
}
//
const addMessage = (m) => {
  const message = new Message(m)
  _messages.set(message.id, message)
}

const getMessage = (id) => {
  return _messages.get(id) ?? null
}

const appendMessageContent = (id, content) => {
  const message = _messages.get(id)
  if (!message) {
    return
  }
  message.appendContent(content)
}
export const useMyAIAS = () => {
  // Return shared state and methods
  return {
    messages,
    isThinking,
    hasError,
    endStream,
    settings,
    systemPrompt,
    backend_endpoint,
    addMessage,
    appendMessageContent,
    setIsThinking,
    setHasError,
    getMessage,
    setEndStream,
    buildPrompt,
    setSettings,
    setSystemPrompt,
    setBackendEndpoint,
  }
}
