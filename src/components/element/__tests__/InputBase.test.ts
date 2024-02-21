import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import InputBase from '../InputBase.vue'

test('render InputBase', () => {
  const wrapper = mount(InputBase, {
    props: {
      modelValue: 'Input Text',
      placeholder: 'Placeholder Text'
    }
  })

  expect(wrapper.html()).toMatchInlineSnapshot(
    `"<input data-v-56868875="" type="text" class="input" placeholder="Placeholder Text">"`
  )

  const input = wrapper.find('.input')
  expect((input.element as HTMLInputElement).value).toBe('Input Text')
})

test('InputBase ввод текста', async () => {
  const wrapper = mount(InputBase)
  const input = wrapper.find('.input')

  await input.setValue('Test Text')
  expect((input.element as HTMLInputElement).value).toBe('Test Text')

  expect(wrapper.emitted()).toHaveProperty('update:model-value')
})
