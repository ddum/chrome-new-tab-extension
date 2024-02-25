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
  const defaultBackgroundValue: Types.BackgroundValue = {
    url: '',
    tags: []
  }
  const defaultLinksValue: Types.LinksValue = {
    items: []
  }

  const backgroundValue = useStorage<Types.BackgroundValue>(codeBackground, defaultBackgroundValue)
  const linksValue = useStorage<Types.LinksValue>(codeLinks, defaultLinksValue)

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
    addTag: (value: string) => {
      if (value !== '' && !backgroundValue.value.tags.includes(value)) {
        const tags = [...backgroundValue.value.tags, value]
        backgroundValue.value = Object.assign(backgroundValue.value, { tags })
      }
    },
    deleteTag: (value: string) => {
      const tags = backgroundValue.value.tags.filter((tag) => tag !== value)
      backgroundValue.value = Object.assign(backgroundValue.value, { tags })
    },
    // Links
    addLink: (url: string, title: string) => {
      if (url === '' || title === '') {
        return
      }

      const link = { url, title }
      linksValue.value = Object.assign(linksValue.value, {
        items: [...linksValue.value.items, link]
      })
    },
    deleteLink: (url: string) => {
      linksValue.value = Object.assign(linksValue.value, {
        items: linksValue.value.items.filter((link) => link.url !== url)
      })
    },
    links: computed((): Types.LinksValue['items'] => linksValue.value.items)
  }
})
