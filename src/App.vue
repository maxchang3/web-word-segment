<script setup lang="ts">
import { Button, Tag } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TextArea } from '@/components/ui/textarea'
import { ToastAction, Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'
import { Github, ThemeToggle } from '@/components/widgets'
import { jieba } from '@/libs/jieba'
import { useClipboard, useDebounceFn, useUrlSearchParams } from '@vueuse/core'
import { h, ref } from 'vue'

const { toast } = useToast()
const { copy } = useClipboard({ legacy: true })
const params = useUrlSearchParams('history')

const URLText = decodeURIComponent(
    Array.isArray(params.text)
        ? params.text.join('')
        : (params.text as string | undefined) ?? '',
)

const inputText = ref(URLText)
const segmented = ref<string[]>([])
const selectedIndices = ref(new Set<number>())
const autoSegment = ref(true)
const jiebaLoaded = ref(false)

const segment = useDebounceFn(async () => {
    if (!jiebaLoaded.value) return
    segmented.value = await jieba.cut(inputText.value)
    selectedIndices.value.clear()
}, 500)

const clearInput = () => {
    inputText.value = ''
    segmented.value = []
    selectedIndices.value.clear()
}

const resetSelect = () => {
    selectedIndices.value.clear()
}

const handleInput = () => {
    if (!autoSegment.value) return
    segment()
}

const copyToClipboard = () => {
    let result = ''
    for (let i = 0; i < segmented.value.length; i++) {
        if (selectedIndices.value.has(i)) {
            result += segmented.value[i]
        }
    }
    copy(result)
        .then(() => {
            toast({
                title: '复制成功！',
                description: `已复制 ${result.length} 个字符到剪贴板。`,
            })
        })
        .catch((e) => {
            toast({
                title: '复制失败！',
                description: e?.message ?? '未知错误。',
                variant: 'destructive',
                action: h(ToastAction, {
                    altText: '点击重试',
                    onClickCapture: copyToClipboard,
                }),
            })
        })
}

const switchSelectState = (index: number) => {
    if (selectedIndices.value.has(index)) {
        selectedIndices.value.delete(index)
    } else {
        selectedIndices.value.add(index)
    }
}

jieba.init().then(() => {
    jiebaLoaded.value = true
    segment()
})
</script>

<template>
    <Toaster />
    <div class="flex items-center justify-center min-h-screen p-4 bg-background">
        <Card class="w-full max-w-md h-[calc(100vh-2rem)]">
            <CardHeader>
                <CardTitle class="text-2xl font-bold text-center text-primary flex justify-center items-center gap-1">
                    <Github />
                    在线中文分词
                    <ThemeToggle />
                </CardTitle>
                <CardDescription class="text-sm text-center">
                    基于 <a href="https://github.com/fengkx/jieba-wasm" target="_blank">jieba-wasm</a> 本地运行，不会上传任何数据。
                </CardDescription>
            </CardHeader>
            <CardContent class="flex flex-col h-[calc(100%-7rem)]">
                <div class="h-full flex flex-col space-y-4">
                    <TextArea
                        v-model="inputText"
                        placeholder="输入文本进行分词..."
                        class="flex-grow resize-none min-h-30% max-h-30%"
                        @input="handleInput"
                    />
                    <div class="flex items-center flex-gap-4">
                        <Button variant="outline" @click="clearInput">
                            清空
                        </Button>
                        <Button variant="outline" @click="resetSelect">
                            重选
                        </Button>
                        <Button variant="outline" @click="copyToClipboard">
                            复制
                        </Button>
                    </div>
                    <ScrollArea class="flex-grow h-full border rounded-lg">
                        <Tag
                            v-for="(word, index) in segmented" :key="index"
                            class="m-1 overflow-hidden max-w-full truncate"
                            :variant="selectedIndices.has(index) ? 'active' : 'default'"
                            @click="switchSelectState(index)"
                        >
                            {{ word }}
                        </Tag>
                    </ScrollArea>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
