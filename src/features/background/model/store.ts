import { defineStore } from 'pinia'
import { computed } from 'vue'

import { useAppSnapshot } from '@/shared/lib/useAppSnapshot'

export const useBackgroundStore = defineStore('background', () => {
  const appValue = useAppSnapshot()

  const url = computed(() => appValue.value.background.url)
  const tags = computed(() => appValue.value.background.tags)

  function setUrl(nextUrl: string) {
    appValue.value.background.url = nextUrl
  }

  function addTag(tag: string) {
    if (tag === '' || appValue.value.background.tags.includes(tag)) {
      return
    }

    appValue.value.background.tags.push(tag)
  }

  function deleteTag(tag: string) {
    appValue.value.background.tags = appValue.value.background.tags.filter(item => item !== tag)
  }

  return {
    url,
    tags,
    setUrl,
    addTag,
    deleteTag,
  }
})
