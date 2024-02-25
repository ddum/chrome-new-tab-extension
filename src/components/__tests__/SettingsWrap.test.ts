import { test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import SettingsWrap from '../SettingsWrap.vue'
import { nextTick } from 'vue'

test('SettingsWrap - render', async () => {
  const wrapper = mount(SettingsWrap, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })]
    }
  })

  expect(wrapper.findComponent({ name: 'SettingsMenu' }).exists()).toBe(true)
  ;(wrapper.vm as any).currentMenuItemComponent = {
    template: '<div>test Component</div>'
  }

  await nextTick()
  expect(wrapper.html()).toMatch('test Component')
})
