import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        recipes: defineCollection({
            source: '*.md',
            type: 'page',
            schema: z.object({
                time: z.string(),
                image: z.string(),
                tags: z.array(z.string()),
                categories: z.string(),
                attributes: z.string(),
            })
        })
    }
})