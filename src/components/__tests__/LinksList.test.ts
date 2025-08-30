import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import LinksList from '../LinksList.vue'

it('render пустой LinksList', () => {
  const wrapper = mount(LinksList)
  expect(wrapper.findAll('.links__item')).toHaveLength(0)
})

it('render LinksList', () => {
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
