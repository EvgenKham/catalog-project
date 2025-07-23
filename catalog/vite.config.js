import { defineConfig } from 'vite'
import pugPlugin from 'vite-plugin-pug'
import legacy from '@vitejs/plugin-legacy'
import { fileURLToPath } from 'url'
import path from 'path'

export default defineConfig({
  root: 'src',
  publicDir:  '../public',
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html')
      },
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]'
      },
    }
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@images': path.resolve(__dirname, 'src/assets/images')
    }
  },
  plugins: [
    pugPlugin({
      pretty: true,
      locals: {
        assetsPath: '/assets',
        imagesPath: '/assets/images'
      }
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  server: {
    port: 3000
  }
})