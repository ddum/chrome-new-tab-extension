import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect } from 'vitest'

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

  it('добавляет тег', () => {
    const backgroundStore = useBackgroundStore()
    expect(backgroundStore.tags).toEqual([])
    backgroundStore.addTag('a')
    expect(backgroundStore.tags).toEqual(['a'])
    backgroundStore.addTag('b')
    expect(backgroundStore.tags).toEqual(['a', 'b'])
  })

  it('не добавляет пустые и дублирующиеся теги', () => {
    const backgroundStore = useBackgroundStore()
    backgroundStore.addTag('a')
    backgroundStore.addTag('')
    backgroundStore.addTag('a')
    expect(backgroundStore.tags).toEqual(['a'])
  })

  it('удаляет тег', () => {
    const backgroundStore = useBackgroundStore()
    backgroundStore.addTag('a')
    backgroundStore.addTag('b')
    backgroundStore.addTag('c')
    backgroundStore.deleteTag('b')
    expect(backgroundStore.tags).toEqual(['a', 'c'])
  })
})
