import { defineAsyncComponent } from 'vue'

export const backgroundSettingsTab = {
  code: 'background',
  title: 'Фон',
  component: defineAsyncComponent(() => import('./ui/settings-background').then(module => module.SettingsBackground)),
}
