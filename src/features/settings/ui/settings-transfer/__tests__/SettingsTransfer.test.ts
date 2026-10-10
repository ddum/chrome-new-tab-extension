import { mount } from '@vue/test-utils'
import { beforeEach, expect, it, vi } from 'vitest'

import { SettingsTransfer } from '..'

const transferMocks = vi.hoisted(() => ({
  importSettings: vi.fn(),
  exportSettings: vi.fn(),
}))

vi.mock('@/features/settings/model/useSettingsTransfer', () => ({
  useSettingsTransfer: () => transferMocks,
}))

beforeEach(() => {
  transferMocks.importSettings.mockClear()
  transferMocks.exportSettings.mockClear()
})

it('settingsTransfer показывает кнопки импорта и экспорта', () => {
  const wrapper = mount(SettingsTransfer)

  expect(wrapper.text()).toContain('Импорт')
  expect(wrapper.text()).toContain('Экспорт')
})

it('settingsTransfer вызывает импорт и экспорт', async () => {
  const wrapper = mount(SettingsTransfer)

  const buttons = wrapper.findAll('button')
  const importButton = buttons.find(button => button.text().includes('Импорт'))
  const exportButton = buttons.find(button => button.text().includes('Экспорт'))

  await importButton!.trigger('click')
  await exportButton!.trigger('click')

  expect(transferMocks.importSettings).toHaveBeenCalledTimes(1)
  expect(transferMocks.exportSettings).toHaveBeenCalledTimes(1)
})
