<script lang="ts" setup>
import { Dropdown, vTooltip } from 'floating-vue'

import SettingsWrap from '@/features/settings/ui/SettingsWrap.vue'
import IconSettings from '@/shared/assets/img/icons/settings.svg?component'
import ButtonIcon from '@/shared/ui/ButtonIcon.vue'
import IconBase from '@/shared/ui/IconBase.vue'
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
