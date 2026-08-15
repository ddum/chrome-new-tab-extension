<script lang="ts" setup>
import type { LinkItem } from '@/features/links/model/types'

import { LinkFavicon } from '@/shared/ui/link-favicon'

interface Props {
  links: LinkItem[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <a
      v-for="link in props.links"
      :key="link.url"
      :href="link.url"
      class="flex items-center gap-2 text-base text-white no-underline"
    >
      <LinkFavicon :domain="link.url" class="size-5" />
      <div class="text-shadow-[0_0_17px_black]">
        {{ link.title }}
      </div>
    </a>
  </div>
</template>
