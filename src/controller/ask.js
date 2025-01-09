import { askMeSender } from '@/api/sender'
import { txId } from '@/utils/utils'
import { useMyAIAS } from '@/composables/useMyAIAS'
import { scrollToBottomById } from '../utils/domutils'
const {
  addMessage,
  setIsThinking,
  setHasError,
  getMessage,
  setEndStream,
  buildPrompt,
  settings,
  systemPrompt,
  backend_endpoint,
} = useMyAIAS()

//
const askMyAIAS = async (message, messageKey) => {
  if (message.value.trim() !== '') {
    const data = {}
    const aiMessage = {
      sender: 'ai',
      content: '',
      isThinking: true,
      id: txId(),
      data,
    }
    const userMessage = {
      sender: 'user',
      content: message.value,
      id: txId(),
    }
    //
    data.prompt = JSON.parse(JSON.stringify(message.value))
    //
    addMessage(userMessage)
    //
    setTimeout(() => {
      addMessage(aiMessage)
      //
      setIsThinking(true)
      setHasError(false)
      const aim = getMessage(aiMessage.id)
      //
      askMeSender(data, aim, {
        setIsThinking,
        setHasError,
        setEndStream,
        buildPrompt,
        settings,
        systemPrompt,
        backend_endpoint,
      })
      //
      setTimeout(() => {
        scrollToBottomById('chatMyAIAS')
      }, 250)
    }, 500)
  }
  // ...
  message.value = ''
  messageKey.value++
}

export { askMyAIAS }
