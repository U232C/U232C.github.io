import JXG from 'jsxgraph'
import type {
  CodeRendererAdapter,
  CodeRendererOptionValue,
  RendererContext,
  RendererInstance
} from '../../types/code-renderers'

function requireNumber(options: Record<string, CodeRendererOptionValue>, key: string): number {
  const value = options[key]
  if (typeof value !== 'number') {
    throw new Error(`${key} 配置必须是数字`)
  }
  return value
}

function requireBoolean(options: Record<string, CodeRendererOptionValue>, key: string): boolean {
  const value = options[key]
  if (typeof value !== 'boolean') {
    throw new Error(`${key} 配置必须是布尔值`)
  }
  return value
}

function requireBoundingBox(options: Record<string, CodeRendererOptionValue>): [number, number, number, number] {
  const value = options.bbox
  if (!Array.isArray(value) || value.length !== 4 || value.some(item => !Number.isFinite(item))) {
    throw new Error('bbox 配置必须包含四个有限数字')
  }
  const [left, top, right, bottom] = value
  if (left === undefined || top === undefined || right === undefined || bottom === undefined) {
    throw new Error('bbox 配置不完整')
  }
  if (left >= right || bottom >= top) {
    throw new Error('bbox 必须满足 left < right 且 bottom < top')
  }
  return [left, top, right, bottom]
}

function cssColor(target: HTMLElement, variable: string, fallback: string): string {
  const value = getComputedStyle(target).getPropertyValue(variable).trim()
  return value ? `rgb(${value})` : fallback
}

const adapter: CodeRendererAdapter = {
  async mount({ target, code, options }: RendererContext): Promise<RendererInstance> {
    const height = requireNumber(options, 'height')
    const ink = cssColor(target, '--text', '#0f172a')
    const muted = cssColor(target, '--muted', '#475569')
    const line = cssColor(target, '--border', '#cbd5e1')

    target.style.height = `${height}px`

    const axisOptions = {
      strokeColor: muted,
      highlight: false,
      ticks: {
        strokeColor: line,
        label: { strokeColor: ink }
      }
    }
    const board = JXG.JSXGraph.initBoard(target, {
      boundingbox: requireBoundingBox(options),
      axis: requireBoolean(options, 'axis'),
      grid: requireBoolean(options, 'grid'),
      defaultAxes: {
        x: axisOptions,
        y: axisOptions
      },
      showCopyright: false,
      showNavigation: true,
      pan: { enabled: true, needShift: false },
      zoom: { wheel: true, needShift: false }
    })

    try {
      const execute = Function('board', 'JXG', `'use strict'\n${code}`) as (
        board: JXG.Board,
        library: typeof JXG
      ) => unknown
      execute(board, JXG)
      board.fullUpdate()
    } catch (error: unknown) {
      JXG.JSXGraph.freeBoard(board)
      throw error
    }

    let disposed = false
    return {
      resize() {
        if (disposed) return
        board.resizeContainer(target.clientWidth, height, true)
        board.fullUpdate()
      },
      dispose() {
        if (disposed) return
        disposed = true
        JXG.JSXGraph.freeBoard(board)
      }
    }
  }
}

export default adapter
