<script setup lang="ts">
import { CalendarDays, Clock3, Folder, Tag } from '@lucide/vue'
import type { BlogDoc } from '~/utils/content'

defineProps<{
  article: BlogDoc
  compact?: boolean
}>()
</script>

<template>
  <article class="group rounded-lg border border-line/70 bg-panel p-5 transition hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-xl hover:shadow-slate-950/5">
    <div class="flex flex-col gap-4 sm:flex-row">
      <NuxtImg v-if="article.cover && !compact" :src="article.cover" :alt="article.title" class="h-36 w-full rounded-md object-cover sm:w-52" sizes="sm:100vw md:220px" />
      <div class="min-w-0 flex-1">
        <div class="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span class="inline-flex items-center gap-1"><CalendarDays class="h-3.5 w-3.5" />{{ formatDate(article.date) }}</span>
          <span class="inline-flex items-center gap-1"><Clock3 class="h-3.5 w-3.5" />{{ estimateReadingMinutes(article) }} min</span>
          <NuxtLink v-if="article.category" class="inline-flex items-center gap-1 hover:text-accent" :to="`/categories/${safeSlug(article.category)}`">
            <Folder class="h-3.5 w-3.5" />{{ article.category }}
          </NuxtLink>
        </div>
        <NuxtLink :to="article.path" class="focus-ring block rounded-control">
          <h2 class="text-xl font-bold tracking-normal transition group-hover:text-accent">{{ article.title }}</h2>
        </NuxtLink>
        <p class="mt-3 line-clamp-2 text-sm leading-7 text-muted">{{ article.description }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <NuxtLink
            v-for="tag in article.tags"
            :key="tag"
            :to="`/tags/${safeSlug(tag)}`"
            class="focus-ring inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-xs text-muted transition hover:border-accent hover:text-accent"
          >
            <Tag class="h-3 w-3" />{{ tag }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </article>
</template>
