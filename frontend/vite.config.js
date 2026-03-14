import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  esbuild: {
    loader: 'jsx',        // treat .js files as jsx
    include: /src\/.*\.js$/,  // apply to all .js files in src
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'      // also apply during dependency optimization
      }
    }
  }
})