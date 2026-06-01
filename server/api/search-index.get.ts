import { extractText, estimateReadingMinutes } from '~/utils/content'

export default defineEventHandler(async (event) => {
  const [posts, diaries] = await Promise.all([
    queryCollection(event, 'posts').where('draft', '<>', true).order('date', 'DESC').all(),
    queryCollection(event, 'diaries').where('draft', '<>', true).order('date', 'DESC').all()
  ])

  return [...posts, ...diaries].map((item) => ({
    id: item.path,
    title: item.title,
    description: item.description,
    path: item.path,
    date: item.date,
    category: item.category || '随笔',
    tags: item.tags || [],
    text: extractText(item.body),
    type: item.path.startsWith('/diary') ? 'diary' : 'post',
    readingMinutes: estimateReadingMinutes(item)
  }))
})
