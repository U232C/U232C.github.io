# AGENTS.md

本文件适用于整个仓库。所有自动化代理在分析、修改和验证本项目时都必须遵循以下约定。

## 项目概览

这是一个面向 GitHub Pages 的中文个人博客，采用 Nuxt 3、Vue 3、TypeScript、Nuxt Content 和 Tailwind CSS 构建。站点通过 Nitro 的 `github_pages` preset 静态生成，不依赖部署后的常驻服务端。

主要目录职责：

- `pages/`：页面和文件路由。
- `components/`：通用 UI；`components/content/` 存放 MDC/Markdown 渲染组件。
- `composables/`：跨组件的组合式状态与行为。
- `content/`：文章、日记和独立页面的 Markdown 源文件。
- `server/`：构建时可预渲染的 API、RSS 与文本路由。
- `utils/`：无 UI 依赖的内容处理和格式化函数。
- `assets/css/tailwind.css`：全局设计令牌、基础样式和内容排版。
- `app.config.ts`：站点信息、导航、横幅、主题色和字体选项。
- `nuxt.config.ts`：模块、运行时配置、Markdown、SEO 与预渲染设置。
- `content.config.ts`：内容集合及 Front Matter Schema。

## 开发与验证命令

使用仓库声明的 pnpm 10.15.0，不要生成 npm 或 Yarn 锁文件。

```bash
pnpm install
pnpm dev
pnpm build
pnpm generate
pnpm preview
```

- 安装依赖时保留 `pnpm-lock.yaml`；CI 场景使用 `pnpm install --frozen-lockfile`。
- 修改代码、配置、路由或内容模型后，至少运行 `pnpm generate`。
- 项目目前没有独立的 lint 或测试脚本，不要声称运行过不存在的检查。
- 如果无法运行验证命令，要在交付说明中明确原因和未验证项。

## 通用修改原则

- 先阅读相关页面、组件、配置和内容 Schema，再实施修改。
- 保持改动聚焦，不顺手重构无关代码，不覆盖用户已有变更。
- 优先复用现有组件、组合式函数、工具函数和 CSS 令牌。
- 不引入新依赖，除非现有能力明显无法满足需求；新增依赖时说明必要性并更新锁文件。
- 不提交 `.nuxt/`、`.output/`、`.data/`、日志或其他生成产物。
- 不硬编码仅适用于开发环境的域名、端口或绝对文件路径。
- 文案默认使用简体中文，并保持当前站点简洁、克制、偏工程化的表达风格。

## TypeScript 与 Vue 约定

- 使用 Vue 3 Composition API 和 `<script setup lang="ts">`。
- 遵循现有格式：两个空格缩进、单引号、无分号；避免纯格式化造成的大面积 diff。
- TypeScript 必须兼容严格模式。避免新增 `any`；确实无法静态描述的数据应使用 `unknown`、类型守卫或局部明确类型。
- 简单、稳定、只在单个组件使用的值留在组件内；跨组件状态或可复用行为放入 `composables/`。
- 与 UI 无关的纯函数放入 `utils/`，并保持无浏览器环境依赖。
- 优先使用 Nuxt/Vue 自动导入能力，不重复导入 `ref`、`computed`、`useRoute`、`useAsyncData` 等已自动导入 API。
- Props、事件和异步数据应有明确类型；模板中的循环必须提供稳定且唯一的 `key`。
- 派生状态使用 `computed`，避免用 watcher 复制可计算状态。仅在同步外部副作用时使用 `watch`。
- 不直接修改 props；不要在模板表达式中塞入复杂业务逻辑。

## Nuxt、SSR 与数据获取

- 所有页面必须在 SSR 和静态生成阶段可执行。访问 `window`、`document`、`localStorage`、`matchMedia` 等浏览器 API 前使用 `import.meta.client` 或放入 `onMounted`。
- 避免服务端与客户端首屏输出不一致。依赖用户设备或本地存储的状态应在客户端安全初始化。
- 页面级内容查询使用 `useAsyncData` 或 Nuxt 数据获取 API，并提供稳定、可区分的 key。
- 对互不依赖的数据请求使用并发方式；避免重复查询同一集合。
- 公开配置放入 `runtimeConfig.public`；秘密信息不得进入公开配置、源码或 Markdown。
- 新增服务端路由时必须确认可被静态预渲染；若页面依赖该路由，应同步维护 `nitro.prerender.routes` 或可抓取链接。
- 站点部署支持 `NUXT_APP_BASE_URL`。新增链接和资源时使用 Nuxt 路由组件及站点基础路径兼容的写法。

## 内容系统约定

