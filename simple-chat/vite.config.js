import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/2024-2-VK-EDU-Frontend-M-Yunanova/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        chats: resolve(__dirname, 'pages/chats.html'),
      },
    },
  },
});
