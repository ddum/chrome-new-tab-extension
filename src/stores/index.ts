import { defineStore } from 'pinia'
import { computed } from 'vue'

import type * as Types from '@/stores/types'
import useStorage from '@/composables/useStorage'

const codeBackground = 'background'
const codeLinks = 'links'
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
  const backgroundValue = useStorage<Types.BackgroundValue>(codeBackground, {
    url: '',
    tags: []
  })
  const linksValue = useStorage<Types.LinksValue>(codeLinks, {
    items: []
  })

  function appSetValue(contents: string) {
    const valueApp = JSON.parse(contents)
    if (valueApp[codeBackground]) {
      backgroundValue.value = valueApp[codeBackground] as Types.BackgroundValue
    }
    if (valueApp[codeLinks]) {
      linksValue.value = valueApp[codeLinks] as Types.LinksValue
    }
  }

  return {
    categoryItems,
    appValueString: computed(() =>
      JSON.stringify({
        [codeBackground]: backgroundValue.value,
        [codeLinks]: linksValue.value
      })
    ),
    appSetValue,
    // Background
    backgroundUrl: computed((): Types.BackgroundValue['url'] => backgroundValue.value.url),
    backgroundTags: computed((): Types.BackgroundValue['tags'] => backgroundValue.value.tags),
    setBackgroundUrl: (url: string) => {
      backgroundValue.value = Object.assign(backgroundValue.value, { url })
    },
    setBackgroundTags: (tags: string[]) => {
      backgroundValue.value = Object.assign(backgroundValue.value, { tags })
    },
    // Links
    setLinks: (links: Types.LinkItem[]) => {
      linksValue.value = Object.assign(linksValue.value, { items: links })
    },
    links: computed((): Types.LinksValue['items'] => linksValue.value.items)
  }
})
