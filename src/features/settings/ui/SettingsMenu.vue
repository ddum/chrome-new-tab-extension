<script lang="ts" setup>
import type { SettingsTab } from '@/features/settings/model/types'

import { TabsList, TabsTrigger } from '@/shared/ui/tabs'

interface SettingsMenuProps {
  tabs: readonly SettingsTab[]
}

const props = defineProps<SettingsMenuProps>()
</script>

<template>
  <TabsList>
    <TabsTrigger v-for="item in props.tabs" :key="item.code" :value="item.code">
      {{ item.title }}
    </TabsTrigger>
  </TabsList>
</template>
