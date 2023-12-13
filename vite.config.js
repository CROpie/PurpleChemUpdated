import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],

// })

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [react()],
      define: {
        global: {},
      },
    }
  }
  if (command === 'build') {
    return {
      plugins: [react()],
      build: {
        chunkSizeWarningLimit: 1000,
      },
    }
  }
})
