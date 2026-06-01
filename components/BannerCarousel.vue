<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'

const appConfig = useAppConfig()
const active = ref(0)
const banners = computed(() => appConfig.site.banners)
let timer: ReturnType<typeof setInterval> | undefined

const next = () => {
  active.value = (active.value + 1) % banners.value.length
}

const previous = () => {
  active.value = (active.value - 1 + banners.value.length) % banners.value.length
}

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduceMotion) timer = setInterval(next, 6000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section class="relative overflow-hidden rounded-lg border border-line/70 bg-panel">
    <div class="relative min-h-[420px] md:min-h-[480px]">
      <article
        v-for="(banner, index) in banners"
        :key="banner.title"
        class="absolute inset-0 grid transition duration-500 ease-out md:grid-cols-[1.05fr_0.95fr]"
        :class="index === active ? 'opacity-100' : 'pointer-events-none opacity-0'"
        aria-live="polite"
      >
        <div class="relative flex min-h-[260px] flex-col justify-end overflow-hidden p-6 sm:p-8 lg:p-10">
          <NuxtImg :src="banner.image" :alt="banner.title" class="absolute inset-0 h-full w-full object-cover" sizes="sm:100vw md:50vw lg:620px" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent" />
          <div class="relative max-w-2xl text-white">
            <p class="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-teal-100">Featured</p>
            <h1 class="text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl">{{ banner.title }}</h1>
            <p class="mt-4 max-w-xl text-base leading-7 text-slate-100">{{ banner.description }}</p>
            <NuxtLink class="focus-ring mt-6 inline-flex rounded-control bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-50" :to="banner.link">
              {{ banner.cta }}
            </NuxtLink>
          </div>
        </div>
        <div class="hidden flex-col justify-between bg-panel p-8 md:flex lg:p-10">
          <div>
            <p class="text-sm text-muted">当前横幅</p>
            <p class="mt-2 text-5xl font-black accent-text">{{ String(index + 1).padStart(2, '0') }}</p>
          </div>
          <div class="space-y-4">
            <p class="text-sm leading-7 text-muted">动态横幅由站点配置驱动，适合放置置顶文章、项目进展或近期写作主题。</p>
            <div class="flex gap-2">
              <span v-for="(_, dotIndex) in banners" :key="dotIndex" class="h-1.5 flex-1 rounded-full" :class="dotIndex === active ? 'bg-accent' : 'bg-line'" />
            </div>
          </div>
        </div>
      </article>
    </div>

    <div class="absolute bottom-4 right-4 flex gap-2">
      <button class="focus-ring grid h-10 w-10 place-items-center rounded-control bg-white/90 text-slate-950 transition hover:bg-white" type="button" aria-label="上一张横幅" @click="previous">
        <ChevronLeft class="h-4 w-4" />
      </button>
      <button class="focus-ring grid h-10 w-10 place-items-center rounded-control bg-white/90 text-slate-950 transition hover:bg-white" type="button" aria-label="下一张横幅" @click="next">
        <ChevronRight class="h-4 w-4" />
      </button>
    </div>
  </section>
</template>
