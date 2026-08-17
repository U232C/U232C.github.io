export const POSTS_PER_PAGE = 10

export function getTotalPages(totalItems: number, pageSize = POSTS_PER_PAGE) {
  return Math.max(1, Math.ceil(totalItems / pageSize))
}

export function getPaginationOffset(page: number, pageSize = POSTS_PER_PAGE) {
  return (page - 1) * pageSize
}

export function parsePaginationPage(value: unknown) {
  if (typeof value !== 'string' || !/^[1-9]\d*$/.test(value)) return null

  const page = Number(value)
  return Number.isSafeInteger(page) ? page : null
}

export function getPaginationPath(basePath: string, page: number) {
  const normalizedBasePath = basePath === '/' ? '' : basePath.replace(/\/$/, '')
  return page <= 1 ? normalizedBasePath || '/' : `${normalizedBasePath}/page/${page}`
}
