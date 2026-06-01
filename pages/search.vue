<script setup lang="ts">
import MiniSearch from 'minisearch'
import { Search } from '@lucide/vue'

type SearchItem = {
  id: string
  title: string
  description: string
  path: string
  date: string
  category: string
  tags: string[]
  text: string
  type: string
}

const query = ref('')
const category = ref('')
const tag = ref('')
const sort = ref<'relevance' | 'newest'>('relevance')
const { data: indexData } = await useFetch<SearchItem[]>('/api/search-index')

const categories = computed(() => uniqueSorted((indexData.value || []).map((item) => item.category)))
const tags = computed(() => uniqueSorted((indexData.value || []).flatMap((item) => item.tags)))

const miniSearch = computed(() => {
  const instance = new MiniSearch<SearchItem>({
    fields: ['title', 'description', 'text', 'category', 'tags'],
    storeFields: ['title', 'description', 'path', 'date', 'category', 'tags', 'type']
  })
  instance.addAll(indexData.value || [])
  return instance
})

const results = computed(() => {
  const source = query.value.trim()
    ? miniSearch.value.search(query.value, { prefix: true, fuzzy: 0.18 })
    : (indexData.value || []).map((item) => ({ ...item, score: 1 }))

  const filtered = source
    .filter((item) => !category.value || item.category === category.value)
    .filter((item) => !tag.value || item.tags?.includes(tag.value))

  return sort.value === 'newest'
    ? filtered.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    : filtered
})

useSeoMeta({
  title: '搜索 | U232C Blog',
  description: '搜索文章、日记、分类和标签。'
})
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <header class="mb-8">
      <p class="text-sm font-semibold uppercase tracking-[0.24em] accent-text">Search</p>
      <h1 class="mt-2 text-4xl font-black tracking-normal">高级搜索</h1>
      <p class="mt-3 text-muted">本地索引搜索标题、正文、分类和标签，无需后端。</p>
    </header>

    <section class="surface rounded-lg p-4">
      <label class="flex items-center gap-3 rounded-control border border-line bg-panel px-3 py-2">
        <Search class="h-4 w-4 text-muted" />
        <input v-model="query" class="w-full bg-transparent py-1 outline-none" type="search" placeholder="搜索 Nuxt、数学、日记..." aria-label="搜索关键词">
      </label>
      <div class="mt-4 grid gap-3 md:grid-cols-3">
        <select v-model="category" class="focus-ring rounded-control border border-line bg-panel px-3 py-2 text-sm">
          <option value="">全部分类</option>
          <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
        </select>
        <select v-model="tag" class="focus-ring rounded-control border border-line bg-panel px-3 py-2 text-sm">
          <option value="">全部标签</option>
          <option v-for="item in tags" :key="item" :value="item">{{ item }}</option>
        </select>
        <select v-model="sort" class="focus-ring rounded-control border border-line bg-panel px-3 py-2 text-sm">
          <option value="relevance">按相关度</option>
          <option value="newest">按最新</option>
        </select>
      </div>
    </section>

    <div class="mt-6 grid gap-4">
      <NuxtLink
        v-for="item in results"
        :key="item.id"
        :to="item.path"
        class="focus-ring rounded-lg border border-line bg-panel p-5 transition hover:border-accent"
      >
        <p class="text-xs text-muted">{{ formatDate(item.date) }} · {{ item.category }} · {{ item.type }}</p>
        <h2 class="mt-2 text-xl font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm leading-7 text-muted">{{ item.description }}</p>
        <div class="mt-3 flex flex-wrap gap-2">
          <span v-for="itemTag in item.tags" :key="itemTag" class="rounded-full border border-line px-2 py-1 text-xs text-muted"># {{ itemTag }}</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
