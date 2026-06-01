<script setup lang="ts">
import { Check, Clipboard } from '@lucide/vue'

const props = defineProps<{
  code?: string
  language?: string
  filename?: string
}>()

const copied = ref(false)

async function copyCode() {
  if (!props.code) return
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1400)
}
</script>

<template>
  <div class="my-6 overflow-hidden rounded-lg border border-line bg-slate-950 text-slate-100">
    <div class="flex items-center justify-between border-b border-slate-800 px-4 py-2 text-xs text-slate-400">
      <span>{{ filename || language || 'code' }}</span>
      <button class="focus-ring inline-flex items-center gap-1 rounded px-2 py-1 hover:bg-slate-800" type="button" @click="copyCode">
        <Check v-if="copied" class="h-3.5 w-3.5" />
        <Clipboard v-else class="h-3.5 w-3.5" />
        <span>{{ copied ? 'Copied' : 'Copy' }}</span>
      </button>
    </div>
    <pre class="overflow-x-auto p-4 text-sm leading-7"><slot /></pre>
  </div>
</template>
