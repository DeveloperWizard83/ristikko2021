import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://github.com/DeveloperWizard83/ristikko2021.git',
  plugins: [react()],
})
