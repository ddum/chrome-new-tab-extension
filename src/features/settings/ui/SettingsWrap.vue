<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue'

import type { SettingsCategoryCode } from '@/features/settings/model/types'

import SettingsMenu from '@/features/settings/ui/SettingsMenu.vue'
import SettingsTransfer from '@/features/settings/ui/SettingsTransfer.vue'
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
    class="w-[560px] h-[520px] flex flex-col overflow-hidden rounded-xl bg-surface shadow-2xl"
  >
    <SettingsMenu />
    <div class="flex-1 overflow-y-auto p-4">
      <TabsContent value="background">
        <SettingsBackground />
      </TabsContent>
      <TabsContent value="links">
        <SettingsLinks />
      </TabsContent>
    </div>
    <div class="flex shrink-0 gap-2 border-t border-border px-4 py-3">
      <SettingsTransfer />
    </div>
  </Tabs>
</template>
