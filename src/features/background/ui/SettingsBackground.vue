<script lang="ts" setup>
import { computed } from 'vue'

import type { BackgroundSourceSettings } from '@/features/background/model/types'

import { useBackgroundStore } from '@/features/background/model/store'
import { BACKGROUND_SOURCES } from '@/features/background/sources'

const backgroundStore = useBackgroundStore()
const activeSource = computed(() => BACKGROUND_SOURCES[backgroundStore.source])

function setActiveSourceSettings(
  settings: BackgroundSourceSettings[typeof backgroundStore.source],
) {
  backgroundStore.setSourceSettings(backgroundStore.source, settings)
}
</script>

<template>
  <component
    :is="activeSource.component"
    :model-value="backgroundStore.sources[backgroundStore.source]"
    @update:model-value="setActiveSourceSettings"
    @apply="backgroundStore.setUrl"
  />
</template>
