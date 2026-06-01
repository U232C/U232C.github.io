<script setup lang="ts">
const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const { data: article } = await useAsyncData(`post-${route.path}`, () => queryCollection('posts').path(route.path).first())

if (!article.value || article.value.draft) {
  throw createError({ statusCode: 404, statusMessage: '文章不存在' })
}

const tocLinks = computed(() => ((article.value?.body as any)?.toc?.links || []))
const canonical = computed(() => `${runtimeConfig.public.siteUrl}${route.path}`)

useSeoMeta({
  title: `${article.value.title} | U232C Blog`,
  description: article.value.description,
  ogTitle: article.value.title,
  ogDescription: article.value.description,
  ogType: 'article',
  ogImage: article.value.cover,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: canonical.value }],
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.value.title,
      description: article.value.description,
      datePublished: article.value.date,
      dateModified: article.value.updated || article.value.date,
      author: { '@type': 'Person', name: 'U232C' },
      mainEntityOfPage: canonical.value
    })
  }]
})
</script>

<template>
  <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
    <article class="min-w-0 rounded-lg border border-line/70 bg-panel p-5 sm:p-8">
      <header class="mb-8">
        <div class="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span>{{ formatDate(article.date) }}</span>
          <span>{{ estimateReadingMinutes(article) }} min read</span>
          <NuxtLink v-if="article.category" class="hover:text-accent" :to="`/categories/${safeSlug(article.category)}`">{{ article.category }}</NuxtLink>
        </div>
        <h1 class="text-4xl font-black leading-tight tracking-normal sm:text-5xl">{{ article.title }}</h1>
        <p class="mt-4 text-lg leading-8 text-muted">{{ article.description }}</p>
        <NuxtImg v-if="article.cover" :src="article.cover" :alt="article.title" class="mt-8 max-h-[420px] w-full rounded-lg object-cover" sizes="sm:100vw lg:900px" />
        <div class="mt-5 flex flex-wrap gap-2">
          <NuxtLink v-for="tag in article.tags" :key="tag" :to="`/tags/${safeSlug(tag)}`" class="focus-ring rounded-full border border-line px-3 py-1 text-xs text-muted hover:border-accent hover:text-accent">
            # {{ tag }}
          </NuxtLink>
        </div>
      </header>

      <ContentRenderer class="content-prose" :value="article" />
      <GiscusComments />
    </article>
    <TableOfContents :links="tocLinks" />
    <BackToTop />
  </div>
</template>
