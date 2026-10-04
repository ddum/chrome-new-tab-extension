<script lang="ts" setup>
import { SETTINGS_CATEGORIES } from '@/features/settings/model/categories'
import { TabsList, TabsTrigger } from '@/shared/ui/tabs'
</script>

<template>
  <TabsList>
    <TabsTrigger
      v-for="item in SETTINGS_CATEGORIES"
      :key="item.code"
      :value="item.code"
    >
      {{ item.title }}
    </TabsTrigger>
  </TabsList>
</template>
