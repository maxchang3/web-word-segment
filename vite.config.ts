import process from 'node:process'
import { URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    const target = env.VITE_TARGET || 'web'
    return {
        plugins: [
            vue(),
            vueDevTools(),
            UnoCSS(),
            target === 'shortcuts' ? viteSingleFile() : undefined,
        ],
        resolve: {
            alias: {
                '@/': new URL('./src/', import.meta.url).pathname,
                '~segmenter': new URL(`./src/libs/segmenter/${target}.ts`, import.meta.url).pathname,
            },
        },
        // This is a known issue when using WebAssembly with Vite 5.x~6.x
        // Need to specify `optimizeDeps.exclude` to NPM packages that uses WebAssembly
        // See: https://github.com/vitejs/vite/issues/8427
        optimizeDeps: {
            exclude: ['jieba-wasm'],
        },
    }
})
