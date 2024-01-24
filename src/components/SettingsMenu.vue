<template>
  <div class="menu-wrap">
    <ul class="menu">
      <li v-for="item in appStore.categoryItems" :key="item.code">
        <button
          class="menu__button"
          :class="{ menu__button_active: item.code === props.activeMenuItem }"
          @click="emit('set-menu-item', item.code)"
        >
          {{ item.title }}
        </button>
      </li>
    </ul>
    <div class="menu-buttons">
      <ButtonBase class="menu-buttons__item" @click="importData"
        >Import <IconBase class="menu-buttons__icon" size="s1"><IconImport /></IconBase
      ></ButtonBase>
      <ButtonBase class="menu-buttons__item" @click="exportData"
        >Export <IconBase class="menu-buttons__icon" size="s1"><IconExport /></IconBase
      ></ButtonBase>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores'
import { saveData, writeData } from '@/scripts/fileSettings'

import ButtonBase from '@/components/element/ButtonBase.vue'
import IconBase from '@/components/element/IconBase.vue'

import IconImport from '@/assets/img/icons/import.svg?component'
import IconExport from '@/assets/img/icons/export.svg?component'

const emit = defineEmits<{
  (e: 'set-menu-item', code: string): void
}>()

const props = defineProps<{
  activeMenuItem: string
}>()

const appStore = useAppStore()

async function importData() {
  const data = await writeData()
  if (data) {
    appStore.appSetValue(data)
  }
}

async function exportData() {
  await saveData(appStore.appValueString)
}
</script>

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
