import Message from '../models/Message'
/**
 *
 * @param { Object} data
 * @param { Message } aiMessage
 * @param {Object} composables
 */

function askMeSender(
  data,
  aiMessage,
  {
    setIsThinking,
    setHasError,
    setEndStream,
    buildPrompt,
    settings,
    systemPrompt,
    backend_endpoint,
  },
) {
  //
  data.modelSettings = settings.value
  //
  data.systemPrompt = JSON.parse(systemPrompt.value)
  data.prompts = buildPrompt(data.prompt)
  //
  const MYAIAS_BACKEND_ENDPOINT = `${backend_endpoint.value}/askMe`
  //
  fetch(MYAIAS_BACKEND_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let done = false

      // Read each chunk as it comes in
      function readChunk() {
        reader.read().then(function ({ value, done: chunkDone }) {
          //
          setIsThinking(false)
          // remove the thinking indicator if it is still there
          if (aiMessage.isThinking) {
            aiMessage.setIsThinking(false)
          }
          done = chunkDone
          let chunkText = decoder.decode(value, { stream: true })
          // append the chunk to the message content
          if (chunkText.includes('data: [CHUNK]')) {
            setTimeout(() => {
              const cleanedChunkText = chunkText.replace('data: [CHUNK]', '')
              aiMessage.appendContent(cleanedChunkText)
            }, 250)
          } else if (chunkText.includes('data: [ERROR]')) {
            console.error('Error in stream:', chunkText.replace('data: [ERROR]', ''))
            if (!aiMessage.content.length) {
              aiMessage.setContent('Oops!') // Set the content to an error message
            }
            aiMessage.setHasError(true)
            setHasError(true)
            setEndStream(true)
          }
          if (!done) {
            readChunk() // Continue reading the next chunk
          } else {
            setEndStream(true)
          }
        })
      }
      readChunk() // Start reading the chunks
    })
    .catch((error) => {
      setEndStream(true)
      setIsThinking(false)
      //
      if (aiMessage.isThinking) {
        aiMessage.setIsThinking(false)
      }
      if (!aiMessage.content.length) {
        aiMessage.setContent('Oops!') // Set the content to an error message
      }
      aiMessage.setHasError(true)
      setHasError(true)
    })
}

export { askMeSender }
