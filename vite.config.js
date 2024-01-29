import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use an environment variable or another condition to set the correct base URL
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  // Conditionally set the base path for GitHub Pages deployment
  base: '/ristikko2021/',

  plugins: [react()],
  server: {
    host: '0.0.0.0', // Accessible on your local network
    // port: 3000, // Optional: Specify a port for the development server
  },
})



