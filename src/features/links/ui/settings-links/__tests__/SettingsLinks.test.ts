import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, expect, vi } from 'vitest'
import { nextTick } from 'vue'

import { useLinksStore } from '@/features/links/model/store'

import SettingsLinks from '../SettingsLinks.vue'

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  localStorage.clear()
})

it('рендер пустого SettingsLinks', async () => {
  const wrapper = mount(SettingsLinks, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
    },
  })
  expect(wrapper.findComponent({ name: 'FormAddLink' }).exists()).toBe(true)
  expect(wrapper.findAll('li')).toHaveLength(0)
  expect(wrapper.findAll('button[aria-label="Удалить"]')).toHaveLength(0)
})

it('рендер SettingsLinks', async () => {
  setActivePinia(createPinia())

  const wrapper = mount(SettingsLinks)

  const linksStore = useLinksStore()
  linksStore.addLink('url', 'title')
  linksStore.addLink('url1', 'title1')

  await nextTick()
  const items = wrapper.findAll('li')
  expect(items.map(item => item.text().trim())).toEqual(['title', 'title1'])
  expect(wrapper.findAll('button[aria-label="Переместить"]')).toHaveLength(2)
  expect(wrapper.findAll('button[aria-label="Удалить"]')).toHaveLength(2)
})
