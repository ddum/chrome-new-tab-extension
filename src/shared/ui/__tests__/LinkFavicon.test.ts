import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { LinkFavicon } from '../link-favicon'

function googleFaviconSrc(domain: string) {
  return `https://www.google.com/s2/favicons?sz=32&domain=${domain}`
}

describe('linkFavicon', () => {
  it('использует домен без схемы как domain для Google Favicon', () => {
    const wrapper = mount(LinkFavicon, {
      props: {
        domain: 'github.com',
      },
    })

    expect(wrapper.get('img').attributes('src')).toBe(googleFaviconSrc('github.com'))
  })

  it('извлекает hostname из полного URL с путём', () => {
    const wrapper = mount(LinkFavicon, {
      props: {
        domain: 'https://github.com/vuejs/core',
      },
    })

    expect(wrapper.get('img').attributes('src')).toBe(googleFaviconSrc('github.com'))
  })

  it('извлекает hostname из URL без протокола', () => {
    const wrapper = mount(LinkFavicon, {
      props: {
        domain: 'www.google.com/search?q=vue',
      },
    })

    expect(wrapper.get('img').attributes('src')).toBe(googleFaviconSrc('www.google.com'))
  })
})
