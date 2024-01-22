<template>
  <ButtonIcon :rotate="true" @click="randomBackground" v-tooltip="'Обновить фон'">
    <IconBase>
      <IconRefresh />
    </IconBase>
  </ButtonIcon>
</template>

<script lang="ts" setup>
import { vTooltip } from 'floating-vue'

import { randomBackground } from '@/scripts/background'

import IconRefresh from '@/assets/img/icons/refresh.svg?component'
import IconBase from '@/components/element/IconBase.vue'
import ButtonIcon from '@/components/element/ButtonIcon.vue'
</script>
