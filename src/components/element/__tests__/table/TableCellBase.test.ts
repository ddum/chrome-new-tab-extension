import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import TableCellBase from '../../table/TableCellBase.vue'

it('render TableCellBase', async () => {
  const wrapper = mount(TableCellBase, {
    slots: {
      default: 'Table Cell',
    },
  })

  expect(wrapper.find('td.table__cell').text()).toContain('Table Cell')

  await wrapper.setProps({ align: 'left' })
  expect(wrapper.find('td.table__cell_left').text()).toContain('Table Cell')
})
