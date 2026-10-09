import type { InjectionKey } from 'vue'

import { inject, provide } from 'vue'

import type { SettingsTab } from './types'

const settingsTabsKey: InjectionKey<readonly SettingsTab[]> = Symbol('settingsTabs')

export function provideSettingsTabs(tabs: readonly SettingsTab[]) {
  provide(settingsTabsKey, tabs)
}

export function useSettingsTabs() {
  const tabs = inject(settingsTabsKey)

  if (!tabs?.length) {
    throw new Error('Settings tabs are not provided')
  }

  return tabs
}
