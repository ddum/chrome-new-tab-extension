import { afterEach, expect, it, vi } from 'vitest'

import { UNSPLASH_API_ORIGIN } from '@/shared/config/app'

import { fetchRandomPhoto } from '../unsplash'

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

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

it('fetchRandomPhoto запрашивает случайное фото Unsplash и возвращает предзагруженный url', async () => {
  stubImagePreload()
  const rawUrl = 'https://images.unsplash.com/photo-test'
  globalThis.fetch = vi.fn().mockResolvedValue({
    status: 200,
    json: async () => ({ urls: { raw: rawUrl } }),
  })

  const url = await fetchRandomPhoto({
    accessKey: 'test-access-key',
    tags: ['a', 'b'],
    size: [100, 200],
  })

  const called = String(vi.mocked(fetch).mock.calls[0]?.[0])
  expect(called).toContain(`${UNSPLASH_API_ORIGIN}/photos/random/`)
  expect(called).toContain('client_id=test-access-key')
  expect(called).toContain('query=a%2Cb')
  expect(called).toContain('orientation=landscape')
  expect(url).toContain('w=100')
  expect(url).toContain('h=200')
})

it('fetchRandomPhoto возвращает пустую строку и не вызывает fetch без ключа', async () => {
  globalThis.fetch = vi.fn()
  expect(await fetchRandomPhoto()).toBe('')
  expect(await fetchRandomPhoto({ accessKey: '' })).toBe('')
  expect(fetch).not.toHaveBeenCalled()
})

it('fetchRandomPhoto возвращает пустую строку, если ответ не 200', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({ status: 404 })
  expect(await fetchRandomPhoto({ accessKey: 'test-access-key' })).toBe('')
})
