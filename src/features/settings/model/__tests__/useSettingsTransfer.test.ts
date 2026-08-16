import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useSettingsTransfer } from '../useSettingsTransfer'

const { fromJson, toJson, openFile, saveFile } = vi.hoisted(() => ({
  fromJson: vi.fn(),
  toJson: vi.fn(() => '{"ok":true}'),
  openFile: vi.fn(),
  saveFile: vi.fn(),
}))

vi.mock('../backup', () => ({
  useSettingsBackup: () => ({ toJson, fromJson }),
}))

vi.mock('@/shared/lib/useFileSystem', () => ({
  default: () => ({ openFile, saveFile }),
}))

describe('перенос настроек в файл', () => {
  beforeEach(() => {
    fromJson.mockReset()
    toJson.mockClear()
    openFile.mockReset()
    saveFile.mockReset()
    toJson.mockReturnValue('{"ok":true}')
  })

  it('importSettings прокидывает содержимое файла в fromJson', async () => {
    openFile.mockResolvedValue('{"links":{"items":[]}}')

    const transfer = useSettingsTransfer()
    await transfer.importSettings()

    expect(fromJson).toHaveBeenCalledWith('{"links":{"items":[]}}')
  })

  it('importSettings не меняет snapshot при пустом файле', async () => {
    openFile.mockResolvedValue('')

    const transfer = useSettingsTransfer()
    await transfer.importSettings()

    expect(fromJson).not.toHaveBeenCalled()
  })

  it('exportSettings отдаёт JSON в saveFile', async () => {
    const transfer = useSettingsTransfer()
    await transfer.exportSettings()

    expect(saveFile).toHaveBeenCalledWith(
      '{"ok":true}',
      expect.objectContaining({
        suggestedName: 'new_tab_settings',
      }),
    )
  })
})
