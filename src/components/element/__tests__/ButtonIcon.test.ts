import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import ButtonIcon from '../ButtonIcon.vue'

test('render ButtonIcon', async () => {
  const wrapper = mount(ButtonIcon, {
    slots: {
      default: 'Button Text'
    }
  })

  expect(wrapper.html()).toMatchInlineSnapshot(
    `"<button data-v-d7d230bf="" class="button button_rotate_hover">Button Text</button>"`
  )

  await wrapper.setProps({ rotateHover: false, rotate: true })
  expect(wrapper.html()).toMatchInlineSnapshot(
    `"<button data-v-d7d230bf="" class="button button_rotate">Button Text</button>"`
  )
})
