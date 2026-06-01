<script setup lang="ts">
const progress = ref(0)

const update = () => {
  if (!import.meta.client) return
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <div class="fixed left-0 top-0 z-50 h-1 bg-accent transition-[width]" :style="{ width: `${progress}%` }" />
</template>
