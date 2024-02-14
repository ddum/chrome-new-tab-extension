<template>
  <ButtonIcon :rotate="isLoading" @click="randomBackground" v-tooltip="'Обновить фон'">
    <IconBase>
      <IconRefresh />
    </IconBase>
  </ButtonIcon>
</template>

<script lang="ts" setup>
import { vTooltip } from 'floating-vue'

import IconRefresh from '@/assets/img/icons/refresh.svg?component'
import IconBase from '@/components/element/IconBase.vue'
import ButtonIcon from '@/components/element/ButtonIcon.vue'

import { useAppStore } from '@/stores'
import { useBackground } from '@/composables/useBackground'

const appStore = useAppStore()
const { imgUrl, isLoading, random } = useBackground()

const randomBackground = async () => {
  await random({ tags: appStore.backgroundTags })
  appStore.setBackgroundUrl(imgUrl.value)
}
</script>
