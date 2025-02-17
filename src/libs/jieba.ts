import init, { cut } from 'jieba-wasm'

class Jieba {
    isReady: boolean
    constructor() {
        this.isReady = false
    }

    async init(): Promise<void> {
        await init()
        this.isReady = true
    }

    async cut(text: string): Promise<string[]> {
        if (!this.isReady) {
            throw new Error('Jieba not initialized')
        }
        return cut(text)
    }
}

export const jieba = new Jieba()
