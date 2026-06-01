<script setup lang="ts">
import { Check, Palette, Type } from '@lucide/vue'

const appConfig = useAppConfig()
const { accent, font, setAccent, setFont } = useThemePreferences()
</script>

<template>
  <section class="surface rounded-lg p-4" aria-label="主题设置">
    <div class="mb-4 flex items-center gap-2 text-sm font-semibold">
      <Palette class="h-4 w-4 accent-text" />
      <span>主题色</span>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="item in appConfig.site.themeColors"
        :key="item.value"
        class="focus-ring grid h-9 w-9 place-items-center rounded-full border border-line"
        type="button"
        :style="{ backgroundColor: item.value }"
        :aria-label="`切换主题色 ${item.name}`"
        @click="setAccent(item.value)"
      >
        <Check v-if="accent === item.value" class="h-4 w-4 text-white" />
      </button>
      <label class="focus-within:ring-accent flex h-9 items-center rounded-full border border-line bg-panel px-2 focus-within:ring-2" aria-label="自定义主题色">
        <input class="h-6 w-8 cursor-pointer border-0 bg-transparent p-0" type="color" :value="accent" @input="setAccent(($event.target as HTMLInputElement).value)">
      </label>
    </div>

    <div class="mb-3 mt-5 flex items-center gap-2 text-sm font-semibold">
      <Type class="h-4 w-4 accent-text" />
      <span>全局字体</span>
    </div>
    <div class="grid gap-2 sm:grid-cols-2">
      <button
        v-for="item in appConfig.site.fonts"
        :key="item.name"
        class="focus-ring flex items-center justify-between rounded-control border border-line px-3 py-2 text-left text-sm transition hover:bg-panelMuted"
        :class="font === item.value ? 'bg-panelMuted text-ink' : 'text-muted'"
        type="button"
        @click="setFont(item.value)"
      >
        <span :style="{ fontFamily: item.value }">{{ item.name }}</span>
        <Check v-if="font === item.value" class="h-4 w-4 accent-text" />
      </button>
    </div>
  </section>
</template>
