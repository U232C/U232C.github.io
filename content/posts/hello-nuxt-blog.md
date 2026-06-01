---
title: Hello Nuxt Blog
description: 第一篇文章，用来展示增强 Markdown、数学公式、代码块和目录滚动。
date: 2026-06-01
updated: 2026-06-01
category: 工程
tags:
  - Nuxt
  - Markdown
  - Tailwind
cover: /images/banner-circuit.png
draft: false
pinned: true
banner: true
---

## 为什么重新建一个博客

个人博客最迷人的地方，是它不必追求即时反馈。它可以慢慢沉淀，像一个能被搜索、能被链接、能被多年后重新打开的工作台。

::callout
这里是一个 MDC 组件示例。它可以放提示、警告、延伸阅读，也可以继续扩展成自己的内容积木。
::

## 增强代码块

```ts
export function greet(name: string) {
  return `hello, ${name}`
}

console.log(greet('U232C'))
```

## 数学公式

行内公式可以写成 $E = mc^2$。块级公式也可以渲染：

$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$

## 内容组织

文章会被分类和标签串起来。归档页面按时间展示，搜索页面会在本地索引标题、描述、正文、分类和标签。

![抽象电路横幅](/images/banner-circuit.png)
