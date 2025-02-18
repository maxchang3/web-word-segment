import { jieba } from '@/libs/jieba'
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
