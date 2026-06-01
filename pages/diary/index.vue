<script setup lang="ts">
const { data: diaries } = await useAsyncData('diary-list', () => queryCollection('diaries')
  .where('draft', '<>', true)
  .order('date', 'DESC')
  .all())

useSeoMeta({
  title: '日记 | U232C Blog',
  description: '更轻、更日常的记录。'
})
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <header class="mb-8">
      <p class="text-sm font-semibold uppercase tracking-[0.24em] accent-text">Diary</p>
      <h1 class="mt-2 text-4xl font-black tracking-normal">日记</h1>
      <p class="mt-3 max-w-2xl text-muted">放一些不一定完整，但足够真实的短记录。</p>
    </header>

    <div class="grid gap-4 md:grid-cols-2">
      <ArticleCard v-for="diary in diaries" :key="diary.path" :article="diary" compact />
    </div>
  </div>
</template>
