import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import { defineComponent } from 'vue'

import type { SettingsTab } from '../types'

import { provideSettingsTabs, useSettingsTabs } from '../useSettingsTabs'

const tabs: SettingsTab[] = [
  { code: 'background', title: 'Фон', component: { template: '<div />' } },
]

it('useSettingsTabs возвращает переданный список', () => {
  const Child = defineComponent({
    setup() {
      const result = useSettingsTabs()
      return { result }
    },
    template: '<div>{{ result[0].title }}</div>',
  })

  const wrapper = mount(defineComponent({
    components: { Child },
    setup() {
      provideSettingsTabs(tabs)
    },
    template: '<Child />',
  }))

  expect(wrapper.text()).toBe('Фон')
})

it('useSettingsTabs бросает ошибку, если список не передан', () => {
  expect(() => {
    mount(defineComponent({
      setup() {
        useSettingsTabs()
        return () => null
      },
    }))
  }).toThrow('Settings tabs are not provided')
})
