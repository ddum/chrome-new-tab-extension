import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import { defineComponent } from 'vue'

import { Tabs } from '@/shared/ui/tabs'

import SettingsMenu from '../SettingsMenu.vue'

function mountMenu() {
  return mount(defineComponent({
    components: { Tabs, SettingsMenu },
    template: '<Tabs model-value="background"><SettingsMenu /></Tabs>',
  }))
}

it('settingsMenu показывает категории', () => {
  const wrapper = mountMenu()

  expect(wrapper.text()).toContain('Фон')
  expect(wrapper.text()).toContain('Ссылки')
})
