import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repo from /ai-ethics-initiative/, not the
  // domain root, so every built asset URL needs that prefix baked in.
  base: '/ai-ethics-initiative/',
  plugins: [react()],
})
