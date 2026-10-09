import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect } from 'vitest'

import { STORAGE_KEY } from '@/shared/config/app'

import { useBackgroundStore } from '../store'

beforeEach(() => {
  localStorage.clear()
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

  it('по умолчанию активен Unsplash с пустыми настройками', () => {
    const backgroundStore = useBackgroundStore()
    expect(backgroundStore.source).toBe('unsplash')
    expect(backgroundStore.sources.unsplash).toEqual({ tags: [], accessKey: '' })
  })

  it('сохраняет настройки источника в snapshot', () => {
    const backgroundStore = useBackgroundStore()
    backgroundStore.setSourceSettings('unsplash', { tags: ['a'], accessKey: 'test-access-key' })

    expect(backgroundStore.sources.unsplash).toEqual({ tags: ['a'], accessKey: 'test-access-key' })
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).background.sources.unsplash)
      .toEqual({ tags: ['a'], accessKey: 'test-access-key' })
  })

  it('восстанавливает отсутствующую секцию после изменения в другой вкладке', () => {
    const backgroundStore = useBackgroundStore()
    backgroundStore.setUrl('test')

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ links: { items: [] } }))
    window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }))

    expect(backgroundStore.url).toBe('')
    expect(backgroundStore.source).toBe('unsplash')
    expect(backgroundStore.sources.unsplash).toEqual({ tags: [], accessKey: '' })
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!).background).toEqual({
      url: '',
      source: 'unsplash',
      sources: {
        unsplash: { tags: [], accessKey: '' },
      },
    })
  })
})
