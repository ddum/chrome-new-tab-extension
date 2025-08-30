import { flushPromises } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'

import { useBackground } from '../useBackground'

const { imgUrl, isLoading, random } = useBackground()

it('imgUrl default', () => {
  expect(imgUrl.value).toBe('')
})
it('isLoading default', () => {
  expect(isLoading.value).toBe(false)
})

globalThis.fetch = vi.fn().mockResolvedValue({ url: 'testURL' })

it('random image', async () => {
  expect(isLoading.value).toBe(false)

  random({ tags: ['a', 'b'], size: [100, 100] })

  expect(isLoading.value).toBe(true)

  await flushPromises()

  expect(fetch).toHaveBeenCalledWith('https://source.unsplash.com/random/100x100/?a,b')
  expect(imgUrl.value).toBe('testURL')
  expect(isLoading.value).toBe(false)
})

it('random image без параметров', async () => {
  await random()
  expect(fetch).toHaveBeenCalledWith('https://source.unsplash.com/random/')
})
