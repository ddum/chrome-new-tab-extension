<script lang="ts" setup>
import { Dropdown, vTooltip } from 'floating-vue'

import IconSettings from '@/assets/img/icons/settings.svg?component'
import ButtonIcon from '@/components/element/ButtonIcon.vue'
import IconBase from '@/components/element/IconBase.vue'
import SettingsWrap from '@/components/SettingsWrap.vue'
</script>

<template>
  <Dropdown>
    <ButtonIcon v-tooltip="'Открыть настройки'">
      <IconBase>
        <IconSettings />
      </IconBase>
    </ButtonIcon>

    <template #popper>
      <SettingsWrap />
    </template>
  </Dropdown>
</template>
