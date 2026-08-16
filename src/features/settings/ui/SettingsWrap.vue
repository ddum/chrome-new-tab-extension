<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue'

import type { SettingsCategoryCode } from '@/features/settings/model/types'

import SettingsMenu from '@/features/settings/ui/SettingsMenu.vue'
import { Separator } from '@/shared/ui/separator'
import { Tabs, TabsContent } from '@/shared/ui/tabs'

const activeCategory = ref<SettingsCategoryCode>('background')

const SettingsBackground = defineAsyncComponent(() =>
  import('@/features/background/ui/SettingsBackground.vue'))
const SettingsLinks = defineAsyncComponent(() =>
  import('@/features/links/ui/SettingsLinks.vue'))
</script>

<template>
  <Tabs
    v-model="activeCategory"
    orientation="vertical"
    class="flex h-125 w-150 flex-row gap-6 p-3"
  >
    <div class="flex w-28 shrink-0 flex-col">
      <SettingsMenu />
    </div>
    <Separator orientation="vertical" />
    <div class="flex min-h-0 flex-1 flex-col overflow-hidden">
      <TabsContent
        value="background"
        class="overflow-auto"
      >
        <SettingsBackground />
      </TabsContent>
      <TabsContent
        value="links"
        class="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <SettingsLinks />
      </TabsContent>
    </div>
  </Tabs>
</template>
