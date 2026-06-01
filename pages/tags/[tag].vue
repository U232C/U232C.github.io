<script setup lang="ts">
const route = useRoute()
const tag = computed(() => decodeURIComponent(String(route.params.tag)))
const { data: allPosts } = await useAsyncData('tag-posts', () => queryCollection('posts')
  .where('draft', '<>', true)
  .order('date', 'DESC')
  .all())
const posts = computed(() => (allPosts.value || []).filter((post) => post.tags?.includes(tag.value)))

useSeoMeta({
  title: `${tag.value} | 标签 | U232C Blog`,
  description: `浏览带有 ${tag.value} 标签的文章。`
})
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <header class="mb-8">
      <p class="text-sm font-semibold uppercase tracking-[0.24em] accent-text">Tag</p>
      <h1 class="mt-2 text-4xl font-black tracking-normal"># {{ tag }}</h1>
    </header>
    <div class="grid gap-4">
      <ArticleCard v-for="post in posts" :key="post.path" :article="post" />
    </div>
  </div>
</template>
