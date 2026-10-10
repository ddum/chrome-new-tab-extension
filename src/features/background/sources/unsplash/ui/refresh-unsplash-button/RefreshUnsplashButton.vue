<script lang="ts" setup>
import { RefreshCw } from '@lucide/vue'

import { Button } from '@/shared/ui/button'

import { useRandomPhoto } from '../../model/useRandomPhoto'

interface RefreshUnsplashButtonProps {
  accessKey: string
  tags: string[]
}

const props = defineProps<RefreshUnsplashButtonProps>()

const emit = defineEmits<{
  apply: [url: string]
}>()

const { imgUrl, isLoading, random } = useRandomPhoto()

async function refresh() {
  await random({
    accessKey: props.accessKey,
    tags: props.tags,
    size: [window.innerWidth, window.innerHeight],
  })
  if (imgUrl.value) {
    emit('apply', imgUrl.value)
  }
}
</script>

<template>
  <Button class="self-start" :disabled="isLoading" @click="refresh">
    <RefreshCw :size="14" :class="isLoading ? 'animate-spin' : ''" />
    Обновить фон
  </Button>
</template>
