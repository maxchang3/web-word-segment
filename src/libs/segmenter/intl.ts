import { canBeSkip, type Segmenter, splitTextByURL } from './utils'

class IntlSegmenter implements Segmenter {
    isReady: boolean
    tool: Intl.Segmenter
    async init() {
        this.isReady = true
    }

    constructor() {
        this.tool = new Intl.Segmenter('zh', { granularity: 'word' })
        this.isReady = false
    }

    *segmentIter(text: string): Iterable<string> {
        text = text.trim()
        if (text === '') {
            return
        }
        const textSplitByURL = splitTextByURL(text)
        for (const part of textSplitByURL) {
            if (part.isURL) {
                yield part.text
                continue
            }
            for (const segment of this.tool.segment(part.text)) {
                const word = segment.segment
                if (!canBeSkip(word)) yield word
            }
        }
    }

    async segment(text: string): Promise<string[]> {
        return Array.from(this.segmentIter(text))
    }
}

export const intlSegmenter = new IntlSegmenter()
