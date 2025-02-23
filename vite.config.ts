import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [solidPlugin(), tailwindcss()],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
  },
  assetsInclude: ['**/*.geojson', '**/*.woff', '**/*.woff2'],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          map: ['leaflet'],
          geojson: ['/src/data/filtered_provinces.geojson'],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['src/data/filtered_provinces.geojson'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@components': path.resolve(__dirname, './src/components'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@state': path.resolve(__dirname, './src/state'),
      '@i18n': path.resolve(__dirname, './src/i18n'),
      '@data': path.resolve(__dirname, './src/data'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@fontsource': path.resolve(__dirname, 'node_modules/@fontsource'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
});
