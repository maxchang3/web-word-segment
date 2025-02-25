import { intlSegmenter } from './intl'
import { jiebaSegmenter } from './jieba'

export * from './utils'

export const supportBackends = ['jieba', 'intl'] as const

export type SupportBackend = typeof supportBackends[number]

export const isSupportIntlSegmenter = typeof Intl?.Segmenter === 'function'

export const backendData = {
    jieba: ['jieba-wasm', 'https://github.com/fengkx/jieba-wasm'],
    intl: ['Intl.Segmenter', 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter'],
} satisfies Record<SupportBackend, [string, string]>

export const useSegmenter = (backend: SupportBackend = 'jieba') => {
    if (backend === 'intl') {
        if (isSupportIntlSegmenter) return intlSegmenter
        throw new Error('Intl.Segmenter not supported')
    }
    return jiebaSegmenter
}
