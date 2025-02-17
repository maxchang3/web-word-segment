<script setup lang="ts">
import type { PrimitiveProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import type { LabelVariants } from '.'
import { cn } from '@/libs/utils'
import { Primitive } from 'radix-vue'
import { labelVariants } from '.'

interface Props extends PrimitiveProps {
    variant?: LabelVariants['variant']
    size?: LabelVariants['size']
    class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
    as: 'button',
})
</script>

<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        :class="cn(labelVariants({ variant, size }), props.class)"
    >
        <slot />
    </Primitive>
</template>
