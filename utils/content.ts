export type BlogDoc = {
  title: string
  description: string
  path: string
  date?: string | Date
  updated?: string | Date
  category?: string
  tags?: string[]
  cover?: string
  draft?: boolean
  pinned?: boolean
  body?: unknown
}

export function formatDate(input?: string | Date) {
  if (!input) return ''
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(input))
}

export function estimateReadingMinutes(doc: Partial<BlogDoc>) {
  const text = `${doc.title || ''} ${doc.description || ''} ${extractText(doc.body)}`.trim()
  const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length
  const words = text.replace(/[\u4e00-\u9fff]/g, ' ').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil((cjk + words) / 420))
}

export function extractText(value: unknown): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map(extractText).join(' ')
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>
    return Object.values(record).map(extractText).join(' ')
  }
  return ''
}

export function uniqueSorted(values: Array<string | undefined>) {
  return Array.from(new Set(values.filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b, 'zh-CN'))
}

export function groupByYear<T extends { date?: string | Date }>(items: T[]) {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const year = item.date ? String(new Date(item.date).getFullYear()) : '未归档'
    groups[year] ||= []
    groups[year].push(item)
    return groups
  }, {})
}

export function safeSlug(value: string) {
  return encodeURIComponent(value)
}
