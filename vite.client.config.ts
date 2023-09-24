import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  mode: process.env.NODE_ENV,
  build: {
    outDir: 'dist/client/spa',
  },
  resolve: {
    alias: {
      '@client': resolve(__dirname, './app/client'),
      '@libs': resolve(__dirname, './app/libs'),
      '@shared': resolve(__dirname, './app/shared'),
    },
  },
});
