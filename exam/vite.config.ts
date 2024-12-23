import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '2024-2-VK-EDU-Frontend-M-Yunanova/exam',
  plugins: [react()],
  resolve: {
    alias: {
      '@': `/src`,
    },
  },
});
