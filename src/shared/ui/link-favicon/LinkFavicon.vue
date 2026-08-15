<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { computed } from 'vue'

import { cn } from '@/shared/lib/utils'

const props = defineProps<{
  domain: string
  class?: HTMLAttributes['class']
}>()

const hostname = computed(() => {
  try {
    const value = props.domain
    return new URL(value.includes('://') ? value : `https://${value}`).hostname
  }
  catch {
    return props.domain
  }
})

const faviconSrc = computed(
  () => `https://www.google.com/s2/favicons?sz=32&domain=${encodeURIComponent(hostname.value)}`,
)
</script>

<template>
  <img
    :src="faviconSrc"
    alt=""
    :class="cn('size-full max-h-8 max-w-8', props.class)"
  >
</template>
