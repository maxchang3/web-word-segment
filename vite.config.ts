import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        UnoCSS(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    // This is a known issue when using WebAssembly with Vite 5.x~6.x
    // Need to specify `optimizeDeps.exclude` to NPM packages that uses WebAssembly
    // See: https://github.com/vitejs/vite/issues/8427
    optimizeDeps: {
        exclude: ['jieba-wasm'],
    },
})
