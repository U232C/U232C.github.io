<script setup lang="ts">
const route = useRoute()
const category = computed(() => decodeURIComponent(String(route.params.category)))
const { data: allPosts } = await useAsyncData('category-posts', () => queryCollection('posts')
  .where('draft', '<>', true)
  .order('date', 'DESC')
  .all())
const posts = computed(() => (allPosts.value || []).filter((post) => post.category === category.value))

useSeoMeta({
  title: `${category.value} | 分类 | U232C Blog`,
  description: `浏览 ${category.value} 分类下的文章。`
})
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <header class="mb-8">
      <p class="text-sm font-semibold uppercase tracking-[0.24em] accent-text">Category</p>
      <h1 class="mt-2 text-4xl font-black tracking-normal">{{ category }}</h1>
    </header>
    <div class="grid gap-4">
      <ArticleCard v-for="post in posts" :key="post.path" :article="post" />
    </div>
  </div>
</template>
