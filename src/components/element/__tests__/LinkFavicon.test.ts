import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import LinkFavicon from '../LinkFavicon.vue'

test('render LinkFavicon', async () => {
  const wrapper = mount(LinkFavicon, {
    props: {
      domain: 'https://www.google.com'
    }
  })

  expect(wrapper.html()).toMatchInlineSnapshot(
    `"<img data-v-c0fbb94c="" src="https://www.google.com/s2/favicons?sz=32&amp;domain=https://www.google.com" class="icon-favicon">"`
  )
})
