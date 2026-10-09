import type { Ref, WritableComputedRef } from 'vue'

import { defineStore, storeToRefs } from 'pinia'
import { computed, watch } from 'vue'

import { STORAGE_KEY } from '@/shared/config/app'
import { useStorage } from '@/shared/lib/useStorage'

import type { AppValue } from './types'

const useAppSnapshotStore = defineStore('app-snapshot', () => {
  const appValue = useStorage<Partial<AppValue>>(STORAGE_KEY, {})

  return { appValue }
})

export function useAppSnapshot(): Ref<Partial<AppValue>> {
  const store = useAppSnapshotStore()
  return storeToRefs(store).appValue
}

export function useSnapshotSection<Key extends keyof AppValue>(
  key: Key,
  defaultValue: AppValue[Key],
): WritableComputedRef<AppValue[Key]> {
  const appValue = useAppSnapshot()

  // Раздел может пропасть после импорта или записи из другой вкладки
  watch(() => appValue.value[key], (section) => {
    if (section === undefined) {
      appValue.value[key] = structuredClone(defaultValue)
    }
  }, { immediate: true, flush: 'sync' })

  return computed({
    get: () => appValue.value[key] as AppValue[Key],
    set: (value) => {
      appValue.value[key] = value
    },
  })
}
