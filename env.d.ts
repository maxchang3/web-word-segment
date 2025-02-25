/// <reference types="vite/client" />

declare module '~segmenter' {
    import type { Segmenter } from '@/libs/utils'

    type SupportBackend = 'jieba' | 'intl'

    const supportBackends: readonly SupportBackend[]

    const isSupportIntlSegmenter: boolean

    // If jieba is unavailable, it means the code is running in shortcuts (iOS WebView) mode,
    // where intl must be available.
    const backendData:
        { jieba?: [string, string], intl: [string, string] } |
        { jieba: [string, string], intl?: [string, string] }

    const useSegmenter: (backend: SupportBackend) => Segmenter
}
