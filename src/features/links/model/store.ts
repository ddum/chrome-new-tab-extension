import { defineStore } from 'pinia'
import { computed } from 'vue'

import { useAppSnapshot } from '@/shared/lib/useAppSnapshot'

export const useLinksStore = defineStore('links', () => {
  const appValue = useAppSnapshot()

  const items = computed(() => appValue.value.links.items)

  function addLink(url: string, title: string) {
    if (
      url === ''
      || title === ''
      || appValue.value.links.items.some(link => link.url === url)
    ) {
      return
    }

    appValue.value.links.items.push({ url, title })
  }

  function deleteLink(url: string) {
    appValue.value.links.items = appValue.value.links.items.filter(link => link.url !== url)
  }

  return {
    items,
    addLink,
    deleteLink,
  }
})
