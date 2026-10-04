import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'

import { Field } from '../field'

it('field рендерит подпись и слот ввода', () => {
  const wrapper = mount(Field, {
    props: {
      label: 'Заголовок',
      for: 'field-id',
    },
    slots: {
      default: '<input id="field-id" />',
    },
  })

  const label = wrapper.get('label')
  expect(label.text()).toBe('Заголовок')
  expect(label.attributes('for')).toBe('field-id')
  expect(wrapper.get('#field-id').element.tagName).toBe('INPUT')
})
