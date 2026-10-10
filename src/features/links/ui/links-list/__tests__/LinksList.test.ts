import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import LinksList from '../LinksList.vue'

it('рендер пустого LinksList', () => {
  const wrapper = mount(LinksList, {
    props: {
      links: [],
    },
  })
  expect(wrapper.findAll('a')).toHaveLength(0)
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
  const anchors = wrapper.findAll('a')
  expect(anchors).toHaveLength(2)
  expect(anchors[0]?.attributes('href')).toBe('testURL')
  expect(anchors[0]?.text()).toContain('test')
  expect(anchors[1]?.attributes('href')).toBe('testURL2')
  expect(anchors[1]?.text()).toContain('test2')
})
