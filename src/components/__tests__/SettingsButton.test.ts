import { mount } from '@vue/test-utils'
import { expect } from 'vitest'
import { nextTick } from 'vue'

import SettingsButton from '../SettingsButton.vue'

it('settingsButton рендер', async () => {
  const wrapper = mount(SettingsButton, {
    global: {
      stubs: {
        SettingsWrap: {
          template: '<div class="settings-wrap"></div>',
        },
      },
    },
  })

  const button = wrapper.findComponent({ name: 'ButtonIcon' })
  expect(wrapper.findComponent({ name: 'VDropdown' }).exists()).toBe(true)
  expect(button.exists()).toBe(true)

  await button.trigger('click')
  await nextTick()

  requestAnimationFrame(() => {
    expect(document.querySelector('.settings-wrap')).not.toBeNull()
  })
})
