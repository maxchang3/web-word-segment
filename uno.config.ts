import { defineConfig, presetUno, transformerDirectives } from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { presetShadcn } from 'unocss-preset-shadcn'

export default defineConfig({
    presets: [
        presetUno(),
        presetAnimations(),
        presetShadcn({
            color: 'neutral',
        }),
    ],
    // By default, `.ts` and `.js` files are NOT extracted.
    // If you want to extract them, use the following configuration.
    // It's necessary to add the following configuration if you use shadcn-vue or shadcn-svelte.
    content: {
        pipeline: {
            include: [
                // the default
                /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
                // include js/ts files
                '(components|src)/**/*.{js,ts}',
            ],
        },
    },
    transformers: [
        transformerDirectives(),
    ],
    theme: {
        colors: {
            selected: 'hsl(var(--selected))',
        },
    },
})
