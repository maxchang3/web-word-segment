import init, { cut } from 'jieba-wasm'

const URL_REGEX = /(?:http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+(?:[\-.][a-z0-9]+)*\.[a-z]{2,63}(?::\d{1,5})?(?:\/\S*)?/gi

const EMAIL_REGEX = /[a-z0–9._-]+@[a-z0–9.-]+\.[a-z]{2,4}/gi

const URL_EMAIL_REGEX = new RegExp(`${EMAIL_REGEX.source}|${URL_REGEX.source}`, 'gi')

interface TextPart {
    text: string
    isURL: boolean
}

/**
 * Splits the given text into an array of TextPart objects, separating URLs from non-URL text.
 *
 * @param text - The input text to be split.
 * @returns An array of TextPart objects, where each object represents a segment of the input text.
 *          Each segment is either a URL or non-URL text, indicated by the `isURL` property.
 */
export const splitTextByURL = (text: string): TextPart[] => {
    const result: TextPart[] = []
    let match: RegExpExecArray | null
    let lastIndex = 0
    // eslint-disable-next-line no-cond-assign
    while ((match = URL_EMAIL_REGEX.exec(text)) !== null) {
        if (match.index > lastIndex) { // Add text before URL
            result.push({
                text: text.slice(lastIndex, match.index),
                isURL: false,
            })
        }
        result.push({
            text: match[0],
            isURL: true,
        })
        lastIndex = match.index + match[0].length
    }
    if (lastIndex < text.length) {
        result.push({
            text: text.slice(lastIndex),
            isURL: false,
        })
    }
    return result
}

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
        const textSplitByURL = splitTextByURL(text)
        const result = (await Promise.all( // Cut text and URL
            textSplitByURL.map(async ({ text, isURL }) => isURL ? text : cut(text)),
        ))
            .flat()
            .filter( // Filter punctuation (exclude hyphen) and spaces
                (word: string) => !word.match(/^[\p{P}--\-]|\s$/gv),
            )
        return result
    }
}

export const jieba = new Jieba()
