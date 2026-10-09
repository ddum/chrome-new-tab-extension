<script setup lang="ts">
import { Globe } from '@lucide/vue'
import { computed, shallowRef, watch } from 'vue'

import type { LinkFaviconVariantProps } from './LinkFavicon.style'

import { chromeFaviconUrl } from './chromeFaviconUrl'
import { linkFaviconVariants } from './LinkFavicon.style'

interface LinkFaviconProps {
  domain: string
  variant?: LinkFaviconVariantProps['variant']
}

const props = withDefaults(defineProps<LinkFaviconProps>(), {
  variant: 'default',
})

const faviconSrc = computed(() => chromeFaviconUrl(props.domain))
const failed = shallowRef(false)
const imageSrc = computed(() => (failed.value ? null : faviconSrc.value))

watch(faviconSrc, () => {
  failed.value = false
})

function onError() {
  failed.value = true
}
</script>

<template>
  <span :class="linkFaviconVariants({ variant: props.variant })">
    <img
      v-if="imageSrc"
      :src="imageSrc"
      alt=""
      class="size-full"
      @error="onError"
    >
    <Globe v-else class="size-full" aria-hidden="true" />
  </span>
</template>
