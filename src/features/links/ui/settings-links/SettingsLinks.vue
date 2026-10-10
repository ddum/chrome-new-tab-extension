<script lang="ts" setup>
import { GripVertical, Trash2 } from '@lucide/vue'

import { useLinksStore } from '@/features/links/model/store'
import { FormAddLink } from '@/features/links/ui/form-add-link'
import { Button } from '@/shared/ui/button'
import { LinkFavicon } from '@/shared/ui/link-favicon'

import { useSettingsLinksDrag } from './useSettingsLinksDrag'

const linksStore = useLinksStore()
const { list, items } = useSettingsLinksDrag()
</script>

<template>
  <div class="flex flex-col gap-3">
    <FormAddLink @submit="linksStore.addLink" />
    <ul ref="list" class="divide-y divide-border">
      <li v-for="link in items" :key="link.url" class="flex items-center gap-2 py-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          class="link-drag-handle cursor-grab!"
          aria-label="Переместить"
        >
          <GripVertical :size="13" />
        </Button>
        <LinkFavicon :domain="link.url" />
        <span class="min-w-0 flex-1 truncate text-sm text-foreground">
          {{ link.title }}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          class="hover:text-danger"
          aria-label="Удалить"
          @click="linksStore.deleteLink(link.url)"
        >
          <Trash2 :size="13" />
        </Button>
      </li>
    </ul>
  </div>
</template>
