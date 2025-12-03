import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'; // Adicione isto se estiver faltando.

// https://vitejs.dev/config/
export default defineConfig({
  // *** INÍCIO DAS CONFIGURAÇÕES ***
  base: '/', // Linha de correção para o Vercel/SPA
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  define: {
    // Certifique-se de que suas chaves de API estão aqui
    'process.env.API_KEY': JSON.stringify(process.env.GEMINI_API_KEY),
    'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY),
  },
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  // *** FIM DAS CONFIGURAÇÕES ***
})
