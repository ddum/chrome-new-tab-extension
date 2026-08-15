<script lang="ts" setup>
import { RefreshCw } from '@lucide/vue'

import { useBackgroundStore } from '@/features/background/model/store'
import { useRandomBackground } from '@/features/background/model/useRandomBackground'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'

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
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          variant="overlay"
          size="icon-lg"
          class="group rounded-full"
          aria-label="Обновить фон"
          @click="randomBackground"
        >
          <RefreshCw
            :class="cn(
              'transition-transform duration-200 group-hover:rotate-90',
              isLoading && 'animate-spin',
            )"
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" align="end">
        Обновить фон
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
