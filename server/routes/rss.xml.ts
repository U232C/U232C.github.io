import { Feed } from 'feed'
import { extractText } from '~/utils/content'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event)
  const siteUrl = runtimeConfig.public.siteUrl
  const posts = await queryCollection(event, 'posts')
    .where('draft', '<>', true)
    .order('date', 'DESC')
    .all()

  const feed = new Feed({
    title: 'U232C Blog',
    description: 'U232C 的个人博客订阅。',
    id: siteUrl,
    link: siteUrl,
    language: 'zh-CN',
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, U232C`,
    author: {
      name: 'U232C',
      link: siteUrl
    }
  })

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}${post.path}`,
      link: `${siteUrl}${post.path}`,
      description: post.description,
      content: extractText(post.body).slice(0, 1200),
      date: new Date(post.date)
    })
  }

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return feed.rss2()
})
