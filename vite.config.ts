import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'

import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      includeAssets: ['*.jpg', '*.webp'],

      manifest: {
        name: 'Chequer',
        short_name: 'Chequer',
        description: 'Chequer - Learn how to fill out a Cheque in Algeria. Comment remplir un chèque postale en Algérie. كيفية تعبئة بريدي شيك في الجزائر. ',
        theme_color: '#5495f6',
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled:false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    })
]}
)
