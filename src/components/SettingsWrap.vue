<template>
  <div class="settings">
    <div class="settings__menu">
      <SettingsMenu @set-menu-item="setCurrentMenuItem" :active-menu-item="currentMenuItem" />
    </div>
    <div class="settings__content">
      <component :is="currentMenuItemComponent" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, shallowRef, defineAsyncComponent } from 'vue'

import SettingsMenu from '@/components/SettingsMenu.vue'

import { useAppStore } from '@/stores'
const appStore = useAppStore()

let currentMenuItem = ref<string>(appStore.categoryItems[0].code)
function setCurrentMenuItem(code: string) {
  currentMenuItem.value = code
}

const currentMenuItemComponent = shallowRef(null)
watchEffect(() => {
  let code = currentMenuItem.value
  currentMenuItemComponent.value = defineAsyncComponent(
    () => import(`@/components/Settings${code[0].toUpperCase() + code.slice(1)}.vue`)
  )
})
</script>

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
}
</style>
@/stores
