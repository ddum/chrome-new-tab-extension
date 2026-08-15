<script lang="ts" setup>
import { Settings } from '@lucide/vue'
import { ref } from 'vue'

import SettingsWrap from '@/features/settings/ui/SettingsWrap.vue'
import { Button } from '@/shared/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip'

const isOpen = ref(false)
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <span class="inline-flex">
        <TooltipProvider>
          <Tooltip :disabled="isOpen">
            <TooltipTrigger as-child>
              <Button
                variant="overlay"
                size="icon-lg"
                class="group rounded-full"
                aria-label="Открыть настройки"
              >
                <Settings
                  class="transition-transform duration-200 group-hover:rotate-90"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" align="start">
              Открыть настройки
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
    </PopoverTrigger>
    <PopoverContent
      side="top"
      align="start"
    >
      <SettingsWrap />
    </PopoverContent>
  </Popover>
</template>
