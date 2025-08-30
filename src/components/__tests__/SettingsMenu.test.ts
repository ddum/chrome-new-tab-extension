import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { expect } from 'vitest'

import SettingsMenu from '../SettingsMenu.vue'

it('settingsMenu - render списка категорий', () => {
  setActivePinia(createPinia())

  const wrapper = mount(SettingsMenu, {
    shallow: true,
  })

  expect(wrapper.find('.menu').exists()).toBe(true)
  expect(wrapper.findAll('.menu__item')).toHaveLength(2)
})

it('settingsMenu - кнопки import/export', async () => {
  const wrapper = mount(SettingsMenu, {
    global: {
      stubs: { IconBase: { template: 'icon' } },
    },
  })

  expect(wrapper.html()).toMatch('Import icon')
  expect(wrapper.html()).toMatch('Export icon')
})
