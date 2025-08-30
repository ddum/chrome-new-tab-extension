import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import TableRowBase from '../../table/TableRowBase.vue'

it('render TableRowBase', () => {
  const wrapper = mount(TableRowBase, {
    slots: {
      default: 'Table Row',
    },
  })

  expect(wrapper.find('tr.table__row').text()).toContain('Table Row')
})
