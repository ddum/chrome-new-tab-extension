import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { expect, vi } from 'vitest'
import { nextTick } from 'vue'

import { useLinksStore } from '@/features/links/model/store'

import SettingsLinks from '../SettingsLinks.vue'

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
  expect(wrapper.find('.links').exists()).toBe(true)
  expect(wrapper.findComponent({ name: 'Table' }).exists()).toBe(true)
  expect(wrapper.findAll('.table__row')).toHaveLength(0)
})

it('рендер SettingsLinks', async () => {
  setActivePinia(createPinia())

  const wrapper = mount(SettingsLinks)

  const linksStore = useLinksStore()
  linksStore.addLink('url', 'title')
  linksStore.addLink('url1', 'title1')

  await nextTick()
  expect(wrapper.findAll('.table__row')).toHaveLength(2)
})
