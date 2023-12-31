import index from './index.vue'

export default index

let textureLoaded = false
export function initTextTextures() {
  if (import.meta.env.SSR || textureLoaded)
    return

  let result = ''
  const textureRoot = '/textures/font'

  for (let i = 0; i < 256; i++) {
    const hex = i.toString(16).padStart(2, '0')
    result += `.unicode-${hex}::before { background-image: url(${textureRoot}/unicode_page_${hex}.png) }`
  }

  const style = document.createElement('style')

  style.id = '__m-text-textures'
  style.innerText = result
  document.head.appendChild(style)

  textureLoaded = true
}
