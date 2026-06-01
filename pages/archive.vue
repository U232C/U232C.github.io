<script setup lang="ts">
const { data: posts } = await useAsyncData('archive-posts', () => queryCollection('posts')
  .where('draft', '<>', true)
  .order('date', 'DESC')
  .all())

const grouped = computed(() => groupByYear(posts.value || []))
const years = computed(() => Object.keys(grouped.value).sort((a, b) => Number(b) - Number(a)))

useSeoMeta({
  title: '归档 | U232C Blog',
  description: '按时间线浏览 U232C Blog 的全部文章。'
})
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <header class="mb-8">
      <p class="text-sm font-semibold uppercase tracking-[0.24em] accent-text">Archive</p>
      <h1 class="mt-2 text-4xl font-black tracking-normal">文章时间线</h1>
      <p class="mt-3 max-w-2xl text-muted">所有文章按年份倒序排列，像翻一份有序的工程笔记。</p>
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
  </div>
</template>
