<script lang="ts" setup>
import type { LinkItem } from '@/features/links/model/types'

import { LinkFavicon } from '@/shared/ui/link-favicon'

interface Props {
  links: LinkItem[]
}

const props = defineProps<Props>()
</script>

<template>
  <nav class="flex flex-col gap-0.5">
    <a
      v-for="link in props.links"
      :key="link.url"
      :href="link.url"
      class="
        flex items-center gap-2 rounded-md px-2 py-1 transition-colors
        hover:bg-on-image/20 focus-visible:bg-on-image/20 focus-visible:outline-none
      "
    >
      <LinkFavicon :domain="link.url" variant="overlay" />
      <span class="text-sm font-medium text-on-image drop-shadow">
        {{ link.title }}
      </span>
    </a>
  </nav>
</template>
