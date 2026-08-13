import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'

import { useBackgroundStore } from '@/features/background/model/store'

import BackgroundRefresh from '../BackgroundRefresh.vue'

function stubImagePreload() {
  class MockImage {
    onload: (() => void) | null = null
    onerror: (() => void) | null = null
    #src = ''

    set src(value: string) {
      this.#src = value
      queueMicrotask(() => this.onload?.())
    }

    get src() {
      return this.#src
    }
  }

  vi.stubGlobal('Image', MockImage)
}

beforeEach(() => {
  setActivePinia(createPinia())
  stubImagePreload()
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  localStorage.clear()
})

it('backgroundRefresh смена фона', async () => {
  const rawUrl = 'https://images.unsplash.com/photo-test'
  globalThis.fetch = vi.fn().mockResolvedValue({
    status: 200,
    json: async () => ({ urls: { raw: rawUrl } }),
  })

  useBackgroundStore().setAccessKey('test-access-key')

  const wrapper = mount(BackgroundRefresh, { shallow: true })
  expect(wrapper.find('button-icon-stub').exists()).toBe(true)

  await wrapper.get('button-icon-stub').trigger('click')
  await flushPromises()

  const expected = new URL(rawUrl)
  expected.searchParams.append('w', String(window.innerWidth))
  expected.searchParams.append('h', String(window.innerHeight))

  expect(useBackgroundStore().url).toBe(expected.href)
})
