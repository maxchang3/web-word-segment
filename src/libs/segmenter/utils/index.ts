export * from './regex'
export * from './text'
export interface Segmenter {
    isReady: boolean
    init(...args: any[]): Promise<void>
    segment(text: string): Promise<string[]>
}
