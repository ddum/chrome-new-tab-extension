<script lang="ts" setup>
import { vTooltip } from 'floating-vue'

import IconRefresh from '@/assets/img/icons/refresh.svg?component'
import ButtonIcon from '@/components/element/ButtonIcon.vue'
import IconBase from '@/components/element/IconBase.vue'
import { useBackground } from '@/composables/useBackground'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const { imgUrl, isLoading, random } = useBackground()

async function randomBackground() {
  await random({
    tags: appStore.backgroundTags,
    size: [window.innerWidth, window.innerHeight],
  })
  appStore.setBackgroundUrl(imgUrl.value)
}
</script>

<template>
  <ButtonIcon v-tooltip="'Обновить фон'" :rotate="isLoading" @click="randomBackground">
    <IconBase>
      <IconRefresh />
    </IconBase>
  </ButtonIcon>
</template>
