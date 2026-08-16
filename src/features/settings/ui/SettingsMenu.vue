<script lang="ts" setup>
import { SETTINGS_CATEGORIES } from '@/features/settings/model/categories'
import SettingsTransfer from '@/features/settings/ui/SettingsTransfer.vue'
import { TabsList, TabsTrigger } from '@/shared/ui/tabs'
</script>

<template>
  <div class="flex h-full flex-col justify-between">
    <TabsList class="flex h-auto w-full flex-col bg-transparent p-0">
      <TabsTrigger
        v-for="item in SETTINGS_CATEGORIES"
        :key="item.code"
        :value="item.code"
        class="w-full justify-start"
      >
        {{ item.title }}
      </TabsTrigger>
    </TabsList>
    <SettingsTransfer />
  </div>
</template>
