import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './app.vue',
    './components/**/*.{vue,ts}',
    './composables/**/*.ts',
    './content/**/*.md',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './utils/**/*.ts'
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        panelMuted: 'rgb(var(--panel-muted) / <alpha-value>)',
        ink: 'rgb(var(--text) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--border) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)'
      },
      fontFamily: {
        body: ['var(--font-body)']
      },
      borderRadius: {
        control: '8px'
      }
    }
  }
}
