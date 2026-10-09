import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { LinkFavicon } from '../link-favicon'

function chromeFaviconSrc(pageUrl: string) {
  const url = new URL('chrome-extension://extension-id/_favicon/')
  url.searchParams.set('pageUrl', pageUrl)
  url.searchParams.set('size', '32')
  return url.toString()
}

describe('linkFavicon', () => {
  beforeEach(() => {
    const runtime = {
      getURL(path: string) {
        if (this !== runtime)
          throw new TypeError('Illegal invocation')

        return `chrome-extension://extension-id${path}`
      },
    }

    vi.stubGlobal('chrome', { runtime })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('по умолчанию красит запасную иконку цветом текста', () => {
    vi.unstubAllGlobals()

    const wrapper = mount(LinkFavicon, {
      props: {
        domain: 'github.com',
      },
    })

    expect(wrapper.get('span').classes()).toContain('text-foreground')
  })

  it('красит запасную иконку вариантом overlay', () => {
    vi.unstubAllGlobals()

    const wrapper = mount(LinkFavicon, {
      props: {
        domain: 'github.com',
        variant: 'overlay',
      },
    })

    expect(wrapper.get('span').classes()).toEqual(
      expect.arrayContaining(['text-on-image', 'drop-shadow']),
    )
  })

  it('строит chrome-extension URL для домена без схемы', () => {
    const wrapper = mount(LinkFavicon, {
      props: {
        domain: 'github.com',
      },
    })

    expect(wrapper.get('img').attributes('src')).toBe(chromeFaviconSrc('https://github.com/'))
    expect(wrapper.get('img').attributes('src')).not.toContain('google.com/s2/favicons')
  })

  it('передаёт полный адрес страницы', () => {
    const wrapper = mount(LinkFavicon, {
      props: {
        domain: 'https://github.com/vuejs/core',
      },
    })

    expect(wrapper.get('img').attributes('src')).toBe(
      chromeFaviconSrc('https://github.com/vuejs/core'),
    )
  })

  it('дополняет схемой адрес без протокола', () => {
    const wrapper = mount(LinkFavicon, {
      props: {
        domain: 'www.google.com/search?q=vue',
      },
    })

    expect(wrapper.get('img').attributes('src')).toBe(
      chromeFaviconSrc('https://www.google.com/search?q=vue'),
    )
  })

  it('показывает локальную иконку, если Chrome API недоступен', () => {
    vi.unstubAllGlobals()

    const wrapper = mount(LinkFavicon, {
      props: {
        domain: 'github.com',
      },
    })

    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('показывает локальную иконку для неразборного адреса', () => {
    const wrapper = mount(LinkFavicon, {
      props: {
        domain: 'http://',
      },
    })

    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('заменяет битую картинку локальной иконкой', async () => {
    const wrapper = mount(LinkFavicon, {
      props: {
        domain: 'github.com',
      },
    })

    await wrapper.get('img').trigger('error')

    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('снова запрашивает иконку при смене адреса', async () => {
    const wrapper = mount(LinkFavicon, {
      props: {
        domain: 'github.com',
      },
    })

    await wrapper.get('img').trigger('error')
    await wrapper.setProps({ domain: 'gitlab.com' })

    expect(wrapper.get('img').attributes('src')).toBe(chromeFaviconSrc('https://gitlab.com/'))
  })
})
