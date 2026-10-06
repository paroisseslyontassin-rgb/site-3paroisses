import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Ports fixes : ce sont ceux autorisés dans Sanity (API → CORS origins).
  // Si le port est déjà pris, Vite s'arrête avec un message au lieu d'en choisir un autre
  // (sur un autre port, les actualités ne se chargeraient pas).
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
})
