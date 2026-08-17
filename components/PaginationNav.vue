<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  basePath: string
}>()

const pages = computed(() => Array.from({ length: props.totalPages }, (_, index) => index + 1))
const previousPath = computed(() => getPaginationPath(props.basePath, props.currentPage - 1))
const nextPath = computed(() => getPaginationPath(props.basePath, props.currentPage + 1))
</script>

<template>
  <nav v-if="totalPages > 1" class="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="文章分页">
    <NuxtLink
      v-if="currentPage > 1"
      :to="previousPath"
      class="focus-ring inline-flex min-h-10 items-center gap-1 rounded-control border border-line bg-panel px-3 py-2 text-sm text-muted transition hover:border-accent hover:text-ink"
      rel="prev"
    >
      <ChevronLeft class="h-4 w-4" aria-hidden="true" />
      上一页
    </NuxtLink>
    <span
      v-else
      class="inline-flex min-h-10 cursor-not-allowed items-center gap-1 rounded-control border border-line/60 bg-panelMuted px-3 py-2 text-sm text-muted opacity-60"
      aria-disabled="true"
    >
      <ChevronLeft class="h-4 w-4" aria-hidden="true" />
      上一页
    </span>

    <NuxtLink
      v-for="page in pages"
      :key="page"
      :to="getPaginationPath(basePath, page)"
      class="focus-ring grid min-h-10 min-w-10 place-items-center rounded-control border px-3 py-2 text-sm transition"
      :class="page === currentPage ? 'border-accent bg-accent text-white' : 'border-line bg-panel text-muted hover:border-accent hover:text-ink'"
      :aria-current="page === currentPage ? 'page' : undefined"
      :aria-label="`第 ${page} 页`"
    >
      {{ page }}
    </NuxtLink>

    <NuxtLink
      v-if="currentPage < totalPages"
      :to="nextPath"
      class="focus-ring inline-flex min-h-10 items-center gap-1 rounded-control border border-line bg-panel px-3 py-2 text-sm text-muted transition hover:border-accent hover:text-ink"
      rel="next"
    >
      下一页
      <ChevronRight class="h-4 w-4" aria-hidden="true" />
    </NuxtLink>
    <span
      v-else
      class="inline-flex min-h-10 cursor-not-allowed items-center gap-1 rounded-control border border-line/60 bg-panelMuted px-3 py-2 text-sm text-muted opacity-60"
      aria-disabled="true"
    >
      下一页
      <ChevronRight class="h-4 w-4" aria-hidden="true" />
    </span>
  </nav>
</template>
