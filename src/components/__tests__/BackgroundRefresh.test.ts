import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, expect, it, vi } from 'vitest'

import { useAppStore } from '../../stores'
import BackgroundRefresh from '../BackgroundRefresh.vue'

beforeEach(() => {
  setActivePinia(createPinia())
})

it('backgroundRefresh смена background', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({ url: 'testURL' })

  const wrapper = mount(BackgroundRefresh, { shallow: true })
  expect(wrapper.find('button-icon-stub').exists()).toBe(true)

  wrapper.get('button-icon-stub').trigger('click')
  await flushPromises()
  const appStore = useAppStore()

  expect(appStore.backgroundUrl).toBe('testURL')
})
