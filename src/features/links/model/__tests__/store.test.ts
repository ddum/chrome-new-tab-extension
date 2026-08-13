import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect } from 'vitest'

import { useLinksStore } from '../store'

beforeEach(() => {
  setActivePinia(createPinia())
})

afterEach(() => {
  localStorage.clear()
})

describe('linksStore', () => {
  it('добавляет ссылку', () => {
    const linksStore = useLinksStore()
    expect(linksStore.items).toEqual([])
    linksStore.addLink('url', 'title')
    expect(linksStore.items).toEqual([{ url: 'url', title: 'title' }])
    linksStore.addLink('url1', 'title1')
    expect(linksStore.items).toEqual([
      { url: 'url', title: 'title' },
      { url: 'url1', title: 'title1' },
    ])
  })

  it('не добавляет ссылку с пустым url или title', () => {
    const linksStore = useLinksStore()
    linksStore.addLink('', 'title')
    linksStore.addLink('url', '')
    expect(linksStore.items).toEqual([])
  })

  it('не добавляет ссылку с уже существующим url', () => {
    const linksStore = useLinksStore()
    linksStore.addLink('url', 'title')
    linksStore.addLink('url', 'other-title')
    expect(linksStore.items).toEqual([{ url: 'url', title: 'title' }])
  })

  it('удаляет ссылку', () => {
    const linksStore = useLinksStore()
    linksStore.addLink('url', 'title')
    linksStore.addLink('url1', 'title1')
    linksStore.addLink('url2', 'title2')
    linksStore.deleteLink('url1')
    expect(linksStore.items).toEqual([
      { url: 'url', title: 'title' },
      { url: 'url2', title: 'title2' },
    ])
  })
})
