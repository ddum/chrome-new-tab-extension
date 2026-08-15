import { mount } from '@vue/test-utils'
import { afterEach, expect, it } from 'vitest'
import { nextTick } from 'vue'

import SettingsButton from '../SettingsButton.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

it('settingsButton открывает настройки', async () => {
  const wrapper = mount(SettingsButton, {
    attachTo: document.body,
    global: {
      stubs: {
        SettingsWrap: {
          template: '<div class="settings-wrap"></div>',
        },
      },
    },
  })

  const button = wrapper.get('button')
  expect(button.attributes('aria-label')).toBe('Открыть настройки')
  expect(document.querySelector('.settings-wrap')).toBeNull()

  await button.trigger('click')
  await nextTick()

  expect(document.querySelector('.settings-wrap')).not.toBeNull()

  wrapper.unmount()
})
