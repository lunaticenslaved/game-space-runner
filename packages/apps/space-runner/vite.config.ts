import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@client': resolve(__dirname, './app/client'),
      '@libs': resolve(__dirname, './app/libs'),
      '@shared': resolve(__dirname, './app/shared'),
      '@server': resolve(__dirname, './app/server'),
    },
  },
});
