<script setup lang="ts">
const props = defineProps<{
  type: 'category' | 'tag'
  value: string
  page: number
}>()

const appConfig = useAppConfig()
const runtimeConfig = useRuntimeConfig()
const typeLabel = props.type === 'category' ? '分类' : '标签'
const typePath = props.type === 'category' ? 'categories' : 'tags'
const basePath = `/${typePath}/${safeSlug(props.value)}`
const offset = getPaginationOffset(props.page)

const { data } = await useAsyncData(
  `${props.type}-${safeSlug(props.value)}-posts-page-${props.page}`,
  async () => {
    const allPosts = await queryCollection('posts')
      .where('draft', '<>', true)
      .order('date', 'DESC')
      .all()
    const matchingPosts = allPosts.filter((post) => props.type === 'category'
      ? post.category === props.value
      : post.tags?.includes(props.value))

    return {
      total: matchingPosts.length,
      posts: matchingPosts.slice(offset, offset + POSTS_PER_PAGE)
    }
  }
)

const posts = computed(() => data.value?.posts || [])
const totalPages = computed(() => getTotalPages(data.value?.total || 0))

if (props.page > totalPages.value) {
  throw createError({ statusCode: 404, message: `${typeLabel}分页不存在` })
}

const currentPath = getPaginationPath(basePath, props.page)
const canonical = `${runtimeConfig.public.siteUrl}${currentPath}`
const pageSuffix = props.page > 1 ? ` · 第 ${props.page} 页` : ''
const description = props.type === 'category'
  ? `浏览 ${props.value} 分类下的文章`
  : `浏览带有 ${props.value} 标签的文章`

useSeoMeta({
  title: `${props.value} | ${typeLabel}${pageSuffix} | ${appConfig.site.name}`,
  description: `${description}${props.page > 1 ? `，第 ${props.page} 页` : ''}。`
})

useHead({
  link: [
    { rel: 'canonical', href: canonical },
    ...(props.page > 1
      ? [{ rel: 'prev', href: `${runtimeConfig.public.siteUrl}${getPaginationPath(basePath, props.page - 1)}` }]
      : []),
    ...(props.page < totalPages.value
      ? [{ rel: 'next', href: `${runtimeConfig.public.siteUrl}${getPaginationPath(basePath, props.page + 1)}` }]
      : [])
  ]
})
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <header class="mb-8">
      <p class="text-sm font-semibold uppercase tracking-[0.24em] accent-text">{{ type === 'category' ? 'Category' : 'Tag' }}</p>
      <h1 class="mt-2 text-4xl font-black tracking-normal">{{ type === 'tag' ? '# ' : '' }}{{ value }}</h1>
      <p v-if="page > 1" class="mt-3 text-muted">当前为第 {{ page }} 页。</p>
    </header>

    <div class="grid gap-4">
      <ArticleCard v-for="post in posts" :key="post.path" :article="post" />
    </div>

    <PaginationNav :current-page="page" :total-pages="totalPages" :base-path="basePath" />
  </div>
</template>
