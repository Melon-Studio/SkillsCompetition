import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    post: 5173
  },
  optimizeDeps: {
    // 禁用所有警告
    warnings: false,
  },
  build: {
    // 禁用所有警告
    rollupOptions: {
      output: {
        manualChunks: () => 'vite-disable-warnings',
      },
    },
  },
})
