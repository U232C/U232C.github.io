<script setup lang="ts">
const route = useRoute()
const { data: diary } = await useAsyncData(`diary-${route.path}`, () => queryCollection('diaries').path(route.path).first())

if (!diary.value || diary.value.draft) {
  throw createError({ statusCode: 404, statusMessage: '日记不存在' })
}

const tocLinks = computed(() => ((diary.value?.body as any)?.toc?.links || []))

useSeoMeta({
  title: `${diary.value.title} | 日记 | U232C Blog`,
  description: diary.value.description
})
</script>

<template>
  <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
    <article class="min-w-0 rounded-lg border border-line/70 bg-panel p-5 sm:p-8">
      <header class="mb-8">
        <p class="text-sm text-muted">{{ formatDate(diary.date) }} · {{ estimateReadingMinutes(diary) }} min read</p>
        <h1 class="mt-3 text-4xl font-black tracking-normal">{{ diary.title }}</h1>
        <p class="mt-4 text-lg leading-8 text-muted">{{ diary.description }}</p>
      </header>
      <ContentRenderer class="content-prose" :value="diary" />
    </article>
    <TableOfContents :links="tocLinks" />
    <BackToTop />
  </div>
</template>
