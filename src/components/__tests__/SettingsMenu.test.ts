import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'

import SettingsMenu from '../SettingsMenu.vue'

test('SettingsMenu - render списка категорий', () => {
  setActivePinia(createPinia())

  const wrapper = mount(SettingsMenu, {
    shallow: true
  })

  expect(wrapper.find('.menu').exists()).toBe(true)
  expect(wrapper.findAll('.menu__item')).toHaveLength(2)
})

test('SettingsMenu - кнопки import/export', async () => {
  const wrapper = mount(SettingsMenu, {
    global: {
      stubs: { IconBase: { template: 'icon' } }
    }
  })

  expect(wrapper.html()).toMatch('Import icon')
  expect(wrapper.html()).toMatch('Export icon')
})
