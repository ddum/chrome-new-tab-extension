import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { expect, vi } from 'vitest'
import { nextTick } from 'vue'

import { useBackgroundStore } from '@/features/background/model/store'

import SettingsBackground from '../SettingsBackground.vue'

it('рендер пустого SettingsBackground', async () => {
  const wrapper = mount(SettingsBackground, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
    },
  })
  expect(wrapper.findComponent({ name: 'FormUnsplashKey' }).exists()).toBe(true)
  expect(wrapper.findComponent({ name: 'FormAddTag' }).exists()).toBe(true)
  expect(wrapper.findComponent({ name: 'FormAddTag' }).props('modelValue')).toEqual([])
})

it('рендер SettingsBackground', async () => {
  setActivePinia(createPinia())

  const wrapper = mount(SettingsBackground)

  const backgroundStore = useBackgroundStore()
  backgroundStore.setTags(['test', 'test2'])

  await nextTick()
  expect(wrapper.text()).toContain('test')
  expect(wrapper.text()).toContain('test2')
})
