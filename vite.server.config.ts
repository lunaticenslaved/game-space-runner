import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgLoader from '@andylacko/vite-svg-react-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgLoader()],
  mode: process.env.NODE_ENV,
  build: {
    lib: {
      entry: resolve(__dirname, 'app/client/index.server.tsx'),
      name: 'Client',
      fileName: 'index',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        format: 'cjs',
        dir: 'dist/client/ssr',
      },
    },
  },
  resolve: {
    alias: {
      '@client': resolve(__dirname, './app/client'),
      '@libs': resolve(__dirname, './app/libs'),
      '@shared': resolve(__dirname, './app/shared'),
    },
  },
});
