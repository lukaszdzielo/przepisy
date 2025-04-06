import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        recipes: defineCollection({
            source: '*.md',
            type: 'page',
            schema: z.object({
                imgs: z.array(z.string()),
                time: z.string(),
                tags: z.array(z.string()),
                categories: z.array(z.string()),
                attributes: z.array(z.string()),
            })
        })
    }
})