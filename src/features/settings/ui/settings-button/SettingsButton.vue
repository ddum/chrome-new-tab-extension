<script lang="ts" setup>
import { Settings } from '@lucide/vue'
import { ref } from 'vue'

import { SettingsWrap } from '@/features/settings/ui/settings-wrap'
import { Button } from '@/shared/ui/button'
import { Popover } from '@/shared/ui/popover'

const isOpen = ref(false)
</script>

<template>
  <Popover v-model:open="isOpen">
    <template #trigger>
      <Button variant="overlay" size="sm" aria-label="Открыть настройки">
        <Settings :size="20" />
      </Button>
    </template>
    <SettingsWrap />
  </Popover>
</template>
