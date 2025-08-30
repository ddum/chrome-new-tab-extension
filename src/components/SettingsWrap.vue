<script lang="ts" setup>
import { defineAsyncComponent, ref, shallowRef, watchEffect } from 'vue'

import SettingsMenu from '@/components/SettingsMenu.vue'
import { useAppStore } from '@/stores'

const appStore = useAppStore()

const currentMenuItem = ref<string>(appStore.categoryItems[0].code)
function setCurrentMenuItem(code: string) {
  currentMenuItem.value = code
}

const currentMenuItemComponent = shallowRef(null)
watchEffect(() => {
  const code = currentMenuItem.value
  currentMenuItemComponent.value = defineAsyncComponent(
    () => import(`@/components/Settings${code[0].toUpperCase() + code.slice(1)}.vue`),
  )
})
</script>

<template>
  <div class="settings">
    <div class="settings__menu">
      <SettingsMenu :active-menu-item="currentMenuItem" @set-menu-item="setCurrentMenuItem" />
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
