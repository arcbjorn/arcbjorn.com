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
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: 'lightningcss',
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Leaflet map library
          if (id.includes('leaflet')) {
            return 'leaflet';
          }
          // SolidJS framework
          if (id.includes('solid-js') || id.includes('@solidjs')) {
            return 'solid-vendor';
          }
          // Flag icons - separate chunk
          if (id.includes('flag-icons')) {
            return 'flag-icons';
          }
          // FontAwesome icons
          if (id.includes('@fortawesome')) {
            return 'icons';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          // Images
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(name)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          // Fonts
          if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          // GeoJSON data
          if (/\.geojson$/i.test(name)) {
            return 'assets/data/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@i18n': path.resolve(__dirname, './src/i18n'),
      '@data': path.resolve(__dirname, './src/data'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['./tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
