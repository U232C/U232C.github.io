<script setup lang="ts">
const props = defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
}>()

const runtimeConfig = useRuntimeConfig()
const rendererId = computed(() =>
  getMetaValue(props.meta, 'code-renderer')
  || runtimeConfig.public.codeRenderers.defaultRenderer
)
const originalLanguage = computed(() =>
  getMetaValue(props.meta, 'code-language') || props.language || 'text'
)
</script>

<template>
  <CodeRendererBlock
    v-if="code"
    :code="code"
    :filename="filename"
    :language="originalLanguage"
    :meta="meta"
    :renderer-id="rendererId"
  >
    <slot />
  </CodeRendererBlock>
  <pre v-else class="my-6 overflow-x-auto rounded-lg border border-line bg-slate-950 p-4 text-sm leading-7 text-slate-100"><slot /></pre>
</template>
