import init, { cut } from 'jieba-wasm'

class Jieba {
    isReady: boolean
    constructor() {
        this.isReady = false
    }

    async init(): Promise<void> {
        if (this.isReady) {
            return
        }
        if (typeof init !== 'function') { // for Node.js & Testing
            this.isReady = true
            return
        }
        await init()
        this.isReady = true
    }

    async cut(text: string): Promise<string[]> {
        if (!this.isReady) {
            throw new Error('Jieba not initialized')
        }
        text = text.trim()
        if (text === '') {
            return []
        }
        return cut(text).filter( // Filter punctuation (exclude hypen) and spaces
            (word: string) => !word.match(/[\p{P}--\-]|\s/gv),
        )
    }
}

export const jieba = new Jieba()
