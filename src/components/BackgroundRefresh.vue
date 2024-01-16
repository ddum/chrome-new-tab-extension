<template>
  <IconButton @click="randomBackground" title="Обновить фон">
    <IconBase size="big">
      <IconRefresh />
    </IconBase>
  </IconButton>
</template>

<script lang="ts" setup>
import { randomBackground } from '@/scripts/background'

import IconRefresh from '@/assets/img/icons/refresh.svg?component'
import IconBase from '@/components/IconBase.vue'
import IconButton from '@/components/IconButton.vue'
</script>
