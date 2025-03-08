import Message from '../models/Message'

function readStream(aiMessage, response, { setIsThinking, setHasError, setEndStream }) {
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
      if (chunkText.includes('data: [ERROR]')) {
        console.error('Error in stream:', chunkText.replace('data: [ERROR]', ''))
        if (!aiMessage.content.length) {
          aiMessage.setContent('Oops!') // Set the content to an error message
        }
        aiMessage.setHasError(true)
        setHasError(true)
        setEndStream(true)
      } else {
        aiMessage.appendContent(chunkText)
      }
      if (!done) {
        readChunk() // Continue reading the next chunk
      } else {
        setEndStream(true)
      }
    })
  }
  readChunk() // Start reading the chunks
}
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
      if (data.modelSettings.stream) {
        // If the stream is enabled, read the stream
        readStream(aiMessage, response, { setIsThinking, setHasError, setEndStream })
      } else {
        return response.json()
      }
    })
    .then((responseJson) => {
      setIsThinking(false)
      // remove the thinking indicator if it is still there
      if (aiMessage.isThinking) {
        aiMessage.setIsThinking(false)
      }
      if (responseJson && responseJson.message) {
        aiMessage.setContent(responseJson.message)
      } else if (responseJson && responseJson.error) {
        aiMessage.setContent('Oops!')
        aiMessage.setHasError(true)
        setHasError(true)
      }
    })
    .catch((error) => {
      setHasError(true)
      setIsThinking(false)
      aiMessage.setHasError(true)
      //
      if (data.modelSettings.stream) {
        setEndStream(true)
      }
      //
      if (aiMessage.isThinking) {
        aiMessage.setIsThinking(false)
      }
      if (!aiMessage.content.length) {
        aiMessage.setContent('Oops!') // Set the content to an error message
      }
    })
}

export { askMeSender }
