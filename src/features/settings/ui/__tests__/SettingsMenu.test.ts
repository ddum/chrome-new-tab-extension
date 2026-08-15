import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { expect } from 'vitest'

import SettingsMenu from '../SettingsMenu.vue'

const menuItems = [
  { title: 'Фон', code: 'background' },
  { title: 'Ссылки', code: 'links' },
]

it('settingsMenu - рендер списка категорий', () => {
  setActivePinia(createPinia())

  const wrapper = mount(SettingsMenu, {
    shallow: true,
    props: {
      menuItems,
      activeMenuItem: menuItems[0],
    },
  })

  expect(wrapper.find('.menu').exists()).toBe(true)
  expect(wrapper.findAll('.menu__item')).toHaveLength(2)
})

it('settingsMenu - кнопки импорта/экспорта', async () => {
  const wrapper = mount(SettingsMenu, {
    props: {
      menuItems,
      activeMenuItem: menuItems[0],
    },
  })

  expect(wrapper.text()).toContain('Import')
  expect(wrapper.text()).toContain('Export')
})
