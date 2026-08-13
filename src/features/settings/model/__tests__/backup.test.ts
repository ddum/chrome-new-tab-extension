import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect } from 'vitest'

import { useBackgroundStore } from '@/features/background/model/store'
import { useLinksStore } from '@/features/links/model/store'

import { useSettingsBackup } from '../backup'

beforeEach(() => {
  setActivePinia(createPinia())
})

afterEach(() => {
  localStorage.clear()
})

describe('резервное копирование настроек', () => {
  it('fromJson заменяет переданные секции', () => {
    const backup = useSettingsBackup()
    const value = {
      background: {
        url: 'test',
        tags: ['a', 'b'],
      },
      links: {
        items: [],
      },
    }

    backup.fromJson(JSON.stringify(value))
    expect(backup.toJson()).toBe(JSON.stringify(value))
  })

  it('fromJson сохраняет отсутствующие секции', () => {
    const backgroundStore = useBackgroundStore()
    const linksStore = useLinksStore()
    const backup = useSettingsBackup()

    backgroundStore.setUrl('kept-url')
    linksStore.addLink('url', 'title')

    backup.fromJson(JSON.stringify({
      background: {
        url: 'new-url',
        tags: ['x'],
      },
    }))

    expect(backgroundStore.url).toBe('new-url')
    expect(backgroundStore.tags).toEqual(['x'])
    expect(linksStore.items).toEqual([{ url: 'url', title: 'title' }])
  })
})
