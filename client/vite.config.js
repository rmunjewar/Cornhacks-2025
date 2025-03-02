import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure correct routing
  server: {
    proxy: {
      "/socket.io": {
        target: "https://a-brighter-future.onrender.com",
        changeOrigin: true,
        ws: true,
      },
    },
  },
});