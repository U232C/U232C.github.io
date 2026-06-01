<script setup lang="ts">
import { Code2, Rss } from '@lucide/vue'

const appConfig = useAppConfig()
</script>

<template>
  <footer class="mx-auto mt-10 w-full max-w-7xl px-4 pb-10 pt-6 text-sm text-muted sm:px-6 lg:px-8">
    <div class="flex flex-col gap-4 border-t border-line/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p>© {{ new Date().getFullYear() }} {{ appConfig.site.author }}. Built with Nuxt 3.</p>
      <div class="flex items-center gap-3">
        <a class="focus-ring rounded-control p-2 transition hover:bg-panelMuted hover:text-ink" href="https://github.com/U232C/myweb" target="_blank" rel="noreferrer" aria-label="GitHub 仓库">
          <Code2 class="h-4 w-4" />
        </a>
        <NuxtLink class="focus-ring rounded-control p-2 transition hover:bg-panelMuted hover:text-ink" to="/rss.xml" aria-label="RSS 订阅">
          <Rss class="h-4 w-4" />
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
