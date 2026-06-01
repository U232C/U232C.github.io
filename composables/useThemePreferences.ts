type ThemeMode = 'light' | 'dark'

const storageKeys = {
  mode: 'u232c-theme-mode',
  accent: 'u232c-theme-accent',
  font: 'u232c-theme-font'
}

export function useThemePreferences() {
  const appConfig = useAppConfig()
  const mode = useState<ThemeMode>('theme-mode', () => 'light')
  const accent = useState('theme-accent', () => appConfig.site.themeColors[0].value)
  const font = useState('theme-font', () => appConfig.site.fonts[0].value)

  const apply = () => {
    if (!import.meta.client) return
    const root = document.documentElement
    root.classList.toggle('dark', mode.value === 'dark')
    root.style.setProperty('--font-body', font.value)
    const rgb = hexToRgb(accent.value)
    root.style.setProperty('--accent', `${rgb.r} ${rgb.g} ${rgb.b}`)
    root.style.setProperty('--accent-strong', `${Math.max(0, rgb.r - 16)} ${Math.max(0, rgb.g - 16)} ${Math.max(0, rgb.b - 16)}`)
  }

  if (import.meta.client) {
    const savedMode = localStorage.getItem(storageKeys.mode) as ThemeMode | null
    const savedAccent = localStorage.getItem(storageKeys.accent)
    const savedFont = localStorage.getItem(storageKeys.font)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    mode.value = savedMode || (prefersDark ? 'dark' : 'light')
    accent.value = savedAccent || accent.value
    font.value = savedFont || font.value

    watch([mode, accent, font], () => {
      localStorage.setItem(storageKeys.mode, mode.value)
      localStorage.setItem(storageKeys.accent, accent.value)
      localStorage.setItem(storageKeys.font, font.value)
      apply()
    }, { immediate: true })
  }

  return {
    mode,
    accent,
    font,
    setMode: (value: ThemeMode) => { mode.value = value },
    setAccent: (value: string) => { accent.value = value },
    setFont: (value: string) => { font.value = value },
    toggleMode: () => { mode.value = mode.value === 'dark' ? 'light' : 'dark' }
  }
}

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '')
  const value = Number.parseInt(normalized.length === 3
    ? normalized.split('').map((char) => char + char).join('')
    : normalized, 16)

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  }
}
