import type { CodeRendererAdapterModule } from '../types/code-renderers'

const adapterModules = import.meta.glob<CodeRendererAdapterModule>('../code-renderers/adapters/*.client.ts')

export async function loadCodeRendererAdapter(adapter: string): Promise<CodeRendererAdapterModule> {
  const loader = adapterModules[`../code-renderers/adapters/${adapter}.client.ts`]
  if (!loader) {
    throw new Error(`代码解析器适配器未注册：${adapter}`)
  }
  return loader()
}
