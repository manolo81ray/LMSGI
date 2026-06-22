import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    // Separamos las librerías de terceros en chunks estables y cacheables:
    // al desplegar nuevas versiones del código, el navegador reaprovecha
    // estos vendors si no han cambiado.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          // Librerías "hoja" grandes y de cambio poco frecuente: cada una en su
          // chunk para maximizar el cacheo del navegador entre despliegues.
          if (id.includes('@supabase')) return 'supabase';
          if (id.includes('react-router')) return 'react-router';
          if (id.includes('react-hook-form')) return 'forms';
          if (id.includes('lucide-react') || id.includes('@heroicons')) return 'icons';
          if (id.includes('@radix-ui') || id.includes('radix-ui') || id.includes('@headlessui')) return 'ui';
          // El núcleo de React y el resto de utilidades van juntos en un único
          // chunk de framework. Mantenerlos unidos evita ciclos entre chunks.
          return 'vendor';
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    allowedHosts: [
      'shipment-recorder-rapid-moon.trycloudflare.com'
    ]
  }
})
