import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect } from 'vitest'

import { useAppStore } from '../index'

beforeEach(() => {
  setActivePinia(createPinia())
})

afterEach(() => {
  localStorage.clear()
})

describe('appStore - общее значение', () => {
  it('categoryItems', () => {
    const appStore = useAppStore()
    expect(Array.isArray(appStore.categoryItems)).toBe(true)
  })

  it('установка значения', () => {
    const appStore = useAppStore()

    const value = {
      background: {
        url: 'test',
        tags: ['a', 'b'],
      },
      links: {
        items: [],
      },
    }

    appStore.appSetValue(JSON.stringify(value))
    expect(appStore.appValueString).toBe(JSON.stringify(value))
  })
})

describe('appStore - background', () => {
  it('url background', () => {
    const appStore = useAppStore()
    appStore.setBackgroundUrl('test')
    expect(appStore.backgroundUrl).toBe('test')
  })

  it('tags add', () => {
    const appStore = useAppStore()
    expect(appStore.backgroundTags).toEqual([])
    appStore.addTag('a')
    expect(appStore.backgroundTags).toEqual(['a'])
    appStore.addTag('b')
    expect(appStore.backgroundTags).toEqual(['a', 'b'])
  })

  it('tags delete', () => {
    const value = {
      background: {
        url: 'test',
        tags: ['a', 'b', 'c'],
      },
      links: {
        items: [],
      },
    }

    const appStore = useAppStore()
    appStore.appSetValue(JSON.stringify(value))
    appStore.deleteTag('b')
    expect(appStore.backgroundTags).toEqual(['a', 'c'])
  })
})

describe('appStore - links', () => {
  it('links add', () => {
    const appStore = useAppStore()
    expect(appStore.links).toEqual([])
    appStore.addLink('url', 'title')
    expect(appStore.links).toEqual([{ url: 'url', title: 'title' }])
    appStore.addLink('url1', 'title1')
    expect(appStore.links).toEqual([
      { url: 'url', title: 'title' },
      { url: 'url1', title: 'title1' },
    ])
  })

  it('links delete', () => {
    const value = {
      background: {},
      links: {
        items: [
          { url: 'url', title: 'title' },
          { url: 'url1', title: 'title1' },
          { url: 'url2', title: 'title2' },
        ],
      },
    }

    const appStore = useAppStore()
    appStore.appSetValue(JSON.stringify(value))
    appStore.deleteLink('url1')
    expect(appStore.links).toEqual([
      { url: 'url', title: 'title' },
      { url: 'url2', title: 'title2' },
    ])
  })
})
