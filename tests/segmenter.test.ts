import { splitTextByURL, supportBackends, useSegmenter } from '@/libs/segmenter/web'
import { expect, it } from 'vitest'

for (const backend of supportBackends) {
    const segmenter = useSegmenter(backend)

    await segmenter.init()

    it('should correctly segment Chinese text', async () => {
        const result = await segmenter.segment('中华人民共和国武汉市长江大桥')
        expect(result).toMatchSnapshot()
    })

    it('should correctly segment English text', async () => {
        const result = await segmenter.segment('Hello, World!')
        expect(result).toMatchSnapshot()
    })

    it('should correctly segment mixed text', async () => {
        const result = await segmenter.segment(`1972年，在贝尔实验室成员布莱恩·柯林汉撰写的内部技术文件《A Tutorial Introduction to the Language B》中首次提到了 Hello World 这一字符串。`)
        expect(result).toMatchSnapshot()
    })

    it('should correctly split text by URL', async () => {
        const result = splitTextByURL('访问我们的官网example.com时，如果您有任何问题，请发送邮件至service@example.com或通过论坛test.googl联系管理员')
        expect(result).toMatchSnapshot()
    })

    it('should correctly segment text with URL and email', async () => {
        const result = await segmenter.segment('访问我们的官网example.com时，如果您有任何问题，请发送邮件至service@example.com或通过论坛test.googl联系管理员')
        expect(result).toMatchSnapshot()
    })
}
