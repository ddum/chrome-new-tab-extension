<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  domain: string
}

const props = defineProps<Props>()

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
    class="icon-favicon"
  >
</template>

<style scoped>
.icon-favicon {
  width: 100%;
  height: 100%;
  max-width: 32px;
  max-height: 32px;
}
</style>
