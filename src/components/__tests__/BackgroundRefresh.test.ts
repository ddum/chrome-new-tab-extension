import { test, expect, beforeEach, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'

import BackgroundRefresh from '../BackgroundRefresh.vue'
import { useAppStore } from '../../stores'

beforeEach(() => {
  setActivePinia(createPinia())
})

test('BackgroundRefresh смена background', async () => {
  global.fetch = vi.fn().mockResolvedValue({ url: 'testURL' })

  const wrapper = mount(BackgroundRefresh, { shallow: true })
  expect(wrapper.find('button-icon-stub').exists()).toBe(true)

  wrapper.get('button-icon-stub').trigger('click')
  await flushPromises()
  const appStore = useAppStore()

  expect(appStore.backgroundUrl).toBe('testURL')
})
