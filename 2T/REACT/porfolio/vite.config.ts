import path from "path" // Importamos la utilidad de rutas de Node.js
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Configuramos el alias "@" para que apunte a la carpeta "/src"
      "@": path.resolve(__dirname, "./src"),
    },
  },
})