import { defineAsyncComponent } from 'vue'

export const linksSettingsTab = {
  code: 'links',
  title: 'Ссылки',
  component: defineAsyncComponent(() => import('./ui/SettingsLinks.vue')),
}
