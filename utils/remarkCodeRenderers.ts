import type { CodeRendererDefinition, CodeRenderersConfig } from '../types/code-renderers'
import { getMetaValue, parseRendererOptions, stripCodeMetaDecorations } from './codeRenderers'

interface RemarkCodeNode {
  type: string
  lang?: string
  meta?: string
  value?: string
  position?: {
    start: {
      line: number
      column: number
    }
  }
  children?: RemarkCodeNode[]
}

interface VFileLike {
  path?: string
  history?: string[]
  fail(reason: string, place?: { line: number; column: number }): never
}

function walk(node: RemarkCodeNode, visit: (node: RemarkCodeNode) => void) {
  visit(node)
  for (const child of node.children || []) {
    walk(child, visit)
  }
}

function validateJavaScript(code: string) {
  Function('board', 'JXG', `'use strict'\n${code}`)
}

function fileName(file: VFileLike): string {
  return file.path || file.history?.[0] || '未知 Markdown 文件'
}

function warn(file: VFileLike, node: RemarkCodeNode, message: string) {
  const line = node.position?.start.line || 1
  console.warn(`[code-renderers] ${fileName(file)}:${line} ${message}`)
}

export default function remarkCodeRenderers(options: CodeRenderersConfig) {
  const renderersById = new Map(options.renderers.map(renderer => [renderer.id, renderer]))
  const defaultRenderer = renderersById.get(options.defaultRenderer)
  if (!defaultRenderer || defaultRenderer.mode !== 'static') {
    throw new Error('默认静态代码解析器配置无效')
  }

  return (tree: RemarkCodeNode, file: VFileLike) => {
    walk(tree, (node) => {
      if (node.type !== 'code') return

      const location = node.position?.start
      const authorLanguage = node.lang?.toLowerCase() || ''
      const legacyRenderer = options.renderers.find(renderer =>
        renderer.legacyLanguages.includes(authorLanguage)
      )
      const cleanedMeta = stripCodeMetaDecorations(node.meta)
      const explicitRendererId = getMetaValue(cleanedMeta, 'renderer')

      if (!explicitRendererId && legacyRenderer) {
        file.fail(
          `旧代码块语言 ${authorLanguage} 已禁用，请改用受支持的代码语言并添加 renderer=${legacyRenderer.id}`,
          location
        )
      }

      const rendererId = explicitRendererId || options.defaultRenderer
      const renderer = renderersById.get(rendererId)
      if (!renderer) {
        file.fail(`未知代码解析器：${rendererId}`, location)
      }
      if (!renderer.enabled) {
        file.fail(`代码解析器已禁用：${renderer.label}`, location)
      }

      try {
        parseRendererOptions(cleanedMeta, renderer)
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error)
        file.fail(`${renderer.label} 代码块参数无效：${message}`, location)
      }

      const path = fileName(file).replaceAll('\\', '/')
      if (path.includes('/content/pages/') && renderer.id !== options.defaultRenderer) {
        warn(file, node, `独立页面使用了非默认解析器 ${renderer.id}`)
      }

      let highlightLanguage = authorLanguage
      if (renderer.mode === 'static') {
        if (!authorLanguage || !renderer.highlight.languages.includes(authorLanguage)) {
          if (authorLanguage) {
            warn(file, node, `Shiki 未加载语言 ${authorLanguage}，已回退为 ${renderer.fallbackLanguage}`)
          }
          highlightLanguage = renderer.fallbackLanguage
        }
      } else {
        if (!authorLanguage || !renderer.acceptedLanguages.includes(authorLanguage)) {
          file.fail(
            `${renderer.label} 只接受以下代码语言：${renderer.acceptedLanguages.join('、')}`,
            location
          )
        }
        if (renderer.syntax === 'javascript') {
          try {
            validateJavaScript(node.value || '')
          } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error)
            file.fail(`${renderer.label} 代码语法无效：${message}`, location)
          }
        }
        highlightLanguage = renderer.highlightLanguage
      }

      node.lang = highlightLanguage
      node.meta = [
        node.meta?.trim(),
        `code-renderer=${renderer.id}`,
        `code-language=${authorLanguage || defaultRenderer.fallbackLanguage}`
      ].filter(Boolean).join(' ')
    })
  }
}
