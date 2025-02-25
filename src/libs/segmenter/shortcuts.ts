import { intlSegmenter } from './intl'

export * from './utils'

export const supportBackends = ['intl'] as const

export type SupportBackend = typeof supportBackends[number]

export const isSupportIntlSegmenter = typeof Intl?.Segmenter === 'function'

export const backendData = {
    intl: ['Intl.Segmenter', 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter'],
} satisfies Record<SupportBackend, [string, string]>

export const useSegmenter = (_: SupportBackend = 'intl') => intlSegmenter
