import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import LinksList from '../LinksList.vue'

it('рендер пустого LinksList', () => {
  const wrapper = mount(LinksList, {
    props: {
      links: [],
    },
  })
  expect(wrapper.findAll('.links__item')).toHaveLength(0)
})

it('рендер LinksList', () => {
  const wrapper = mount(LinksList, {
    props: {
      links: [
        { title: 'test', url: 'testURL' },
        { title: 'test2', url: 'testURL2' },
      ],
    },
  })
  expect(wrapper.findAll('.links__item')).toHaveLength(2)
  expect(wrapper.findAll('.links__link')).toHaveLength(2)
})
