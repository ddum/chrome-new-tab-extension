import { test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { nextTick } from 'vue'

import SettingsLinks from '../SettingsLinks.vue'
import { useAppStore } from '../../stores'

test('render пустой SettingsLinks', async () => {
  const wrapper = mount(SettingsLinks, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        })
      ]
    }
  })
  expect(wrapper.findComponent({ name: 'FormAddLink' }).exists()).toBe(true)
  expect(wrapper.find('.links').exists()).toBe(true)
  expect(wrapper.findComponent({ name: 'Table' }).exists()).toBe(true)
  expect(wrapper.findAll('.table__row')).toHaveLength(0)
})

test('render SettingsLinks', async () => {
  setActivePinia(createPinia())

  const wrapper = mount(SettingsLinks)

  const appStore = useAppStore()
  appStore.addLink('url', 'title')
  appStore.addLink('url1', 'title1')

  await nextTick()
  expect(wrapper.findAll('.table__row')).toHaveLength(2)
})
