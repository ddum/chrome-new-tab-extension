<script lang="ts" setup>
import { Download, Upload } from '@lucide/vue'

import { useSettingsTransfer } from '@/features/settings/model/useSettingsTransfer'
import { Button } from '@/shared/ui/button'

const { importSettings, exportSettings } = useSettingsTransfer()
</script>

<template>
  <Button
    variant="outline"
    @click="importSettings"
  >
    <Upload :size="14" />
    Импорт
  </Button>
  <Button
    variant="outline"
    @click="exportSettings"
  >
    <Download :size="14" />
    Экспорт
  </Button>
</template>
