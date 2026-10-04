<script setup lang="ts">
import { computed } from 'vue'

interface LinkFaviconProps {
  domain: string
}

const props = defineProps<LinkFaviconProps>()

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
    class="size-4 shrink-0"
  >
</template>
