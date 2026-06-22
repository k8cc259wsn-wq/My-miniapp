import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Конфигурация Vite для Telegram Mini App.
// base: './' — обязательно для корректной работы при раздаче через GitHub Pages
// или любой статический хостинг с произвольным путём.
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2019',
  },
});
 