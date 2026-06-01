<script setup lang="ts">
import { ArrowUp } from '@lucide/vue'

const visible = ref(false)
const update = () => {
  visible.value = window.scrollY > 600
}
const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', update)
})
</script>

<template>
  <button
    v-show="visible"
    class="focus-ring fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-line bg-panel text-muted shadow-lg transition hover:-translate-y-0.5 hover:text-ink"
    type="button"
    aria-label="返回顶部"
    @click="scrollTop"
  >
    <ArrowUp class="h-4 w-4" />
  </button>
</template>
