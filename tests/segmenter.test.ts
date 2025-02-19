import { splitTextByURL, useSegmenter } from '@/libs/segmenter'
import { expect, it } from 'vitest'

for (const backend of ['jieba', 'intl'] as const) {
    const segmenter = useSegmenter(backend)

    await segmenter.init()

    it('should correctly segment Chinese text', async () => {
        const result = await segmenter.segment('中华人民共和国武汉市长江大桥')
        expect(result.length).toBeGreaterThan(1)
    })

    it('should correctly segment English text', async () => {
        const result = await segmenter.segment('Hello, World!')
        expect(result).toEqual(['Hello', 'World'])
    })

    it('should correctly segment mixed text', async () => {
        const result = await segmenter.segment(`1972年，在贝尔实验室成员布莱恩·柯林汉撰写的内部技术文件《A Tutorial Introduction to the Language B》中首次提到了 Hello World 这一字符串。`)
        const englishWords = ['A', 'Tutorial', 'Introduction', 'to', 'the', 'Language', 'B', 'Hello', 'World']
        expect(result).toEqual(expect.arrayContaining(englishWords))
        expect(result.length).toBeGreaterThan(englishWords.length)
    })

    it('should correctly split text by URL', async () => {
        const result = splitTextByURL('访问我们的官网example.com时，如果您有任何问题，请发送邮件至service@example.com或通过论坛test.googl联系管理员')
        const URLParts = [
            { text: 'example.com', isURL: true },
            { text: 'service@example.com', isURL: true },
            { text: 'test.googl', isURL: true },
        ]
        expect(result).toEqual(expect.arrayContaining(URLParts))
        expect(result.length).toBeGreaterThan(URLParts.length)
    })

    it('should correctly segment text with URL and email', async () => {
        const result = await segmenter.segment('访问我们的官网example.com时，如果您有任何问题，请发送邮件至service@example.com或通过论坛test.googl联系管理员')
        const emailAndURLParts = ['example.com', 'service@example.com', 'test.googl']
        expect(result).toEqual(expect.arrayContaining(emailAndURLParts))
        expect(result.length).toBeGreaterThan(emailAndURLParts.length)
    })
}
