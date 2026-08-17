<script setup lang="ts">
import { AlertTriangle, Check, Clipboard, RefreshCw } from '@lucide/vue'
import type {
  CodeRendererDefinition,
  CodeRendererOptionValue,
  CodeRenderersConfig,
  InteractiveCodeRendererDefinition,
  RendererInstance
} from '~/types/code-renderers'
import { loadCodeRendererAdapter } from '~/utils/codeRendererAdapters'
import { parseRendererOptions } from '~/utils/codeRenderers'

const props = defineProps<{
  code: string
  rendererId: string
  language: string
  filename?: string
  meta?: string
}>()

const runtimeConfig = useRuntimeConfig()
const renderersConfig = runtimeConfig.public.codeRenderers as CodeRenderersConfig
const renderer = computed<CodeRendererDefinition | undefined>(() =>
  renderersConfig.renderers.find(item => item.id === props.rendererId)
)
const interactiveRenderer = computed<InteractiveCodeRendererDefinition | undefined>(() =>
  renderer.value?.mode === 'interactive' ? renderer.value : undefined
)
const options = computed<Record<string, CodeRendererOptionValue>>(() => {
  if (!renderer.value) return {}
  return parseRendererOptions(props.meta, renderer.value, true)
})
const height = computed(() => {
  const value = options.value.height
  return typeof value === 'number' ? value : 420
})
const title = computed(() => props.filename || props.language || renderer.value?.label || 'code')

const target = ref<HTMLElement>()
const status = ref<'loading' | 'ready' | 'error'>('loading')
const errorMessage = ref('')
const copied = ref(false)
let instance: RendererInstance | undefined
let resizeObserver: ResizeObserver | undefined
let runId = 0

function disposeRenderer() {
  resizeObserver?.disconnect()
  resizeObserver = undefined
  instance?.dispose()
  instance = undefined
}

async function mountRenderer() {
  const currentRun = ++runId
  disposeRenderer()
  status.value = 'loading'
  errorMessage.value = ''

  try {
    const definition = interactiveRenderer.value
    if (!definition || !definition.enabled) {
      throw new Error(`交互式代码解析器未注册或已禁用：${props.rendererId}`)
    }
    if (!target.value) {
      throw new Error('交互式代码容器尚未就绪')
    }

    const module = await loadCodeRendererAdapter(definition.adapter)
    if (currentRun !== runId) return

    instance = await module.default.mount({
      target: target.value,
      code: props.code,
      options: options.value
    })
    if (currentRun !== runId) {
      instance.dispose()
      instance = undefined
      return
    }

    resizeObserver = new ResizeObserver(() => instance?.resize())
    resizeObserver.observe(target.value)
    status.value = 'ready'
  } catch (error: unknown) {
    if (currentRun !== runId) return
    disposeRenderer()
    errorMessage.value = error instanceof Error ? error.message : String(error)
    status.value = 'error'
  }
}

async function copyCode() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1400)
}

onMounted(() => {
  if (interactiveRenderer.value) {
    mountRenderer()
  }
})
onBeforeUnmount(() => {
  runId += 1
  disposeRenderer()
})
</script>

<template>
  <div
    class="my-6 overflow-hidden rounded-lg border"
    :class="interactiveRenderer ? 'border-line bg-panel' : 'border-line bg-slate-950 text-slate-100'"
  >
    <div
      class="flex items-center justify-between gap-3 border-b px-4 py-2 text-xs"
      :class="interactiveRenderer
        ? 'border-line bg-panelMuted text-muted'
        : 'border-slate-800 text-slate-400'"
    >
      <span class="min-w-0 truncate font-medium">{{ title }}</span>
      <div class="flex shrink-0 items-center gap-2">
        <span>{{ renderer?.label || rendererId }}</span>
        <button
          class="focus-ring inline-flex items-center gap-1 rounded px-2 py-1 hover:bg-slate-800 hover:text-slate-100"
          type="button"
          aria-label="复制代码"
          @click="copyCode"
        >
          <Check v-if="copied" class="h-3.5 w-3.5" aria-hidden="true" />
          <Clipboard v-else class="h-3.5 w-3.5" aria-hidden="true" />
          <span>{{ copied ? 'Copied' : 'Copy' }}</span>
        </button>
      </div>
    </div>

    <template v-if="interactiveRenderer">
      <div class="relative" :style="{ minHeight: `${height}px` }">
        <div
          ref="target"
          class="code-renderer-host w-full bg-panel text-ink"
          :aria-label="title"
          :style="{ height: `${height}px` }"
        />
        <div
          v-if="status === 'loading'"
          class="absolute inset-0 grid place-items-center bg-panel text-sm text-muted"
          role="status"
        >
          <div class="px-4 text-center">
            <p>正在加载 {{ renderer?.label || rendererId }}…</p>
            <p class="mt-1 text-xs">若预览未显示，请确认浏览器已启用 JavaScript。</p>
          </div>
        </div>
        <div
          v-else-if="status === 'error'"
          class="absolute inset-0 grid place-items-center bg-panel p-6"
          role="alert"
        >
          <div class="max-w-xl text-center">
            <AlertTriangle class="mx-auto h-7 w-7 text-amber-500" aria-hidden="true" />
            <p class="mt-3 font-medium">预览渲染失败</p>
            <p class="mt-2 break-words text-sm leading-6 text-muted">{{ errorMessage }}</p>
            <button
              class="focus-ring mt-4 inline-flex items-center gap-2 rounded-control border border-line px-3 py-2 text-sm hover:border-accent hover:text-accent"
              type="button"
              @click="mountRenderer"
            >
              <RefreshCw class="h-4 w-4" aria-hidden="true" />
              重试
            </button>
          </div>
        </div>
      </div>

      <details
        class="border-t border-line bg-slate-950 text-slate-100"
        :open="renderer?.presentation.source === 'expanded' || status === 'error'"
      >
        <summary class="focus-ring cursor-pointer px-4 py-2 text-xs text-slate-400 hover:text-slate-200">
          查看 {{ language }} 源码
        </summary>
        <pre class="overflow-x-auto p-4 text-sm leading-7"><slot /></pre>
      </details>
    </template>

    <pre v-else class="overflow-x-auto p-4 text-sm leading-7"><slot /></pre>
  </div>
</template>
