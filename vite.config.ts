import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    customElement: [/m-/g],
  })],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
  },
})
