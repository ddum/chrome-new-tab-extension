import { test, expect, vi } from 'vitest'
import { useBackground } from '../useBackground'
import { flushPromises } from '@vue/test-utils'

const { imgUrl, isLoading, random } = useBackground()

test('imgUrl default', () => {
  expect(imgUrl.value).toBe('')
})
test('isLoading default', () => {
  expect(isLoading.value).toBe(false)
})

global.fetch = vi.fn().mockResolvedValue({ url: 'testURL' })

test('random image', async () => {
  expect(isLoading.value).toBe(false)

  random({ tags: ['a', 'b'], size: [100, 100] })

  expect(isLoading.value).toBe(true)

  await flushPromises()

  expect(fetch).toHaveBeenCalledWith('https://source.unsplash.com/random/100x100/?a,b')
  expect(imgUrl.value).toBe('testURL')
  expect(isLoading.value).toBe(false)
})

test('random image без параметров', async () => {
  await random()
  expect(fetch).toHaveBeenCalledWith('https://source.unsplash.com/random/')
})
