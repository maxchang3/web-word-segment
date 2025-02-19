import { intlSegmenter } from './intl'
import { jiebaSegmenter } from './jieba'

export * from './utils'

export const isSupportIntlSegmenter = typeof Intl?.Segmenter === 'function'

export const useSegmenter = (backend: 'jieba' | 'intl' = 'jieba') => {
    if (backend === 'intl') {
        if (isSupportIntlSegmenter) return intlSegmenter
        throw new Error('Intl.Segmenter not supported')
    }
    return jiebaSegmenter
}
