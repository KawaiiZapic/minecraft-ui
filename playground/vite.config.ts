import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
const muiRoot = path.resolve(__dirname, "../");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "minecraft-ui",
        replacement: path.resolve(muiRoot, "src/index.ts")
      }
    ]
  },
  publicDir: path.resolve(muiRoot, "public")
})
