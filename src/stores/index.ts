import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type * as Types from '@/stores/types'
import { get, save } from '@/scripts/storage'

const codeBackground = 'background'
const backgroundValue: Types.BackgroundValue = get<Types.BackgroundValue>(codeBackground, {
  url: '',
  tags: []
})

const codeLinks = 'links'
const linksValue: Types.LinksValue = get<Types.LinksValue>(codeLinks, {
  items: []
})

const categoryItems: Types.CategoryItem[] = [
  {
    title: 'Фон',
    code: codeBackground
  },
  {
    title: 'Ссылки',
    code: codeLinks
  }
]

export const useAppStore = defineStore('app', () => {
  const valueApp = ref<Types.AppValue>({
    [`${codeBackground}`]: backgroundValue,
    [`${codeLinks}`]: linksValue
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
    // Background
    setBackgroundUrl: (url: string) => setValue(codeBackground, 'url', url),
    backgroundUrl: computed(() => getValue(codeBackground, 'url')),
    setBackgroundTags: (tags: string[]) => setValue(codeBackground, 'tags', tags),
    backgroundTags: computed(() => getValue(codeBackground, 'tags')),
    // Links
    setLinks: (links: Types.LinkItem[]) => setValue(codeLinks, 'items', links),
    links: computed(() => getValue(codeLinks, 'items'))
  }
})
