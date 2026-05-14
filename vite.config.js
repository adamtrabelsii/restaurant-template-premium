import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('postprocessing') || id.match(/[\\/]three[\\/]/) || id.includes('@react-three')) return 'three'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('lucide-react')) return 'icons'
          if (id.match(/[\\/]react(-dom)?[\\/]/) || id.includes('scheduler')) return 'react'
          return 'vendor'
        },
      },
    },
  },
})
