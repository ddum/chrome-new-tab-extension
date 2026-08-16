<script lang="ts" setup>
import { Download, Upload } from '@lucide/vue'

import { useSettingsTransfer } from '@/features/settings/model/useSettingsTransfer'
import { Button } from '@/shared/ui/button'

const { importSettings, exportSettings } = useSettingsTransfer()
</script>

<template>
  <div class="flex flex-col gap-2">
    <Button
      class="w-full"
      variant="outline"
      size="sm"
      @click="importSettings"
    >
      Импорт
      <Upload data-icon="inline-end" class="size-4" />
    </Button>
    <Button
      class="w-full"
      variant="outline"
      size="sm"
      @click="exportSettings"
    >
      Экспорт
      <Download data-icon="inline-end" class="size-4" />
    </Button>
  </div>
</template>
