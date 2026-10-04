import type { InjectionKey, ModelRef } from 'vue'

export const tabsKey: InjectionKey<ModelRef<string>> = Symbol('tabs')
