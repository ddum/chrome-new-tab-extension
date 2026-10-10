<script lang="ts" setup>
import { ref } from 'vue'

import { useSettingsTabs } from '@/features/settings/model/useSettingsTabs'
import { SettingsMenu } from '@/features/settings/ui/settings-menu'
import { SettingsTransfer } from '@/features/settings/ui/settings-transfer'
import { Tabs, TabsContent } from '@/shared/ui/tabs'

const tabs = useSettingsTabs()
const activeCategory = ref(tabs[0].code)
</script>

<template>
  <Tabs
    v-model="activeCategory"
    class="w-140 h-130 flex flex-col overflow-hidden rounded-xl bg-surface shadow-2xl"
  >
    <SettingsMenu :tabs="tabs" />
    <div class="flex-1 overflow-y-auto p-4">
      <TabsContent v-for="tab in tabs" :key="tab.code" :value="tab.code">
        <component :is="tab.component" />
      </TabsContent>
    </div>
    <div class="flex shrink-0 gap-2 border-t border-border px-4 py-3">
      <SettingsTransfer />
    </div>
  </Tabs>
</template>
