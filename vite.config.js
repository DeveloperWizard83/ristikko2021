import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // For local development, you can comment out the base property or set it to '/'
  // base: 'https://github.com/DeveloperWizard83/ristikko2021.git',

  plugins: [react()],
  server: {
    // Set host to '0.0.0.0' to be accessible on your local network
    host: '0.0.0.0',
    // Uncomment the next line if you want to specify a port other than the default
    // port: 3000,
  },
})