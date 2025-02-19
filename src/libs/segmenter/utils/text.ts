import { URL_EMAIL_REGEX } from './regex'

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

export const canBeSkip = (word: string): boolean => word !== '-' && word.match(/^[\p{P}\s]$/gu) !== null
