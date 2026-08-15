import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect } from 'vitest'

import { STORAGE_KEY } from '@/shared/config/app'

import { useBackgroundStore } from '../store'

beforeEach(() => {
  setActivePinia(createPinia())
})

afterEach(() => {
  localStorage.clear()
})

describe('backgroundStore', () => {
  it('устанавливает url фона', () => {
    const backgroundStore = useBackgroundStore()
    backgroundStore.setUrl('test')
    expect(backgroundStore.url).toBe('test')
  })

  it('устанавливает теги', () => {
    const backgroundStore = useBackgroundStore()
    expect(backgroundStore.tags).toEqual([])
    backgroundStore.setTags(['a'])
    expect(backgroundStore.tags).toEqual(['a'])
    backgroundStore.setTags(['a', 'b'])
    expect(backgroundStore.tags).toEqual(['a', 'b'])
  })

  it('сохраняет accessKey', () => {
    const backgroundStore = useBackgroundStore()
    backgroundStore.setAccessKey('test-access-key')
    expect(backgroundStore.accessKey).toBe('test-access-key')
  })

  it('сбрасывает accessKey пустой строкой', () => {
    const backgroundStore = useBackgroundStore()
    backgroundStore.setAccessKey('test-access-key')
    backgroundStore.setAccessKey('')
    expect(backgroundStore.accessKey).toBe('')
  })

  it('читает пустой accessKey из старого snapshot без поля', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      background: {
        url: '',
        tags: [],
      },
      links: {
        items: [],
      },
    }))
    setActivePinia(createPinia())

    const backgroundStore = useBackgroundStore()
    expect(backgroundStore.accessKey).toBe('')
  })
})
