import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Bind to all IP addresses on the local network
    port: 5173,      // Specify the port (keep the default 5173)
  },
})
