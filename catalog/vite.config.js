import { defineConfig } from 'vite'
import pugPlugin from 'vite-plugin-pug'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  root: 'src',
  publicDir: 'assets',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsInlineLimit: 4096
  },
  plugins: [
    pugPlugin({
      pretty: true,
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  server: {
    port: 3000
  }
})