import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'

import { RefreshUnsplashButton } from '..'
import { fetchRandomPhoto } from '../../../api/fetchRandomPhoto'

vi.mock('../../../api/fetchRandomPhoto', () => ({
  fetchRandomPhoto: vi.fn(),
}))

afterEach(() => {
  vi.resetAllMocks()
})

it('запрашивает фото по настройкам и отдаёт url через apply', async () => {
  vi.mocked(fetchRandomPhoto).mockResolvedValue('https://example.com/photo')

  const wrapper = mount(RefreshUnsplashButton, {
    props: { accessKey: 'test-access-key', tags: ['a'] },
  })
  await wrapper.get('button').trigger('click')
  await flushPromises()

  expect(fetchRandomPhoto).toHaveBeenCalledWith({
    accessKey: 'test-access-key',
    tags: ['a'],
    size: [window.innerWidth, window.innerHeight],
  })
  expect(wrapper.emitted('apply')).toEqual([['https://example.com/photo']])
})

it('не эмитит apply, если фото не получено', async () => {
  vi.mocked(fetchRandomPhoto).mockResolvedValue('')

  const wrapper = mount(RefreshUnsplashButton, {
    props: { accessKey: 'test-access-key', tags: [] },
  })
  await wrapper.get('button').trigger('click')
  await flushPromises()

  expect(wrapper.emitted('apply')).toBeUndefined()
})

it('блокирует кнопку на время загрузки', async () => {
  let resolve!: (url: string) => void
  vi.mocked(fetchRandomPhoto).mockReturnValue(new Promise((r) => {
    resolve = r
  }))

  const wrapper = mount(RefreshUnsplashButton, {
    props: { accessKey: 'test-access-key', tags: [] },
  })
  const button = wrapper.get('button')
  await button.trigger('click')

  expect(button.attributes('disabled')).toBeDefined()

  resolve('')
  await flushPromises()

  expect(button.attributes('disabled')).toBeUndefined()
})
