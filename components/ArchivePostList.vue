<script setup lang="ts">
const props = defineProps<{
  page: number
}>()

const appConfig = useAppConfig()
const runtimeConfig = useRuntimeConfig()
const basePath = '/archive'
const offset = getPaginationOffset(props.page)

const { data } = await useAsyncData(`archive-posts-page-${props.page}`, async () => {
  const [total, posts] = await Promise.all([
    queryCollection('posts')
      .where('draft', '<>', true)
      .count('*'),
    queryCollection('posts')
      .where('draft', '<>', true)
      .order('date', 'DESC')
      .skip(offset)
      .limit(POSTS_PER_PAGE)
      .all()
  ])

  return { total, posts }
})

const posts = computed(() => data.value?.posts || [])
const totalPages = computed(() => getTotalPages(data.value?.total || 0))

if (props.page > totalPages.value) {
  throw createError({ statusCode: 404, message: '归档分页不存在' })
}

const grouped = computed(() => groupByYear(posts.value))
const years = computed(() => Object.keys(grouped.value).sort((a, b) => Number(b) - Number(a)))
const currentPath = getPaginationPath(basePath, props.page)
const canonical = `${runtimeConfig.public.siteUrl}${currentPath}`
const pageSuffix = props.page > 1 ? ` · 第 ${props.page} 页` : ''

useSeoMeta({
  title: `归档${pageSuffix} | ${appConfig.site.name}`,
  description: props.page > 1
    ? `按时间线浏览 ${appConfig.site.name} 的全部文章，第 ${props.page} 页。`
    : `按时间线浏览 ${appConfig.site.name} 的全部文章。`
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
      <p class="text-sm font-semibold uppercase tracking-[0.24em] accent-text">Archive</p>
      <h1 class="mt-2 text-4xl font-black tracking-normal">文章时间线</h1>
      <p class="mt-3 max-w-2xl text-muted">
        所有文章按年份倒序排列，像翻一份有序的工程笔记。<span v-if="page > 1">当前为第 {{ page }} 页。</span>
      </p>
    </header>

    <div class="space-y-10">
      <section v-for="year in years" :key="year" class="grid gap-4 md:grid-cols-[120px_1fr]">
        <h2 class="text-3xl font-black accent-text">{{ year }}</h2>
        <div class="relative space-y-4 border-l border-line pl-6">
          <NuxtLink
            v-for="post in grouped[year]"
            :key="post.path"
            :to="post.path"
            class="focus-ring relative block rounded-lg border border-line bg-panel p-4 transition hover:border-accent hover:shadow-lg"
          >
            <span class="absolute -left-[31px] top-5 h-3 w-3 rounded-full border-2 border-bg bg-accent" />
            <p class="text-xs text-muted">{{ formatDate(post.date) }} · {{ post.category }}</p>
            <h3 class="mt-1 text-lg font-bold">{{ post.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-muted">{{ post.description }}</p>
          </NuxtLink>
        </div>
      </section>
    </div>

    <PaginationNav :current-page="page" :total-pages="totalPages" :base-path="basePath" />
  </div>
</template>
