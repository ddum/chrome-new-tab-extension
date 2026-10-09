import { afterEach, expect, it, vi } from 'vitest'

import { UNSPLASH_API_ORIGIN } from '@/shared/config/app'

import { fetchRandomPhoto } from '../fetchRandomPhoto'

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

it('запрашивает случайное фото Unsplash и возвращает предзагруженный url', async () => {
  stubImagePreload()
  const rawUrl = 'https://images.unsplash.com/photo-test'
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    status: 200,
    json: async () => ({ urls: { raw: rawUrl } }),
  }))

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

it('возвращает пустую строку и не вызывает fetch без ключа', async () => {
  vi.stubGlobal('fetch', vi.fn())
  expect(await fetchRandomPhoto()).toBe('')
  expect(await fetchRandomPhoto({ accessKey: '' })).toBe('')
  expect(fetch).not.toHaveBeenCalled()
})

it('возвращает пустую строку, если ответ не 200', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ status: 404 }))
  expect(await fetchRandomPhoto({ accessKey: 'test-access-key' })).toBe('')
})

it('возвращает пустую строку, если в ответе нет urls.raw', async () => {
  const fetchMock = vi.fn()
  vi.stubGlobal('fetch', fetchMock)

  for (const body of [{}, { urls: {} }, { urls: { raw: 1 } }, null]) {
    fetchMock.mockResolvedValue({
      status: 200,
      json: async () => body,
    })
    expect(await fetchRandomPhoto({ accessKey: 'test-access-key' })).toBe('')
  }
})
