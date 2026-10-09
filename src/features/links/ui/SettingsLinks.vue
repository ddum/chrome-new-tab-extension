<script lang="ts" setup>
import { Trash2 } from '@lucide/vue'

import { useLinksStore } from '@/features/links/model/store'
import FormAddLink from '@/features/links/ui/FormAddLink.vue'
import { Button } from '@/shared/ui/button'
import { LinkFavicon } from '@/shared/ui/link-favicon'

const linksStore = useLinksStore()
</script>

<template>
  <div class="flex flex-col gap-3">
    <FormAddLink @submit="linksStore.addLink" />
    <ul class="divide-y divide-border">
      <li v-for="link in linksStore.items" :key="link.url" class="flex items-center gap-2 py-2">
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
