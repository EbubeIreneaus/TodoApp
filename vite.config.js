import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  build:{
    rollupOptions: {
      // Add Bootstrap to the list of external modules
      external: ['bootstrap','animate.css','js-cookie','@fortawesome/fontawesome-free'],
    },
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
