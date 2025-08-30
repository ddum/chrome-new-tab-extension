import { mount } from '@vue/test-utils'
import { expect } from 'vitest'

import TableBase from '../../table/TableBase.vue'

it('render TableBase', () => {
  const wrapper = mount(TableBase, {
    slots: {
      default: 'Table',
    },
  })

  expect(wrapper.find('table.table').text()).toContain('Table')
})
