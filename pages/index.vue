<script setup lang="ts">
const appConfig = useAppConfig()

const { data: posts } = await useAsyncData('home-posts', () => queryCollection('posts')
  .where('draft', '<>', true)
  .order('date', 'DESC')
  .limit(6)
  .all())

const { data: diaries } = await useAsyncData('home-diaries', () => queryCollection('diaries')
  .where('draft', '<>', true)
  .order('date', 'DESC')
  .limit(3)
  .all())

useSeoMeta({
  title: appConfig.site.name,
  description: appConfig.site.description,
  ogTitle: appConfig.site.name,
  ogDescription: appConfig.site.description,
  ogType: 'website'
})
</script>

<template>
  <div class="space-y-10">
    <BannerCarousel />

    <section class="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.24em] accent-text">Latest</p>
            <h2 class="mt-2 text-2xl font-black tracking-normal">最近文章</h2>
          </div>
          <NuxtLink class="focus-ring rounded-control px-3 py-2 text-sm text-muted transition hover:bg-panelMuted hover:text-ink" to="/archive">查看全部</NuxtLink>
        </div>
        <div class="grid gap-4">
          <ArticleCard v-for="post in posts" :key="post.path" :article="post" />
        </div>
      </div>

      <aside class="space-y-6">
        <section class="surface rounded-lg p-4">
          <h2 class="text-lg font-bold tracking-normal">日记片段</h2>
          <div class="mt-4 grid gap-3">
            <NuxtLink
              v-for="diary in diaries"
              :key="diary.path"
              :to="diary.path"
              class="focus-ring rounded-control border border-line/70 p-3 transition hover:border-accent hover:bg-panelMuted"
            >
              <p class="text-xs text-muted">{{ formatDate(diary.date) }}</p>
              <p class="mt-1 font-semibold">{{ diary.title }}</p>
              <p class="mt-2 line-clamp-2 text-sm leading-6 text-muted">{{ diary.description }}</p>
            </NuxtLink>
          </div>
        </section>
      </aside>
    </section>
  </div>
</template>
