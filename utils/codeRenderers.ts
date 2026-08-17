import type {
  CodeRendererDefinition,
  CodeRendererOptionDefinition,
  CodeRendererOptionValue,
  CodeRendererRegistry,
  CodeRenderersConfig,
  InteractiveCodeRendererDefinition,
  StaticCodeRendererDefinition
} from '../types/code-renderers'

const identifierPattern = /^[a-z][a-z0-9-]*$/
const metaEntryPattern = /([A-Za-z][\w-]*)=(?:"([^"]*)"|'([^']*)'|(\S+))/g
const internalMetaKeys = new Set(['code-renderer', 'code-language'])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function requireString(value: unknown, field: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${field} 必须是非空字符串`)
  }
  return value.trim()
}

function requireIdentifier(value: unknown, field: string): string {
  const identifier = requireString(value, field)
  if (!identifierPattern.test(identifier)) {
    throw new Error(`${field} 只能包含小写字母、数字和连字符，且必须以字母开头`)
  }
  return identifier
}

function requireStringArray(value: unknown, field: string, allowEmpty = true): string[] {
  if (!Array.isArray(value) || (!allowEmpty && !value.length)) {
    throw new Error(`${field} 必须是${allowEmpty ? '' : '非空'}字符串数组`)
  }
  const values = value.map((item, index) => requireString(item, `${field}[${index}]`))
  if (new Set(values).size !== values.length) {
    throw new Error(`${field} 不能包含重复值`)
  }
  return values
}

function parseOptionDefinition(value: unknown, field: string): CodeRendererOptionDefinition {
  if (!isRecord(value)) {
    throw new Error(`${field} 必须是对象`)
  }
  if (typeof value.overridable !== 'boolean') {
    throw new Error(`${field}.overridable 必须是布尔值`)
  }

  if (value.type === 'boolean') {
    return { type: 'boolean', overridable: value.overridable }
  }

  if (value.type === 'number') {
    const definition: CodeRendererOptionDefinition = {
      type: 'number',
      overridable: value.overridable
    }
    if (value.min !== undefined) {
      if (typeof value.min !== 'number' || !Number.isFinite(value.min)) {
        throw new Error(`${field}.min 必须是有限数字`)
      }
      definition.min = value.min
    }
    if (value.max !== undefined) {
      if (typeof value.max !== 'number' || !Number.isFinite(value.max)) {
        throw new Error(`${field}.max 必须是有限数字`)
      }
      definition.max = value.max
    }
    if (definition.min !== undefined && definition.max !== undefined && definition.min > definition.max) {
      throw new Error(`${field}.min 不能大于 max`)
    }
    return definition
  }

  if (value.type === 'number-list') {
    if (value.length !== undefined && (!Number.isInteger(value.length) || Number(value.length) < 1)) {
      throw new Error(`${field}.length 必须是正整数`)
    }
    if (value.validate !== undefined && value.validate !== 'bounding-box') {
      throw new Error(`${field}.validate 仅支持 bounding-box`)
    }
    return {
      type: 'number-list',
      overridable: value.overridable,
      ...(value.length === undefined ? {} : { length: Number(value.length) }),
      ...(value.validate === undefined ? {} : { validate: value.validate })
    }
  }

  throw new Error(`${field}.type 仅支持 number、number-list 或 boolean`)
}

function parseOptionValue(
  rawValue: unknown,
  definition: CodeRendererOptionDefinition,
  field: string
): CodeRendererOptionValue {
  if (definition.type === 'boolean') {
    if (typeof rawValue === 'boolean') return rawValue
    if (rawValue === 'true') return true
    if (rawValue === 'false') return false
    throw new Error(`${field} 必须是 true 或 false`)
  }

  if (definition.type === 'number') {
    const value = typeof rawValue === 'number' ? rawValue : Number(rawValue)
    if (!Number.isFinite(value)) {
      throw new Error(`${field} 必须是有限数字`)
    }
    if (definition.min !== undefined && value < definition.min) {
      throw new Error(`${field} 不能小于 ${definition.min}`)
    }
    if (definition.max !== undefined && value > definition.max) {
      throw new Error(`${field} 不能大于 ${definition.max}`)
    }
    return value
  }

  const values = Array.isArray(rawValue)
    ? rawValue
    : typeof rawValue === 'string'
      ? rawValue.split(',')
      : []
  const numbers = values.map(value => typeof value === 'number' ? value : Number(String(value).trim()))
  if (!numbers.length || numbers.some(value => !Number.isFinite(value))) {
    throw new Error(`${field} 必须是逗号分隔的数字列表`)
  }
  if (definition.length !== undefined && numbers.length !== definition.length) {
    throw new Error(`${field} 必须包含 ${definition.length} 个数字`)
  }
  if (definition.validate === 'bounding-box') {
    const [left, top, right, bottom] = numbers
    if (left === undefined || top === undefined || right === undefined || bottom === undefined
      || left >= right || bottom >= top) {
      throw new Error(`${field} 必须满足 left < right 且 bottom < top`)
    }
  }
  return numbers
}

function parseCommonDefinition(id: string, value: Record<string, unknown>) {
  if (typeof value.enabled !== 'boolean') {
    throw new Error(`${id}.enabled 必须是布尔值`)
  }
  if (!isRecord(value.presentation)
    || (value.presentation.source !== 'expanded' && value.presentation.source !== 'collapsed')) {
    throw new Error(`${id}.presentation.source 必须是 expanded 或 collapsed`)
  }
  if (!isRecord(value.defaults) || !isRecord(value.options)) {
    throw new Error(`${id}.defaults 和 options 必须是对象`)
  }

  const options = Object.fromEntries(
    Object.entries(value.options).map(([name, definition]) => [
      name,
      parseOptionDefinition(definition, `${id}.options.${name}`)
    ])
  )
  const defaults: Record<string, CodeRendererOptionValue> = {}
  for (const [name, rawDefault] of Object.entries(value.defaults)) {
    const definition = options[name]
    if (!definition) {
      throw new Error(`${id}.defaults.${name} 没有对应的参数定义`)
    }
    defaults[name] = parseOptionValue(rawDefault, definition, `${id}.defaults.${name}`)
  }
  for (const name of Object.keys(options)) {
    if (!(name in defaults)) {
      throw new Error(`${id}.defaults 缺少 ${name}`)
    }
  }

  return {
    id,
    label: requireString(value.label, `${id}.label`),
    enabled: value.enabled,
    presentation: {
      source: value.presentation.source as 'expanded' | 'collapsed'
    },
    styles: requireStringArray(value.styles, `${id}.styles`),
    legacyLanguages: requireStringArray(value.legacyLanguages, `${id}.legacyLanguages`)
      .map(language => language.toLowerCase()),
    defaults,
    options
  }
}

export function parseCodeRendererRegistry(value: unknown): CodeRendererRegistry {
  if (!isRecord(value) || !Array.isArray(value.renderers) || !value.renderers.length) {
    throw new Error('code-renderers.yaml 必须包含非空 renderers 数组')
  }
  const defaultRenderer = requireIdentifier(value.defaultRenderer, 'defaultRenderer')
  const renderers = value.renderers.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(`renderers[${index}] 必须是对象`)
    }
    return {
      id: requireIdentifier(entry.id, `renderers[${index}].id`),
      config: requireString(entry.config, `renderers[${index}].config`)
    }
  })
  const ids = renderers.map(renderer => renderer.id)
  if (new Set(ids).size !== ids.length) {
    throw new Error('code-renderers.yaml 中的解析器 id 不能重复')
  }
  return { defaultRenderer, renderers }
}

export function parseCodeRendererDefinition(id: string, value: unknown): CodeRendererDefinition {
  if (!isRecord(value)) {
    throw new Error(`解析器 ${id} 的配置必须是对象`)
  }
  const common = parseCommonDefinition(id, value)

  if (value.mode === 'static') {
    if (!isRecord(value.highlight) || !isRecord(value.highlight.themes)) {
      throw new Error(`${id}.highlight 及 themes 必须是对象`)
    }
    const renderer: StaticCodeRendererDefinition = {
      ...common,
      mode: 'static',
      fallbackLanguage: requireString(value.fallbackLanguage, `${id}.fallbackLanguage`).toLowerCase(),
      highlight: {
        languages: requireStringArray(value.highlight.languages, `${id}.highlight.languages`, false)
          .map(language => language.toLowerCase()),
        themes: {
          default: requireString(value.highlight.themes.default, `${id}.highlight.themes.default`),
          dark: requireString(value.highlight.themes.dark, `${id}.highlight.themes.dark`)
        }
      }
    }
    return renderer
  }

  if (value.mode === 'interactive') {
    if (typeof value.executable !== 'boolean') {
      throw new Error(`${id}.executable 必须是布尔值`)
    }
    if (value.syntax !== 'javascript' && value.syntax !== 'none') {
      throw new Error(`${id}.syntax 必须是 javascript 或 none`)
    }
    const renderer: InteractiveCodeRendererDefinition = {
      ...common,
      mode: 'interactive',
      adapter: requireIdentifier(value.adapter, `${id}.adapter`),
      executable: value.executable,
      syntax: value.syntax,
      acceptedLanguages: requireStringArray(value.acceptedLanguages, `${id}.acceptedLanguages`, false)
        .map(language => language.toLowerCase()),
      highlightLanguage: requireString(value.highlightLanguage, `${id}.highlightLanguage`).toLowerCase()
    }
    return renderer
  }

  throw new Error(`${id}.mode 必须是 static 或 interactive`)
}

export function createCodeRenderersConfig(
  registry: CodeRendererRegistry,
  renderers: CodeRendererDefinition[]
): CodeRenderersConfig {
  const defaultRenderer = renderers.find(renderer => renderer.id === registry.defaultRenderer)
  if (!defaultRenderer) {
    throw new Error(`默认解析器不存在：${registry.defaultRenderer}`)
  }
  if (!defaultRenderer.enabled) {
    throw new Error(`默认解析器已禁用：${registry.defaultRenderer}`)
  }
  if (defaultRenderer.mode !== 'static') {
    throw new Error('默认解析器必须是 static 类型')
  }

  const legacyLanguages = new Set<string>()
  for (const renderer of renderers) {
    for (const language of renderer.legacyLanguages) {
      if (legacyLanguages.has(language)) {
        throw new Error(`旧语言别名重复：${language}`)
      }
      legacyLanguages.add(language)
    }
  }
  return { defaultRenderer: registry.defaultRenderer, renderers }
}

export function parseRendererOptions(
  meta: string | undefined,
  renderer: CodeRendererDefinition,
  allowInternal = false
): Record<string, CodeRendererOptionValue> {
  const options = { ...renderer.defaults }
  if (!meta?.trim()) return options

  let cursor = 0
  for (const match of meta.matchAll(metaEntryPattern)) {
    const skipped = meta.slice(cursor, match.index).trim()
    if (skipped) {
      throw new Error(`无法解析代码块参数：${skipped}`)
    }
    cursor = Number(match.index) + match[0].length

    const name = match[1]
    if (!name) continue
    if (name === 'renderer') continue
    if (internalMetaKeys.has(name)) {
      if (!allowInternal) {
        throw new Error(`${name} 是保留参数`)
      }
      continue
    }
    const definition = renderer.options[name]
    if (!definition) {
      throw new Error(`未知参数：${name}`)
    }
    if (!definition.overridable) {
      throw new Error(`参数不允许在代码块中覆盖：${name}`)
    }
    const rawValue = match[2] ?? match[3] ?? match[4] ?? ''
    options[name] = parseOptionValue(rawValue, definition, name)
  }

  const trailing = meta.slice(cursor).trim()
  if (trailing) {
    throw new Error(`无法解析代码块参数：${trailing}`)
  }
  return options
}

export function stripCodeMetaDecorations(meta: string | undefined): string | undefined {
  if (!meta) return undefined
  return meta
    .replace(/\{[^}]*\}/g, '')
    .replace(/\[(?:\\.|[^\]])*\]/g, '')
    .trim() || undefined
}

export function getMetaValue(meta: string | undefined, key: string): string | undefined {
  if (!meta) return undefined
  for (const match of meta.matchAll(metaEntryPattern)) {
    if (match[1] === key) {
      return match[2] ?? match[3] ?? match[4]
    }
  }
  return undefined
}
