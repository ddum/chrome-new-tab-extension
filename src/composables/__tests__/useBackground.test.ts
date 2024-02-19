import { test, expect, vi } from 'vitest'
import { useBackground } from '../useBackground'

global.fetch = vi.fn().mockResolvedValue({ url: 'testURL' })

const { imgUrl, isLoading, random } = useBackground()

test('imgUrl default', () => {
  expect(imgUrl.value).toBe('')
})
test('isLoading default', () => {
  expect(isLoading.value).toBe(false)
})

test('random image', async () => {
  await random({ tags: ['a', 'b'], size: [100, 100] })

  expect(fetch).toHaveBeenCalledWith('https://source.unsplash.com/random/100x100/?a,b')

  expect(imgUrl.value).toBe('testURL')
  expect(isLoading.value).toBe(false)
})
