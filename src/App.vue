<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { TextArea } from '@/components/ui/textarea'
import { ThemeToggle } from '@/components/widgets'
</script>

<template>
    <div class="flex items-center justify-center min-h-screen p-4 bg-background">
        <Card class="w-full max-w-md h-[calc(100vh-2rem)]">
            <CardHeader>
                <CardTitle class="text-2xl font-bold text-center text-primary">
                    Web Word Segmentation
                    <ThemeToggle />
                </CardTitle>
            </CardHeader>
            <CardContent class="flex flex-col h-[calc(100%-5rem)]">
                <div class="flex flex-col space-y-4 h-full">
                    <TextArea
                        placeholder="Enter text to segment..."
                        class="flex-grow h-full resize-none"
                    />
                    <div class="flex items-center justify-between">
                        <Button>Segment</Button>
                        <div class="flex items-center space-x-2">
                            <Checkbox class="flex items-center space-x-2" />
                            <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Auto Segment
                            </label>
                        </div>
                    </div>
                    <TextArea
                        readonly
                        class="flex-grow h-full resize-none"
                    />
                </div>
            </CardContent>
        </Card>
    </div>
</template>
