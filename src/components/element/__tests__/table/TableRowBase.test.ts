import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import TableRowBase from '../../table/TableRowBase.vue'

test('render TableRowBase', () => {
  const wrapper = mount(TableRowBase, {
    slots: {
      default: 'Table Row'
    }
  })

  expect(wrapper.find('tr.table__row').text()).toContain('Table Row')
})
