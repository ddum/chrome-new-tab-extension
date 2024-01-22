<template>
  <Dropdown>
    <ButtonIcon ref="popcorn" :rotate="true" v-tooltip="'Открыть настройки'">
      <IconBase>
        <IconSettings />
      </IconBase>
    </ButtonIcon>

    <template #popper>
      <SettingsWrap />
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { vTooltip, Dropdown } from 'floating-vue'

import IconSettings from '@/assets/img/icons/settings.svg?component'
import IconBase from '@/components/element/IconBase.vue'
import ButtonIcon from '@/components/element/ButtonIcon.vue'
import SettingsWrap from '@/components/SettingsWrap.vue'
</script>
