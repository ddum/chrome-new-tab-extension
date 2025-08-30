import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { expect, vi } from 'vitest'
import { nextTick } from 'vue'

import SettingsWrap from '../SettingsWrap.vue'

it('settingsWrap - render', async () => {
  const wrapper = mount(SettingsWrap, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })],
    },
  })

  expect(wrapper.findComponent({ name: 'SettingsMenu' }).exists()).toBe(true)
  ;(wrapper.vm as any).currentMenuItemComponent = {
    template: '<div>test Component</div>',
  }

  await nextTick()
  expect(wrapper.html()).toMatch('test Component')
})
