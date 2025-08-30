import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { expect, vi } from 'vitest'
import { nextTick } from 'vue'

import { useAppStore } from '../../stores'
import SettingsBackground from '../SettingsBackground.vue'

it('render пустой SettingsBackground', async () => {
  const wrapper = mount(SettingsBackground, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
    },
  })
  expect(wrapper.findComponent({ name: 'FormAddTag' }).exists()).toBe(true)
  expect(wrapper.find('.tags').exists()).toBe(true)

  expect(wrapper.findAllComponents({ name: 'TagBase' })).toHaveLength(0)
})

it('render SettingsBackground', async () => {
  setActivePinia(createPinia())

  const wrapper = mount(SettingsBackground)

  const appStore = useAppStore()
  appStore.addTag('test')
  appStore.addTag('test2')

  await nextTick()
  expect(wrapper.findAllComponents({ name: 'TagBase' })).toHaveLength(2)
})
