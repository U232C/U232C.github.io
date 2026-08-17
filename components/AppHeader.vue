<script setup lang="ts">
import { Menu, Moon, Palette, Search, Sun, X } from '@lucide/vue'

const appConfig = useAppConfig()
const route = useRoute()
const { mode, toggleMode } = useThemePreferences()
const open = ref(false)
const appearanceOpen = ref(false)
const appearanceMenu = ref<HTMLElement | null>(null)
const appearanceButton = ref<HTMLButtonElement | null>(null)

const closeAppearance = (restoreFocus = false) => {
  appearanceOpen.value = false
  if (restoreFocus) {
    nextTick(() => appearanceButton.value?.focus())
  }
}

const toggleAppearance = () => {
  appearanceOpen.value = !appearanceOpen.value
  open.value = false
}

const toggleMenu = () => {
  open.value = !open.value
  appearanceOpen.value = false
}

onClickOutside(appearanceMenu, () => closeAppearance())

watch(() => route.fullPath, () => {
  open.value = false
  appearanceOpen.value = false
})
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line/70 bg-bg/82 backdrop-blur-xl">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="focus-ring flex items-center gap-3 rounded-control">
        <span class="grid h-9 w-9 place-items-center rounded-control bg-accent text-sm font-black text-white">U</span>
        <span class="font-bold tracking-normal">{{ appConfig.site.name }}</span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 md:flex" aria-label="主导航">
        <NuxtLink
          v-for="item in appConfig.site.nav"
          :key="item.to"
          :to="item.to"
          class="focus-ring rounded-control px-3 py-2 text-sm text-muted transition hover:bg-panelMuted hover:text-ink"
          active-class="!text-ink bg-panelMuted"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <NuxtLink
          to="/search"
          class="focus-ring hidden h-10 w-10 place-items-center rounded-control border border-line/70 bg-panel text-muted transition hover:text-ink sm:grid"
          aria-label="打开搜索"
        >
          <Search class="h-4 w-4" />
        </NuxtLink>
        <button
          class="focus-ring grid h-10 w-10 place-items-center rounded-control border border-line/70 bg-panel text-muted transition hover:text-ink"
          type="button"
          :aria-label="mode === 'dark' ? '切换到亮色主题' : '切换到暗色主题'"
          @click="toggleMode"
        >
          <Sun v-if="mode === 'dark'" class="h-4 w-4" />
          <Moon v-else class="h-4 w-4" />
        </button>
        <div ref="appearanceMenu" class="relative" @keydown.esc.stop="closeAppearance(true)">
          <button
            ref="appearanceButton"
            class="focus-ring grid h-10 w-10 place-items-center rounded-control border border-line/70 bg-panel text-muted transition hover:text-ink"
            :class="appearanceOpen ? 'border-accent text-accent' : ''"
            type="button"
            aria-label="打开外观设置"
            aria-haspopup="dialog"
            :aria-expanded="appearanceOpen"
            aria-controls="appearance-panel"
            @click="toggleAppearance"
          >
            <Palette class="h-4 w-4" />
          </button>
          <ThemeControls
            v-if="appearanceOpen"
            id="appearance-panel"
            class="fixed left-4 right-4 top-[4.5rem] z-50 sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-[min(20rem,calc(100vw-2rem))]"
          />
        </div>
        <button
          class="focus-ring grid h-10 w-10 place-items-center rounded-control border border-line/70 bg-panel text-muted md:hidden"
          type="button"
          :aria-label="open ? '关闭菜单' : '打开菜单'"
          @click="toggleMenu"
        >
          <X v-if="open" class="h-4 w-4" />
          <Menu v-else class="h-4 w-4" />
        </button>
      </div>
    </div>

    <div v-if="open" class="border-t border-line/70 bg-bg px-4 py-3 md:hidden">
      <nav class="grid gap-1" aria-label="移动端导航">
        <NuxtLink
          v-for="item in appConfig.site.nav"
          :key="item.to"
          :to="item.to"
          class="focus-ring rounded-control px-3 py-3 text-sm text-muted"
          active-class="bg-panelMuted !text-ink"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
