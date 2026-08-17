# U232C Blog

一个使用 Nuxt 3、Nuxt Content 与 Tailwind CSS 构建的个人博客。项目以 Markdown 管理文章、日记和独立页面，支持全文搜索、数学公式、代码高亮、主题定制、RSS、站点地图与静态部署。

## 功能特性

- 使用 Markdown 和 MDC 组件编写内容
- 文章、日记、分类、标签和按年份归档
- 基于 MiniSearch 的浏览器端全文搜索，可按分类、标签和时间筛选
- Markdown 目录、阅读进度、预计阅读时间和返回顶部
- 代码语法高亮以及 KaTeX 数学公式渲染
- 明暗模式、主题色和正文字体切换，并在本地保存偏好
- 响应式图片、SEO 元数据、文章结构化数据和 canonical 链接
- RSS 订阅、`robots.txt` 和站点地图
- 预留 Giscus 评论集成
- 通过 GitHub Actions 自动部署到 GitHub Pages

## 技术栈

| 分类 | 技术 | 用途 |
| --- | --- | --- |
| 应用框架 | [Nuxt 3](https://nuxt.com/) | 路由、SSR、预渲染和 Nitro 服务端能力 |
| UI 框架 | [Vue 3](https://vuejs.org/) | Composition API 与组件化界面 |
| 开发语言 | [TypeScript](https://www.typescriptlang.org/) | 严格模式下的类型检查 |
| 内容系统 | [Nuxt Content](https://content.nuxt.com/) | Markdown 内容集合、Schema 校验和查询 |
| 样式系统 | [Tailwind CSS](https://tailwindcss.com/) | 响应式布局、主题样式和暗色模式 |
| 组合式工具 | [VueUse](https://vueuse.org/) / VueUse Motion | 通用组合式能力与界面动画 |
| 搜索 | [MiniSearch](https://lucaong.github.io/minisearch/) | 静态内容的客户端全文检索 |
| Markdown 增强 | remark-math / rehype-katex / KaTeX | 数学公式解析与渲染 |
| 图片 | [Nuxt Image](https://image.nuxt.com/) | 响应式图片和格式优化 |
| 图标 | Lucide Vue | 界面图标 |
| 订阅与发现 | Feed / Nuxt Sitemap | RSS 与站点地图生成 |
| 部署 | GitHub Actions / GitHub Pages | 静态站点持续部署 |

## 项目结构

```text
.
├─ assets/          # Tailwind 入口和全局样式
├─ components/      # 通用界面与 Markdown 内容组件
├─ composables/     # 主题偏好等组合式逻辑
├─ content/         # 文章、日记和独立页面 Markdown
├─ layouts/         # Nuxt 页面布局
├─ pages/           # 页面与动态路由
├─ public/          # 图片等公开静态资源
├─ server/          # 搜索索引、RSS 和 robots.txt 路由
├─ utils/           # 内容处理与格式化工具
├─ app.config.ts    # 站点信息、导航、横幅及主题选项
├─ content.config.ts # 内容集合与 Front Matter Schema
└─ nuxt.config.ts   # Nuxt 模块、SEO、预渲染及部署配置
```

## 开始使用

### 环境要求

- Node.js 24（与 GitHub Actions 部署环境一致）
- pnpm 10.15.0

### 安装与开发

```bash
pnpm install
pnpm dev
```

开发服务器默认监听所有网络接口。终端会显示实际访问地址和端口。

### 构建与预览

```bash
# 构建 Nuxt 应用
pnpm build

# 生成可部署的静态站点
pnpm generate

# 本地预览构建结果
pnpm preview
```

静态生成结果位于 `.output/public`，仓库中的 `dist` 链接也指向该目录。

## 内容编写

内容按集合存放：

- `content/posts/**/*.md`：博客文章，生成 `/blog/...` 路由
- `content/diaries/**/*.md`：日记，生成 `/diary/...` 路由
- `content/pages/**/*.md`：关于页等独立内容页面

文章和日记的 Front Matter 示例：

```yaml
---
title: 文章标题
description: 用于列表和 SEO 的内容摘要
date: 2026-06-01
updated: 2026-06-02
category: 工程
tags:
  - Nuxt
  - Markdown
cover: /images/example.png
draft: false
pinned: false
banner: false
---
```

其中 `title`、`description` 和 `date` 为必填项；`category` 默认为“随笔”，`tags` 默认为空数组，其余字段可选或默认关闭。设置 `draft: true` 后，内容不会出现在公开列表、搜索索引和 RSS 中，文章详情页也会返回 404。

Markdown 支持标题目录、代码高亮、行内与块级数学公式，以及 `components/content` 中注册的 MDC 内容组件。例如：

```md
::callout
这里是一段提示内容。
::
```

## 配置

### 站点与主题

在 `app.config.ts` 中维护：

- 站点名称、作者、简介和地址
- 顶部导航
- 首页横幅
- 可选主题色和字体

### Nuxt 与内容

- `nuxt.config.ts`：站点地址、模块、Markdown 渲染、图片、站点地图、预渲染和运行时配置
- `content.config.ts`：文章、日记和独立页面集合及其 Front Matter Schema
- `tailwind.config.ts`：主题颜色映射、字体和内容扫描范围

如果部署地址发生变化，需要同步修改 `nuxt.config.ts` 和 `app.config.ts` 中的站点 URL。

### Giscus 评论

评论组件已经集成，但默认不会加载。启用目标仓库的 GitHub Discussions 后，在 `nuxt.config.ts` 的 `runtimeConfig.public.giscus` 中填写：

- `repo`
- `repoId`
- `category`
- `categoryId`
- `mapping`

## 部署

`.github/workflows/deploy.yml` 定义了 GitHub Pages 部署流程：

1. 推送代码到 `main` 分支，或手动触发工作流。
2. 使用 Node.js 24 与 pnpm 10.15.0 安装锁定依赖。
3. 运行 `pnpm generate` 生成静态站点。
4. 将 `.output/public` 上传并发布到 GitHub Pages。

工作流当前使用根路径部署。如需部署到仓库子路径，可通过 `NUXT_APP_BASE_URL` 调整 Nuxt 的基础路径。
