import type { Plugin } from 'vue'
import MButton from './components/button'
import MText from './components/text'
import MInput from './components/input'
import MProvider from './components/provider'

export default {
  install(app) {
    app.component(MButton.name, MButton)
    app.component(MText.name, MText)
    app.component(MInput.name, MInput)
    app.component(MProvider.name, MProvider)
  },
} as Plugin
