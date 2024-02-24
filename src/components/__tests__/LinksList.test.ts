import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import LinksList from '../LinksList.vue'

test('render пустой LinksList', () => {
  const wrapper = mount(LinksList)
  expect(wrapper.findAll('.links__item')).toHaveLength(0)
})

test('render LinksList', () => {
  const wrapper = mount(LinksList, {
    props: {
      links: [
        { title: 'test', url: 'testURL' },
        { title: 'test2', url: 'testURL2' }
      ]
    }
  })
  expect(wrapper.findAll('.links__item')).toHaveLength(2)
  expect(wrapper.findAll('.links__link')).toHaveLength(2)
})
