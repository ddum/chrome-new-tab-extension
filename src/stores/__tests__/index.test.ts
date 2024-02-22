import { setActivePinia, createPinia } from 'pinia'
import { describe, test, expect, beforeEach } from 'vitest'

import { useAppStore } from '../index'

describe('App Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('categoryItems', () => {
    const appStore = useAppStore()
    expect(Array.isArray(appStore.categoryItems)).toBe(true)
  })

  test('установка значения', () => {
    const appStore = useAppStore()

    const value = {
      background: {
        url: 'test',
        tags: ['a', 'b']
      },
      links: {
        items: []
      }
    }

    appStore.appSetValue(JSON.stringify(value))
    expect(appStore.appValueString).toBe(JSON.stringify(value))
  })

  test('url background', () => {
    const appStore = useAppStore()
    appStore.setBackgroundUrl('test')
    expect(appStore.backgroundUrl).toBe('test')
  })

  test('tags background', () => {
    const appStore = useAppStore()
    appStore.setBackgroundTags(['a', 'b'])
    expect(appStore.backgroundTags).toEqual(['a', 'b'])
  })

  test('links', () => {
    const appStore = useAppStore()
    appStore.setLinks(['a', 'b'])
    expect(appStore.links).toEqual(['a', 'b'])
  })
})
