const siteUrl = 'https://u232c.github.io/myweb'

export default defineNuxtConfig({
  compatibilityDate: '2026-06-01',
  devtools: { enabled: true },
  ssr: true,
  site: {
    url: 'https://u232c.github.io',
    name: 'U232C Blog'
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/myweb/',
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Serif+SC:wght@500;700&display=swap'
        },
        { rel: 'alternate', type: 'application/rss+xml', title: 'U232C Blog RSS', href: `${siteUrl}/rss.xml` }
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#14b8a6' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  css: ['~/assets/css/tailwind.css', 'katex/dist/katex.min.css'],
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxtjs/sitemap'
  ],
  content: {
    experimental: {
      sqliteConnector: 'native'
    },
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 },
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          },
          langs: ['vue', 'ts', 'js', 'html', 'css', 'md', 'json', 'bash', 'powershell', 'yaml']
        },
        remarkPlugins: {
          'remark-math': {}
        },
        rehypePlugins: {
          'rehype-katex': {}
        }
      }
    }
  },
  image: {
    format: ['webp', 'png', 'jpeg'],
    quality: 82
  },
  sitemap: {
    siteUrl,
    autoLastmod: true
  },
  runtimeConfig: {
    public: {
      siteUrl,
      giscus: {
        repo: 'U232C/myweb',
        repoId: '',
        category: 'General',
        categoryId: '',
        mapping: 'pathname'
      }
    }
  },
  nitro: {
    preset: 'github_pages',
    prerender: {
      crawlLinks: true,
      routes: ['/api/search-index', '/rss.xml']
    }
  },
  routeRules: {
    '/rss.xml': { prerender: true },
    '/api/search-index': { prerender: true }
  },
  typescript: {
    strict: true
  }
})
