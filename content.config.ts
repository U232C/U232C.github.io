import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  updated: z.date().optional(),
  category: z.string().default('随笔'),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  draft: z.boolean().default(false),
  pinned: z.boolean().default(false),
  banner: z.boolean().default(false)
})

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: {
        include: 'posts/**/*.md',
        prefix: '/blog'
      },
      schema: articleSchema
    }),
    diaries: defineCollection({
      type: 'page',
      source: {
        include: 'diaries/**/*.md',
        prefix: '/diary'
      },
      schema: articleSchema
    }),
    pages: defineCollection({
      type: 'page',
      source: 'pages/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string()
      })
    })
  }
})
