import { jieba, splitTextByURL } from '@/libs/jieba'
import { expect, it } from 'vitest'

await jieba.init()

it('should correctly segment Chinese text', async () => {
    const result = await jieba.cut('中华人民共和国武汉市长江大桥')
    expect(result).toEqual(['中华人民共和国', '武汉市', '长江大桥'])
})

it('should correctly segment English text', async () => {
    const result = await jieba.cut('Hello, World!')
    expect(result).toEqual(['Hello', 'World'])
})

it('should correctly segment mixed text', async () => {
    const result = await jieba.cut(`1972年，在贝尔实验室成员布莱恩·柯林汉撰写的内部技术文件《A Tutorial Introduction to the Language B》中首次提到了 Hello World 这一字符串。`)
    expect(result).toEqual(['1972', '年', '在', '贝尔实验室', '成员', '布莱恩', '柯林', '汉', '撰写', '的', '内部', '技术', '文件', 'A', 'Tutorial', 'Introduction', 'to', 'the', 'Language', 'B', '中', '首次', '提到', '了', 'Hello', 'World', '这一', '字符串'])
})

it('should correctly split text by URL', async () => {
    const result = splitTextByURL('访问我们的官网example.com时，如果您有任何问题，请发送邮件至service@example.com或通过论坛test.googl联系管理员')
    expect(result).toEqual([
        { text: '访问我们的官网', isURL: false },
        { text: 'example.com', isURL: true },
        { text: '时，如果您有任何问题，请发送邮件至', isURL: false },
        { text: 'service@example.com', isURL: true },
        { text: '或通过论坛', isURL: false },
        { text: 'test.googl', isURL: true },
        { text: '联系管理员', isURL: false },
    ])
})

it('should correctly segment text with URL and email', async () => {
    const result = await jieba.cut('访问我们的官网example.com时，如果您有任何问题，请发送邮件至service@example.com或通过论坛test.googl联系管理员')
    expect(result).toEqual(['访问', '我们', '的', '官网', 'example.com', '时', '如果', '您', '有', '任何', '问题', '请', '发送', '邮件', '至', 'service@example.com', '或', '通过', '论坛', 'test.googl', '联系', '管理员'])
})
