import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import IconBase from '../IconBase.vue'

it('рендер IconBase', async () => {
  const wrapper = mount(IconBase, {
    slots: {
      default: 'Icon',
    },
  })

  expect(wrapper.get('span').text()).toBe('Icon')
  expect(wrapper.get('span').classes()).toEqual(['icon', 'icon_s1'])

  await wrapper.setProps({ size: 's2' })
  expect(wrapper.get('span').classes()).toEqual(['icon', 'icon_s2'])
})
