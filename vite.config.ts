import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://201.23.16.78:8000', // Endpoint do seu backend
        changeOrigin: true,
        secure: false, // Não verifique o SSL (caso esteja usando HTTP localmente)
      }
    }
  },
  plugins: [react()],
})
