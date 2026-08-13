<script lang="ts" setup>
import { vTooltip } from 'floating-vue'

import { useBackgroundStore } from '@/features/background/model/store'
import { useRandomBackground } from '@/features/background/model/useRandomBackground'
import IconRefresh from '@/shared/assets/img/icons/refresh.svg?component'
import ButtonIcon from '@/shared/ui/ButtonIcon.vue'
import IconBase from '@/shared/ui/IconBase.vue'

const backgroundStore = useBackgroundStore()
const { imgUrl, isLoading, random } = useRandomBackground()

async function randomBackground() {
  await random({
    tags: backgroundStore.tags,
    size: [window.innerWidth, window.innerHeight],
  })
  if (imgUrl.value) {
    backgroundStore.setUrl(imgUrl.value)
  }
}
</script>

<template>
  <ButtonIcon v-tooltip="'Обновить фон'" :rotate="isLoading" @click="randomBackground">
    <IconBase>
      <IconRefresh />
    </IconBase>
  </ButtonIcon>
</template>
