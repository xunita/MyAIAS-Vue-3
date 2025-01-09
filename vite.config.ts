import { fileURLToPath, URL } from 'node:url'
import circleDependency from 'vite-plugin-circular-dependency'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 3000,
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'MyAIAS',
        formats: ['es', 'cjs', 'umd'], // Specify desired formats
        fileName: (format) => {
          if (format === 'es') return 'myaias.esm.js' // Custom name for ESM
          if (format === 'umd') return 'myaias.umd.cjs' // Custom name for UMD
          return 'myaias.js' // Default for CommonJS
        },
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
    plugins: [
      vue(),
      vueDevTools(),
      circleDependency(),
      dts({
        outDir: 'dist',
        insertTypesEntry: true,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
