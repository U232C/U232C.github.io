export type CodeRendererOptionDefinition =
  | {
      type: 'number'
      min?: number
      max?: number
      overridable: boolean
    }
  | {
      type: 'number-list'
      length?: number
      validate?: 'bounding-box'
      overridable: boolean
    }
  | {
      type: 'boolean'
      overridable: boolean
    }

export type CodeRendererOptionValue = number | number[] | boolean

interface CodeRendererBaseDefinition {
  id: string
  label: string
  enabled: boolean
  presentation: {
    source: 'expanded' | 'collapsed'
  }
  styles: string[]
  legacyLanguages: string[]
  defaults: Record<string, CodeRendererOptionValue>
  options: Record<string, CodeRendererOptionDefinition>
}

export interface StaticCodeRendererDefinition extends CodeRendererBaseDefinition {
  mode: 'static'
  fallbackLanguage: string
  highlight: {
    languages: string[]
    themes: {
      default: string
      dark: string
    }
  }
}

export interface InteractiveCodeRendererDefinition extends CodeRendererBaseDefinition {
  mode: 'interactive'
  adapter: string
  executable: boolean
  syntax: 'javascript' | 'none'
  acceptedLanguages: string[]
  highlightLanguage: string
}

export type CodeRendererDefinition =
  | StaticCodeRendererDefinition
  | InteractiveCodeRendererDefinition

export interface CodeRendererRegistryEntry {
  id: string
  config: string
}

export interface CodeRendererRegistry {
  defaultRenderer: string
  renderers: CodeRendererRegistryEntry[]
}

export interface CodeRenderersConfig extends Record<string, unknown> {
  defaultRenderer: string
  renderers: CodeRendererDefinition[]
}

export interface RendererContext {
  target: HTMLElement
  code: string
  options: Record<string, CodeRendererOptionValue>
}

export interface RendererInstance {
  resize(): void
  dispose(): void
}

export interface CodeRendererAdapter {
  mount(context: RendererContext): Promise<RendererInstance>
}

export type CodeRendererAdapterModule = {
  default: CodeRendererAdapter
}
