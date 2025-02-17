<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'
</script>

<template>
    <a href="https://github.com/maxchang3/web-word-segment" target="_blank">
        <Button variant="ghost" shape="round" class="rounded-full aspect-[1/1]">
            <Icon icon="radix-icons:github-logo" class="h-[1.2rem] w-[1.2rem] transition-all" />
            <span class="sr-only">Open GitHub repository</span>
        </Button>
    </a>
</template>
