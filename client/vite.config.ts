import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  base: '/',
  server: { port: 5555 },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/styles/variables.scss';`,
      },
    },
  },
  plugins: [vue(), tsconfigPaths({ loose: true }), svgLoader()],
  test: {
    environment: 'happy-dom',
    exclude: [...configDefaults.exclude, '**/tests/e2e/**'],
  },
});
