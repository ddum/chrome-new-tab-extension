import { defineStore } from 'pinia'
import { computed } from 'vue'

import { useAppSnapshot } from '@/shared/lib/useAppSnapshot'

export const useBackgroundStore = defineStore('background', () => {
  const appValue = useAppSnapshot()

  const url = computed(() => appValue.value.background.url)
  const tags = computed(() => appValue.value.background.tags)
  const accessKey = computed(() => appValue.value.background.accessKey ?? '')

  function setUrl(value: string) {
    appValue.value.background.url = value
  }

  function setAccessKey(value: string) {
    appValue.value.background.accessKey = value
  }

  function addTag(value: string) {
    if (value === '' || appValue.value.background.tags.includes(value)) {
      return
    }

    appValue.value.background.tags.push(value)
  }

  function deleteTag(tag: string) {
    appValue.value.background.tags = appValue.value.background.tags.filter(item => item !== tag)
  }

  return {
    url,
    tags,
    accessKey,
    setUrl,
    setAccessKey,
    addTag,
    deleteTag,
  }
})
