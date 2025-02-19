import { intlSegmenter } from './intl'
import { jiebaSegmenter } from './jieba'

export * from './utils'

export const supportBackends = ['jieba', 'intl'] as const

export type SupportBackend = typeof supportBackends[number]

export const isSupportIntlSegmenter = typeof Intl?.Segmenter === 'function'

export const useSegmenter = (backend: SupportBackend = 'jieba') => {
    if (backend === 'intl') {
        if (isSupportIntlSegmenter) return intlSegmenter
        throw new Error('Intl.Segmenter not supported')
    }
    return jiebaSegmenter
}
