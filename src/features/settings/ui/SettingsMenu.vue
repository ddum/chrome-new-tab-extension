<script lang="ts" setup>
import { Download, Upload } from '@lucide/vue'

import type { CategoryItem } from '@/features/settings/model/types'

import { useSettingsBackup } from '@/features/settings/model/backup'
import useFileSystem from '@/shared/lib/useFileSystem'
import { Button } from '@/shared/ui/button'

const props = defineProps<{
  menuItems: CategoryItem[]
  activeMenuItem: CategoryItem | null
}>()

const emit = defineEmits<{ setMenuItem: [item: CategoryItem] }>()

const { toJson, fromJson } = useSettingsBackup()
const { saveFile, openFile } = useFileSystem()

async function importData() {
  const data = await openFile({
    types: [
      {
        accept: {
          'text/plain': ['.json'],
        },
      },
    ],
  })
  if (data) {
    fromJson(data)
  }
}

async function exportData() {
  await saveFile(toJson(), {
    suggestedName: 'new_tab_settings',
    types: [
      {
        accept: {
          'text/plain': ['.json'],
        },
      },
    ],
  })
}
</script>

<template>
  <div class="menu-wrap">
    <ul class="menu">
      <li v-for="item in props.menuItems" :key="item.code" class="menu__item">
        <button
          class="menu__button"
          :class="{ menu__button_active: item.code === props.activeMenuItem?.code }"
          @click="emit('setMenuItem', item)"
        >
          {{ item.title }}
        </button>
      </li>
    </ul>
    <div class="flex flex-col gap-2">
      <Button
        class="w-full"
        variant="outline"
        size="sm"
        @click="importData"
      >
        Import
        <Download class="size-4" data-icon="inline-end" />
      </Button>
      <Button
        class="w-full"
        variant="outline"
        size="sm"
        @click="exportData"
      >
        Export
        <Upload class="size-4" data-icon="inline-end" />
      </Button>
    </div>
  </div>
</template>

<style scoped>
.menu-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.menu {
  padding: 0;
  list-style: none;
}
.menu__button {
  border: 0;
  background-color: transparent;
  display: flex;
  padding: 10px;
  color: var(--settings-text-color);
  cursor: pointer;
  font-size: var(--font-size-base);
}
.menu__button:hover,
.menu__button_active {
  color: var(--settings-text-color-hover);
}
</style>
