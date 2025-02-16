<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'
import { computed } from 'vue'

const { system, store } = useColorMode({
    disableTransition: false,
})

const mode = computed(() => store.value === 'auto' ? system.value : store.value)

const toggleTheme = () => {
    const nextTheme = mode.value === 'dark' ? 'light' : 'dark'
    store.value = nextTheme === system.value ? 'auto' : nextTheme
}
</script>

<template>
    <Button variant="ghost" shape="round" class="rounded-full aspect-[1/1]" @click="toggleTheme">
        <Icon icon="radix-icons:sun" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icon icon="radix-icons:moon" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
    </Button>
</template>
