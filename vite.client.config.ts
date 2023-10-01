import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgLoader from '@andylacko/vite-svg-react-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgLoader(), react()],
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
