import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, expect, vi } from 'vitest'
import { nextTick } from 'vue'

import { useBackgroundStore } from '@/features/background/model/store'

import SettingsBackground from '../SettingsBackground.vue'

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  localStorage.clear()
})

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
  expect(wrapper.findComponent({ name: 'BackgroundRefresh' }).exists()).toBe(true)
  expect(wrapper.text()).toContain('Обновить фон')
})

it('рендер SettingsBackground', async () => {
  setActivePinia(createPinia())

  const wrapper = mount(SettingsBackground)

  const backgroundStore = useBackgroundStore()
  backgroundStore.setTags(['test', 'test2'])

  await nextTick()
  expect(
    wrapper.findAll('[aria-label^="Удалить "]').map(button => button.attributes('aria-label')),
  ).toEqual(['Удалить test', 'Удалить test2'])
})
