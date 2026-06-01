<script setup lang="ts">
import { ListTree } from '@lucide/vue'

const props = defineProps<{
  links?: Array<{ id: string, text: string, depth: number, children?: Array<{ id: string, text: string, depth: number }> }>
}>()

const activeId = ref('')

const flatLinks = computed(() => {
  const result: Array<{ id: string, text: string, depth: number }> = []
  for (const link of props.links || []) {
    result.push(link)
    for (const child of link.children || []) result.push(child)
  }
  return result
})

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting)
    if (visible[0]?.target?.id) activeId.value = visible[0].target.id
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0.1 })

  flatLinks.value.forEach((link) => {
    const element = document.getElementById(link.id)
    if (element) observer.observe(element)
  })

  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <aside v-if="flatLinks.length" class="surface sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-auto rounded-lg p-4 lg:block">
    <div class="mb-3 flex items-center gap-2 text-sm font-semibold">
      <ListTree class="h-4 w-4 accent-text" />
      <span>目录</span>
    </div>
    <nav class="grid gap-1 text-sm">
      <a
        v-for="link in flatLinks"
        :key="link.id"
        class="focus-ring rounded-control px-2 py-1.5 text-muted transition hover:bg-panelMuted hover:text-ink"
        :class="[activeId === link.id ? 'bg-panelMuted !text-accent' : '', link.depth > 2 ? 'ml-4 text-xs' : '']"
        :href="`#${link.id}`"
      >
        {{ link.text }}
      </a>
    </nav>
  </aside>
</template>
