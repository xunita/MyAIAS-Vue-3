let counter = 0

const txId = () => {
  const now = Date.now()
  counter = (counter + 1) % 1000
  return `${now}${counter.toString().padStart(3, '0')}`
}

const base64ToBlob = (base64, contentType = '') => {
  const byteCharacters = atob(base64.split(',')[1])
  const byteArrays = []
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512)
    const byteNumbers = new Array(slice.length).fill(0).map((_, i) => slice.charCodeAt(i))
    byteArrays.push(new Uint8Array(byteNumbers))
  }
  return new Blob(byteArrays, { type: contentType })
}

const getStringAfter = (str, delimiter) => {
  const index = str.indexOf(delimiter)
  return index === -1 ? '' : str.substring()
}

export { txId, base64ToBlob, getStringAfter }
