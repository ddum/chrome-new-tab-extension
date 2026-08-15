<script lang="ts" setup>
import { Trash2 } from '@lucide/vue'

import { useLinksStore } from '@/features/links/model/store'
import FormAddLink from '@/features/links/ui/FormAddLink.vue'
import { Button } from '@/shared/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '@/shared/ui/item'
import { LinkFavicon } from '@/shared/ui/link-favicon'

const linksStore = useLinksStore()
</script>

<template>
  <div class="flex flex-col gap-4">
    <FormAddLink @submit="linksStore.addLink" />
    <ItemGroup>
      <template
        v-for="link in linksStore.items"
        :key="link.url"
      >
        <Item
          size="sm"
          role="listitem"
          variant="outline"
        >
          <ItemMedia>
            <LinkFavicon
              :domain="link.url"
              class="size-5"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{{ link.title }}</ItemTitle>
          </ItemContent>
          <ItemActions>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label="Удалить"
              @click="linksStore.deleteLink(link.url)"
            >
              <Trash2 class="size-4" />
            </Button>
          </ItemActions>
        </Item>
      </template>
    </ItemGroup>
  </div>
</template>
