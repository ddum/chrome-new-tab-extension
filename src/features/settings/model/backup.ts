import type { AppValue } from '@/shared/model/app-snapshot/types'

import { useAppSnapshot } from '@/shared/model/app-snapshot/useAppSnapshot'

export function useSettingsBackup() {
  const appValue = useAppSnapshot()

  function toJson() {
    return JSON.stringify(appValue.value)
  }

  function fromJson(contents: string) {
    const parsed = JSON.parse(contents) as Partial<AppValue>
    appValue.value = {
      background: parsed.background ?? appValue.value.background,
      links: parsed.links ?? appValue.value.links,
    }
  }

  return {
    toJson,
    fromJson,
  }
}
