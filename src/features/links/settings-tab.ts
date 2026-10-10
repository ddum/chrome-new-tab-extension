import { defineAsyncComponent } from 'vue'

export const linksSettingsTab = {
  code: 'links',
  title: 'Ссылки',
  component: defineAsyncComponent(() => import('./ui/settings-links').then(module => module.SettingsLinks)),
}
