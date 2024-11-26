import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '2024-2-VK-EDU-Frontend-M-Yunanova',
  plugins: [react()],
  resolve: {
    alias: {
      '@': `/src`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/app/styles/_variables.scss";`,
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://vkedu-fullstack-div2.ru/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
