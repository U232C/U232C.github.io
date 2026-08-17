import { existsSync, readFileSync } from 'node:fs'
import { dirname, isAbsolute, relative, resolve } from 'node:path'
import type { BundledLanguage } from 'shiki'
import { parse } from 'yaml'
import {
  createCodeRenderersConfig,
  parseCodeRendererDefinition,
  parseCodeRendererRegistry
} from './utils/codeRenderers'
import remarkCodeRenderers from './utils/remarkCodeRenderers'

const siteUrl = 'https://u232c.github.io'
const projectRoot = process.cwd()
const rendererRegistry = parseCodeRendererRegistry(
  parse(readFileSync(resolve(projectRoot, 'code-renderers.yaml'), 'utf8'))
)
const rendererConfigPaths = new Map<string, string>()
const codeRendererDefinitions = rendererRegistry.renderers.map((entry) => {
  const configPath = resolve(projectRoot, entry.config)
  const relativeConfigPath = relative(projectRoot, configPath)
  if (relativeConfigPath.startsWith('..') || isAbsolute(relativeConfigPath)) {
    throw new Error(`解析器 ${entry.id} 的配置文件必须位于项目内：${entry.config}`)
  }
  if (!existsSync(configPath)) {
    throw new Error(`解析器 ${entry.id} 的配置文件不存在：${configPath}`)
  }
  rendererConfigPaths.set(entry.id, configPath)
  return parseCodeRendererDefinition(
    entry.id,
    parse(readFileSync(configPath, 'utf8'))
  )
})
const codeRenderersConfig = createCodeRenderersConfig(rendererRegistry, codeRendererDefinitions)
const defaultCodeRenderer = codeRenderersConfig.renderers.find(
  renderer => renderer.id === codeRenderersConfig.defaultRenderer
)
if (!defaultCodeRenderer || defaultCodeRenderer.mode !== 'static') {
  throw new Error('默认静态代码解析器配置无效')
}

const rendererCssPaths: string[] = []
for (const renderer of codeRenderersConfig.renderers) {
  if (renderer.mode === 'interactive') {
    if (!defaultCodeRenderer.highlight.languages.includes(renderer.highlightLanguage)) {
      throw new Error(`解析器 ${renderer.id} 使用了 Shiki 未加载的语言：${renderer.highlightLanguage}`)
    }
    const adapterPath = resolve(projectRoot, 'code-renderers', 'adapters', `${renderer.adapter}.client.ts`)
    if (!existsSync(adapterPath)) {
      throw new Error(`解析器 ${renderer.id} 的客户端适配器不存在：${adapterPath}`)
    }
  }

  const configPath = rendererConfigPaths.get(renderer.id)
  if (!configPath) throw new Error(`解析器 ${renderer.id} 缺少配置路径`)
  for (const style of renderer.styles) {
    const stylePath = resolve(dirname(configPath), style)
    const relativeStylePath = relative(projectRoot, stylePath)
    if (relativeStylePath.startsWith('..') || isAbsolute(relativeStylePath) || !existsSync(stylePath)) {
      throw new Error(`解析器 ${renderer.id} 的样式文件无效：${style}`)
    }
    rendererCssPaths.push(stylePath)
  }
}
const remarkCodeRenderersPath = resolve(projectRoot, 'utils/remarkCodeRenderers.ts').replaceAll('\\', '/')

export default defineNuxtConfig({
  compatibilityDate: '2026-06-01',
  devtools: { enabled: true },
  ssr: true,
  site: {
    url: 'https://u232c.github.io',
    name: 'U232C Blog'
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
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
  css: [...rendererCssPaths, '~/assets/css/tailwind.css', 'katex/dist/katex.min.css'],
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
            default: defaultCodeRenderer.highlight.themes.default,
            dark: defaultCodeRenderer.highlight.themes.dark
          },
          langs: defaultCodeRenderer.highlight.languages as BundledLanguage[]
        },
        remarkPlugins: {
          'remark-math': {},
          [remarkCodeRenderersPath]: {
            instance: remarkCodeRenderers,
            options: codeRenderersConfig
          }
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
      codeRenderers: codeRenderersConfig,
      giscus: {
        repo: 'U232C/U232C.github.io',
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
