import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import IconBase from '../IconBase.vue'

test('render IconBase', async () => {
  const wrapper = mount(IconBase, {
    slots: {
      default: 'Icon'
    }
  })

  expect(wrapper.html()).toMatchInlineSnapshot(`"<span data-v-f264a43b="" class="icon icon_s1">Icon</span>"`)

  await wrapper.setProps({ size: 's2' })
  expect(wrapper.html()).toMatchInlineSnapshot(`"<span data-v-f264a43b="" class="icon icon_s2">Icon</span>"`)
})
