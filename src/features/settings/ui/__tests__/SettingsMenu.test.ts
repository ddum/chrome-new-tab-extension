import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import { defineComponent } from 'vue'

import type { SettingsTab } from '@/features/settings/model/types'

import { Tabs } from '@/shared/ui/tabs'

import SettingsMenu from '../SettingsMenu.vue'

const tabs: SettingsTab[] = [
  { code: 'background', title: 'Фон', component: { template: '<div />' } },
  { code: 'links', title: 'Ссылки', component: { template: '<div />' } },
]

function mountMenu() {
  return mount(defineComponent({
    components: { Tabs, SettingsMenu },
    setup() {
      return { tabs }
    },
    template: '<Tabs model-value="background"><SettingsMenu :tabs="tabs" /></Tabs>',
  }))
}

it('settingsMenu показывает категории', () => {
  const wrapper = mountMenu()

  expect(wrapper.text()).toContain('Фон')
  expect(wrapper.text()).toContain('Ссылки')
})
