import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        // Add any other external dependencies as needed
        '/src/assets/@rdkit/rdkit/dist/RDKit_minimal.js',
        '/src/assets/jsme-editor/jsme.nocache.js',
      ],
    },
  },
})
