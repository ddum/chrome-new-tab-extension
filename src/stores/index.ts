import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type * as Types from '@/stores/types'
import { get, save } from '@/scripts/storage'

const categoryItems: Types.CategoryItem[] = [
  {
    title: 'Фон',
    code: 'background'
  }
]

const storageKeyBackground = 'background'
const backgroundValue: Types.BackgroundValue = get<Types.BackgroundValue>(storageKeyBackground, {
  url: '',
  tags: []
})

export const useAppStore = defineStore('app', () => {
  const valueApp = ref<Types.AppValue>({
    background: backgroundValue
  })

  function setValue<C extends keyof Types.AppValue, K extends keyof Types.AppValue[C]>(
    category: C,
    code: K,
    value: Types.AppValue[C][K]
  ): void {
    valueApp.value[category][code] = value
    save(valueApp.value[category], category)
  }

  function getValue<C extends keyof Types.AppValue, K extends keyof Types.AppValue[C]>(
    category: C,
    code: K
  ): Types.AppValue[C][K] {
    return valueApp.value[category][code]
  }

  return {
    categoryItems,
    setBackgroundUrl: (url: string) => setValue('background', 'url', url),
    backgroundUrl: computed(() => getValue('background', 'url')),
    setBackgroundTags: (tags: string[]) => setValue('background', 'tags', tags),
    backgroundTags: computed(() => getValue('background', 'tags'))
  }
})
