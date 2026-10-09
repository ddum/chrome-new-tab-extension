import { defineAsyncComponent } from 'vue'

export const backgroundSettingsTab = {
  code: 'background',
  title: 'Фон',
  component: defineAsyncComponent(() => import('./ui/SettingsBackground.vue')),
}
