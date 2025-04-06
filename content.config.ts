import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        recipes: defineCollection({
            source: '*.md',
            type: 'page',
            schema: z.object({
                img: z.string(),
                time: z.string(),
                tags: z.array(z.string()),
                categories: z.string(),
                attributes: z.string(),
            })
        })
    }
})