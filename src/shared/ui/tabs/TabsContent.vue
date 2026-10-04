<script setup lang="ts">
import { inject } from 'vue'

import { tabsKey } from './keys'

interface TabsContentProps {
  value: string
}

const props = defineProps<TabsContentProps>()

const injected = inject(tabsKey)

if (!injected) {
  throw new Error('TabsContent must be used inside Tabs')
}

const model = injected
</script>

<template>
  <div v-if="model === props.value">
    <slot />
  </div>
</template>
