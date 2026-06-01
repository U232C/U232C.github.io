<script setup lang="ts">
const config = useRuntimeConfig()
const loaded = ref(false)
const root = ref<HTMLElement | null>(null)

onMounted(() => {
  const giscus = config.public.giscus
  if (!giscus.repoId || !giscus.categoryId || !root.value) return
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('data-repo', giscus.repo)
  script.setAttribute('data-repo-id', giscus.repoId)
  script.setAttribute('data-category', giscus.category)
  script.setAttribute('data-category-id', giscus.categoryId)
  script.setAttribute('data-mapping', giscus.mapping)
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  script.setAttribute('data-lang', 'zh-CN')
  script.onload = () => { loaded.value = true }
  root.value.appendChild(script)
})
</script>

<template>
  <section class="mt-10 rounded-lg border border-line/70 bg-panel p-5">
    <h2 class="text-lg font-bold">评论</h2>
    <div ref="root" class="mt-4" />
    <p v-if="!loaded && (!config.public.giscus.repoId || !config.public.giscus.categoryId)" class="mt-4 text-sm leading-7 text-muted">
      Giscus 位置已预留。启用 GitHub Discussions 后，将 repoId 和 categoryId 写入运行时配置即可加载评论。
    </p>
  </section>
</template>
