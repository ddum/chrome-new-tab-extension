import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'

import { Layout } from '..'

it('показывает содержимое переданных областей', () => {
  const wrapper = mount(Layout, {
    props: { imageUrl: 'https://example.com/photo.jpg' },
    slots: {
      'center': '12:00',
      'header-left': 'Ссылки',
      'footer-left': 'Настройки',
    },
  })

  expect(wrapper.text()).toContain('12:00')
  expect(wrapper.text()).toContain('Ссылки')
  expect(wrapper.text()).toContain('Настройки')
  expect(wrapper.get('[data-slot="layout"]').attributes('style')).toContain('photo.jpg')
})

it('не рисует пустую правую часть шапки', () => {
  const wrapper = mount(Layout, {
    slots: {
      'center': '12:00',
      'header-left': 'Ссылки',
      'footer-left': 'Настройки',
    },
  })

  expect(wrapper.find('[data-slot="layout-center"]').exists()).toBe(true)
  expect(wrapper.find('[data-slot="layout-header-left"]').exists()).toBe(true)
  expect(wrapper.find('[data-slot="layout-footer"]').exists()).toBe(true)
})

it('не рисует области без слотов', () => {
  const wrapper = mount(Layout)

  expect(wrapper.find('[data-slot="layout-center"]').exists()).toBe(false)
  expect(wrapper.find('[data-slot="layout-header"]').exists()).toBe(false)
  expect(wrapper.find('[data-slot="layout-footer"]').exists()).toBe(false)
})
