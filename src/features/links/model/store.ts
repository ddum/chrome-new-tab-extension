import { defineStore } from 'pinia'
import { computed } from 'vue'

import { useSnapshotSection } from '@/shared/model/app-snapshot/useAppSnapshot'

import type { LinksValue } from './types'

const DEFAULT_VALUE: LinksValue = {
  items: [],
}

export const useLinksStore = defineStore('links', () => {
  const links = useSnapshotSection('links', DEFAULT_VALUE)

  const items = computed(() => links.value.items)

  function addLink(url: string, title: string) {
    if (
      url === ''
      || title === ''
      || links.value.items.some(link => link.url === url)
    ) {
      return
    }

    links.value.items.push({ url, title })
  }

  function deleteLink(url: string) {
    links.value.items = links.value.items.filter(link => link.url !== url)
  }

  return {
    items,
    addLink,
    deleteLink,
  }
})
