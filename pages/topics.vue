<script setup lang="ts">
import { Folder, Tag } from '@lucide/vue'

type TopicCount = {
  name: string
  count: number
}

const appConfig = useAppConfig()
const runtimeConfig = useRuntimeConfig()

function countTopics(values: string[]): TopicCount[] {
  const counts = new Map<string, number>()

  for (const value of values) {
    if (!value) continue
    counts.set(value, (counts.get(value) || 0) + 1)
  }

  return Array.from(counts, ([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'))
}

const { data } = await useAsyncData('topics-overview', async () => {
  const posts = await queryCollection('posts')
    .where('draft', '<>', true)
    .all()

  return {
    categories: countTopics(posts.map(post => post.category)),
    tags: countTopics(posts.flatMap(post => Array.from(new Set(post.tags || []))))
  }
})

const categories = computed(() => data.value?.categories || [])
const tags = computed(() => data.value?.tags || [])

useSeoMeta({
  title: `主题 | ${appConfig.site.name}`,
  description: `集中浏览 ${appConfig.site.name} 的全部文章分类、标签及对应文章数量。`
})

useHead({
  link: [
    { rel: 'canonical', href: `${runtimeConfig.public.siteUrl}/topics` }
  ]
})
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <header class="mb-8">
      <p class="text-sm font-semibold uppercase tracking-[0.24em] accent-text">Topics</p>
      <h1 class="mt-2 text-4xl font-black tracking-normal">分类与标签</h1>
      <p class="mt-3 max-w-2xl leading-7 text-muted">
        按主题浏览全部已发布文章，从分类找到方向，再用标签定位具体内容。
      </p>
    </header>

    <div class="grid gap-6 lg:grid-cols-2">
      <section class="surface min-w-0 rounded-lg p-5 sm:p-6" aria-labelledby="categories-heading">
        <div class="flex items-center justify-between gap-4 border-b border-line/70 pb-4">
          <div class="flex min-w-0 items-center gap-3">
            <Folder class="h-5 w-5 shrink-0 accent-text" aria-hidden="true" />
            <h2 id="categories-heading" class="text-xl font-bold tracking-normal">全部分类</h2>
          </div>
          <span class="shrink-0 text-sm text-muted">{{ categories.length }} 个</span>
        </div>

        <ul v-if="categories.length" class="mt-4 grid gap-2">
          <li v-for="category in categories" :key="category.name">
            <NuxtLink
              :to="`/categories/${safeSlug(category.name)}`"
              class="focus-ring flex min-w-0 items-center justify-between gap-4 rounded-control border border-line/70 px-4 py-3 transition hover:border-accent hover:bg-panelMuted"
            >
              <span class="min-w-0 break-words font-semibold">{{ category.name }}</span>
              <span class="shrink-0 text-sm text-muted">{{ category.count }} 篇</span>
            </NuxtLink>
          </li>
        </ul>
        <p v-else class="mt-4 rounded-control bg-panelMuted px-4 py-5 text-sm leading-6 text-muted">
          暂无可浏览的文章分类。
        </p>
      </section>

      <section class="surface min-w-0 rounded-lg p-5 sm:p-6" aria-labelledby="tags-heading">
        <div class="flex items-center justify-between gap-4 border-b border-line/70 pb-4">
          <div class="flex min-w-0 items-center gap-3">
            <Tag class="h-5 w-5 shrink-0 accent-text" aria-hidden="true" />
            <h2 id="tags-heading" class="text-xl font-bold tracking-normal">全部标签</h2>
          </div>
          <span class="shrink-0 text-sm text-muted">{{ tags.length }} 个</span>
        </div>

        <ul v-if="tags.length" class="mt-4 grid gap-2">
          <li v-for="tag in tags" :key="tag.name">
            <NuxtLink
              :to="`/tags/${safeSlug(tag.name)}`"
              class="focus-ring flex min-w-0 items-center justify-between gap-4 rounded-control border border-line/70 px-4 py-3 transition hover:border-accent hover:bg-panelMuted"
            >
              <span class="min-w-0 break-words font-semibold"># {{ tag.name }}</span>
              <span class="shrink-0 text-sm text-muted">{{ tag.count }} 篇</span>
            </NuxtLink>
          </li>
        </ul>
        <p v-else class="mt-4 rounded-control bg-panelMuted px-4 py-5 text-sm leading-6 text-muted">
          暂无可浏览的文章标签。
        </p>
      </section>
    </div>
  </div>
</template>
