<script lang="ts" setup>
import { RefreshCw } from '@lucide/vue'

import { useBackgroundStore } from '@/features/background/model/store'
import { useRandomBackground } from '@/features/background/model/useRandomBackground'
import { Button } from '@/shared/ui/button'

const backgroundStore = useBackgroundStore()
const { imgUrl, isLoading, random } = useRandomBackground()

async function randomBackground() {
  await random({
    accessKey: backgroundStore.accessKey,
    tags: backgroundStore.tags,
    size: [window.innerWidth, window.innerHeight],
  })
  if (imgUrl.value) {
    backgroundStore.setUrl(imgUrl.value)
  }
}
</script>

<template>
  <Button
    class="self-start"
    :disabled="isLoading"
    @click="randomBackground"
  >
    <RefreshCw
      :size="14"
      :class="isLoading ? 'animate-spin' : ''"
    />
    Обновить фон
  </Button>
</template>
