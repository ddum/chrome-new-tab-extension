<template>
  <Dropdown>
    <IconButton ref="popcorn" :rotate="true" v-tooltip="'Открыть настройки'">
      <IconBase size="big">
        <IconSettings />
      </IconBase>
    </IconButton>

    <template #popper> Tooltip </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { vTooltip, Dropdown } from 'floating-vue'

import IconSettings from '@/assets/img/icons/settings.svg?component'
import IconBase from '@/components/IconBase.vue'
import IconButton from '@/components/IconButton.vue'
</script>
