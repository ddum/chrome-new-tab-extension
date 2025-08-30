import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import ButtonIcon from '../ButtonIcon.vue'

it('render ButtonIcon', async () => {
  const wrapper = mount(ButtonIcon, {
    slots: {
      default: 'Button Text',
    },
  })

  expect(wrapper.html()).toMatchInlineSnapshot(
    `"<button data-v-d7d230bf="" class="button button_rotate_hover">Button Text</button>"`,
  )

  await wrapper.setProps({ rotateHover: false, rotate: true })
  expect(wrapper.html()).toMatchInlineSnapshot(
    `"<button data-v-d7d230bf="" class="button button_rotate">Button Text</button>"`,
  )
})
