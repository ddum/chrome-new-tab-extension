<script lang="ts" setup>
import type { CategoryItem } from '@/features/settings/model/types'

import { useSettingsBackup } from '@/features/settings/model/backup'
import IconExport from '@/shared/assets/img/icons/export.svg?component'
import IconImport from '@/shared/assets/img/icons/import.svg?component'
import useFileSystem from '@/shared/lib/useFileSystem'
import ButtonBase from '@/shared/ui/ButtonBase.vue'
import IconBase from '@/shared/ui/IconBase.vue'

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
    <div class="menu-buttons">
      <ButtonBase class="menu-buttons__item" @click="importData">
        Import <IconBase class="menu-buttons__icon" size="s1">
          <IconImport />
        </IconBase>
      </ButtonBase>
      <ButtonBase class="menu-buttons__item" @click="exportData">
        Export <IconBase class="menu-buttons__icon" size="s1">
          <IconExport />
        </IconBase>
      </ButtonBase>
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

.menu-buttons {
  display: flex;
  flex-direction: column;
}
.menu-buttons__item {
  width: 100%;
  margin: 5px 0;
}
.menu-buttons__icon {
  margin-left: 10px;
}
</style>
