<script setup lang="ts">
import { provide } from 'vue'

import { tabsKey } from './keys'

const model = defineModel<string>({ default: 'background' })

provide(tabsKey, model)
</script>

<template>
  <div>
    <slot />
  </div>
</template>
