import { defineConfig } from 'vite'
import pugPlugin from 'vite-plugin-pug'
import legacy from '@vitejs/plugin-legacy'
import { fileURLToPath } from 'url'
import path from 'path'

export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/catalog-project/'
    : '/',
  root: 'src',
  publicDir: path.resolve(__dirname, 'public'),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@fonts': fileURLToPath(new URL('./src/assets/fonts', import.meta.url)),
    }
  },
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.html'),
      output: {
        assetFileNames: (assetInfo) => {
          const ext = path.extname(assetInfo.name).substring(1)
          if (/ttf|woff2?|eot|otf/i.test(ext)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }
          return 'assets/[name].[hash][ext]'
        }
      },
    }
  },
  plugins: [
    pugPlugin({
      pretty: true,
      locals: {
        assetsPath: process.env.NODE_ENV === 'production' ? '/catalog-project/assets' : '/assets'
      }
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  server: {
    port: 3000,
    open: true
  }
})