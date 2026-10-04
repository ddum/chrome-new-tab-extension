<script setup lang="ts">
import { computed, inject } from 'vue'

import { tabsKey } from './keys'
import { tabsTriggerVariants } from './TabsTrigger.style'

interface TabsTriggerProps {
  value: string
}

const props = defineProps<TabsTriggerProps>()

const injected = inject(tabsKey)

if (!injected) {
  throw new Error('TabsTrigger must be used inside Tabs')
}

const model = injected
const selected = computed(() => model.value === props.value)

function select() {
  model.value = props.value
}
</script>

<template>
  <button
    type="button"
    :class="tabsTriggerVariants({ selected })"
    :aria-selected="selected"
    @click="select"
  >
    <slot />
  </button>
</template>
