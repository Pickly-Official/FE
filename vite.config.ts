import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://15.164.97.188:8080',
        changeOrigin: true,
      },
      '/oauth2': {
        target: 'http://15.164.97.188:8080',
        changeOrigin: true,
      },
    },
  },
});