- 文章写入 `content/posts/`，日记写入 `content/diaries/`，独立页面内容写入 `content/pages/`。
- 文章和日记必须满足 `content.config.ts` 的 Schema：`title`、`description`、`date` 必填；其他字段遵循现有默认值和类型。
- 日期使用可读且无歧义的 `YYYY-MM-DD` 格式。
- 新增 Front Matter 字段时，先更新 Schema，再处理查询、类型、展示、搜索索引、RSS 和现有内容的兼容性。
- 所有公开内容查询必须排除 `draft: true`；草稿不得进入列表、搜索索引、RSS、站点地图或可访问详情页。
- 图片放入 `public/images/` 并使用以 `/images/` 开头的站内路径；提供准确、简短的替代文本。
- Markdown 标题从 `##` 开始组织正文，保持层级连续，以兼容目录生成。
- 代码块标注语言；数学内容使用现有 remark-math/KaTeX 语法；提示块优先复用现有 MDC 组件。

## 前端设计规范

### 视觉系统

- 使用 `bg`、`panel`、`panelMuted`、`ink`、`muted`、`line`、`accent` 等 Tailwind 语义颜色，不在组件中重复硬编码主题颜色。
- 新样式必须同时适配明暗模式；优先通过现有 CSS 变量和语义类实现，不创建两套分叉样式。
- 保持当前 8px 控件圆角、轻边框、适度阴影和克制动效的视觉语言。
- 排版优先保证中文正文可读性：合理行高、受控行宽、清楚的标题层级，不使用过小字号承载关键内容。
- 图标使用 Lucide Vue，避免混用不同图标体系；纯装饰图标应对辅助技术隐藏。

### 布局与响应式

- 采用移动优先设计，基础样式适用于窄屏，再使用 `sm`、`md`、`lg` 等断点增强。
- 页面在 320px 宽度下不得出现非预期横向滚动；长标题、代码、表格和 URL 必须可换行或安全滚动。
- 使用现有内容宽度与间距节奏，避免为单个页面引入不一致的容器尺寸。
- 图片使用 `NuxtImg`，提供 `alt`、合理尺寸和对象裁切策略，避免引发布局偏移。

### 交互与无障碍

- 优先使用语义 HTML：导航用 `nav`，主要内容用 `main`，文章用 `article`，操作使用真实的 `button` 或链接。
- 所有交互必须可通过键盘完成，并具有清晰的焦点状态；复用 `focus-ring` 类。
- 图标按钮必须有可访问名称；表单控件必须关联可见标签或 `aria-label`。
- 文本和背景需保持足够对比度；不能只依赖颜色表达状态。
- 尊重 `prefers-reduced-motion`，新增动画应简短、服务于状态变化，并在减弱动态效果时安全降级。
- 对异步加载、空结果、错误和禁用状态提供明确反馈，不留下无解释的空白区域。

## SEO、性能与外部集成

- 新页面应设置准确的 `useSeoMeta` 标题和描述；文章类页面保留 canonical、Open Graph 和结构化数据逻辑。
- 页面标题、描述和图片来自内容或配置，避免在多个位置重复硬编码站点信息。
- 新增公开内容入口时，检查 RSS、站点地图、搜索索引和预渲染是否需要同步支持。
- 避免不必要的客户端依赖和大体积资源；只在需要的页面加载浏览器端功能。
- 外部脚本延迟到客户端加载，并对缺失配置、加载失败和隐私影响提供合理降级。Giscus 继续以 `repoId` 和 `categoryId` 是否配置作为启用条件。

## Git 提交规范

- 所有提交信息必须遵循 [Conventional Commits Specification](https://www.conventionalcommits.org/)。
- 提交标题统一使用 `<type>(<scope>): <description>` 格式，其中 `scope` 必填，用于准确表示本次提交影响的模块或范围。
- `type` 使用符合规范的类型，如 `feat`、`fix`、`docs`、`refactor`、`test`、`build`、`ci` 或 `chore`；`scope` 使用简短、清晰的名称。
- 合法示例：`feat(events): add event archive pagination`、`fix(search): handle empty query results`、`docs(agents): require conventional commits`。
- 不允许省略 `scope`，例如 `feat: add event archive pagination` 不符合本仓库要求；提交正文、脚注和破坏性变更标记继续遵循 Conventional Commits 规范。

## 完成标准

提交修改前应确认：

1. 修改符合现有目录职责、代码风格和内容 Schema。
2. 页面在移动端与桌面端、明暗主题下均可用。
3. 键盘操作、焦点状态、语义标签和替代文本完整。
4. SSR、静态生成和 GitHub Pages 基础路径不受破坏。
5. 草稿过滤、搜索、RSS、SEO 或站点地图未因相关改动出现回归。
6. `pnpm generate` 成功，或交付说明中记录了具体阻塞与风险。
