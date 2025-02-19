import { canBeSkip, type Segmenter, splitTextByURL } from './utils'

class JiebaSegmenter implements Segmenter {
    isReady: boolean = false
    cut: ((text: string) => Promise<string[]>) | undefined

    async init() {
        const { default: init, cut } = await import('jieba-wasm')
        if (typeof init !== 'function') { // for Node.js & Testing
            this.isReady = true
            return
        }
        await init()
        this.cut = async (text: string) => cut(text) as string[]
        this.isReady = true
    }

    async segment(text: string): Promise<string[]> {
        if (!this.isReady) {
            throw new Error('JiebaSegmenter not ready')
        }
        text = text.trim()
        if (text === '') {
            return []
        }
        const textSplitByURL = splitTextByURL(text)
        const result = (await Promise.all( // Cut text and URL
            textSplitByURL.map(async ({ text, isURL }) => isURL ? text : this.cut!(text)),
        ))
            .flat()
            .filter(
                (word: string) => !(canBeSkip(word)),
            )
        return result
    }
}

export const jiebaSegmenter = new JiebaSegmenter()
