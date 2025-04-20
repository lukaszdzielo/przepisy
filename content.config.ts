import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        recipes: defineCollection({
            type: 'page',
            source: '*.md',
            schema: z.object({
                imgs: z.array(z.string()),
                time: z.string(),
                tags: z.array(z.string()),
                categories: z.array(z.string()),
                attributes: z.array(z.string()),
                ebook: z.array(z.string()),
            })
        })
    }
})