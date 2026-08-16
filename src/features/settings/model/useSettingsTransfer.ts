import { useSettingsBackup } from '@/features/settings/model/backup'
import useFileSystem from '@/shared/lib/useFileSystem'

const SETTINGS_FILE_TYPES: FilePickerAcceptType[] = [
  {
    accept: {
      'text/plain': ['.json'],
    },
  },
]

export function useSettingsTransfer() {
  const { toJson, fromJson } = useSettingsBackup()
  const { saveFile, openFile } = useFileSystem()

  async function importSettings() {
    const data = await openFile({
      types: SETTINGS_FILE_TYPES,
    })
    if (data) {
      fromJson(data)
    }
  }

  async function exportSettings() {
    await saveFile(toJson(), {
      suggestedName: 'new_tab_settings',
      types: SETTINGS_FILE_TYPES,
    })
  }

  return {
    importSettings,
    exportSettings,
  }
}
