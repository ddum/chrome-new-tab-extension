import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import TableBase from '../../table/TableBase.vue'

test('render TableBase', () => {
  const wrapper = mount(TableBase, {
    slots: {
      default: 'Table'
    }
  })

  expect(wrapper.find('table.table').text()).toContain('Table')
})
