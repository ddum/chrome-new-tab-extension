import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import { defineComponent } from 'vue'

import { Tabs } from '@/shared/ui/tabs'

import SettingsMenu from '../SettingsMenu.vue'

function mountMenu() {
  return mount(defineComponent({
    components: { Tabs, SettingsMenu },
    template: '<Tabs default-value="background"><SettingsMenu /></Tabs>',
  }), {
    global: {
      stubs: {
        SettingsTransfer: true,
      },
    },
  })
}

it('settingsMenu показывает категории', () => {
  const wrapper = mountMenu()

  expect(wrapper.text()).toContain('Фон')
  expect(wrapper.text()).toContain('Ссылки')
  expect(wrapper.findComponent({ name: 'SettingsTransfer' }).exists()).toBe(true)
})
