import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  fontFamily: {
    courier: ['Courier', 'monospace'],
  },
  resolve: {
    alias: {
'@': path.resolve('/Users/arun/Documents/project/Aangan_Restro-main', 'src')    },
  },
})