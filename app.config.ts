export default defineAppConfig({
  site: {
    name: 'U232C Blog',
    author: 'U232C',
    description: '一个用 Nuxt 3、Markdown 和工程师审美构建的个人博客。',
    url: 'https://u232c.github.io',
    nav: [
      { label: '首页', to: '/' },
      { label: '文章', to: '/archive' },
      { label: '日记', to: '/diary' },
      { label: '搜索', to: '/search' },
      { label: '关于', to: '/about' }
    ],
    banners: [
      {
        title: '写给长期主义的 Web 花园',
        description: '记录工程、生活与那些值得反复咀嚼的灵感。',
        image: '/images/banner-circuit.png',
        link: '/archive',
        cta: '浏览归档'
      },
      {
        title: '代码、数学和清晨的笔记',
        description: '支持公式、增强代码块、目录滚动和深色阅读。',
        image: '/images/banner-notes.png',
        link: '/blog/hello-nuxt-blog',
        cta: '阅读示例'
      },
      {
        title: '用标签建立自己的知识地图',
        description: '分类、标签、时间线和全文搜索让内容自然长出来。',
        image: '/images/banner-timeline.png',
        link: '/search',
        cta: '开始搜索'
      }
    ],
    themeColors: [
      { name: 'Teal', value: '#14b8a6' },
      { name: 'Blue', value: '#3b82f6' },
      { name: 'Rose', value: '#f43f5e' },
      { name: 'Amber', value: '#f59e0b' },
      { name: 'Violet', value: '#8b5cf6' }
    ],
    fonts: [
      { name: 'JetBrains Mono', value: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' },
      { name: 'Inter', value: 'Inter, ui-sans-serif, system-ui, sans-serif' },
      { name: 'Noto Serif SC', value: '"Noto Serif SC", serif' },
      { name: 'System', value: 'ui-sans-serif, system-ui, sans-serif' }
    ]
  }
})
