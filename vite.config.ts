import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react(),
      mkcert(),
    ],
    resolve: {
      alias: {
        '@pages': path.resolve(__dirname, "src/pages"),
        '@widgets': path.resolve(__dirname, "src/widgets"),
        '@shared': path.resolve(__dirname, "src/shared"),
        '@features': path.resolve(__dirname, "src/features"),
        '@entities': path.resolve(__dirname, "src/entities"),
        '@public': path.resolve(__dirname, "src/public"),
      },
    },
    server: {
      port: Number(process.env.VITE_APP_DEV_PORT) || 3000,
      host: 'localhost',
    },
  }
})
