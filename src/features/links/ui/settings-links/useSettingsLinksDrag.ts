import { useDragAndDrop } from '@formkit/drag-and-drop/vue'
import { watch } from 'vue'

import type { LinkItem } from '@/features/links/model/types'

import { useLinksStore } from '@/features/links/model/store'

function copyLink(link: LinkItem): LinkItem {
  return { url: link.url, title: link.title }
}

function sameLinks(left: LinkItem[], right: LinkItem[]) {
  return left.length === right.length
    && left.every((link, index) => link.url === right[index]?.url)
}

export function useSettingsLinksDrag() {
  const linksStore = useLinksStore()

  const [list, items] = useDragAndDrop<LinkItem>(
    linksStore.items.map(copyLink),
    {
      dragHandle: '.link-drag-handle',
      draggingClass: 'opacity-40',
      onSort({ values }) {
        linksStore.reorderLinks(values)
      },
    },
  )

  watch(
    () => linksStore.items.map(link => link.url),
    () => {
      if (!sameLinks(items.value, linksStore.items))
        items.value = linksStore.items.map(copyLink)
    },
  )

  return { list, items }
}
