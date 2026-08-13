<script lang="ts" setup>
import type { Component } from 'vue'

import { computed, defineAsyncComponent, ref, shallowRef, watch } from 'vue'

import type { CategoryItem } from '@/features/settings/model/types'

import SettingsMenu from '@/features/settings/ui/SettingsMenu.vue'

const categoryItems: CategoryItem[] = [
  {
    title: 'Фон',
    code: 'background',
  },
  {
    title: 'Ссылки',
    code: 'links',
  },
]

const currentMenuItem = ref<CategoryItem | null>(categoryItems[0] ?? null)

const currentComponentCode = computed(() => currentMenuItem.value?.code ?? '')

function setCurrentMenuItem(item: CategoryItem) {
  currentMenuItem.value = item
}

const loaders = {
  links: () => import('@/features/links/ui/SettingsLinks.vue'),
  background: () => import('@/features/background/ui/SettingsBackground.vue'),
}

const currentMenuItemComponent = shallowRef<Component | null>(null)
watch(currentComponentCode, () => {
  currentMenuItemComponent.value = defineAsyncComponent(
    loaders[currentComponentCode.value as keyof typeof loaders],
  )
}, { immediate: true })
</script>

<template>
  <div class="settings">
    <div class="settings__menu">
      <SettingsMenu
        :menu-items="categoryItems"
        :active-menu-item="currentMenuItem"
        @set-menu-item="setCurrentMenuItem"
      />
    </div>
    <div class="settings__content">
      <component :is="currentMenuItemComponent" />
    </div>
  </div>
</template>

<style scoped>
.settings {
  display: flex;
  flex-direction: row;
  width: 600px;
  min-height: 500px;
}
.settings__menu {
  padding: 15px;
  border-right: 1px solid var(--settings-border-color);
  width: 150px;
}

.settings__content {
  padding: 20px 25px;
  flex: 1;
  max-height: 500px;
  overflow: auto;
}

.settings__content::-webkit-scrollbar {
  width: 6px;
}
.settings__content::-webkit-scrollbar-thumb {
  background-color: #0003;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
}
.settings__content::-webkit-scrollbar-track {
  border-radius: 10px;
}
</style>
