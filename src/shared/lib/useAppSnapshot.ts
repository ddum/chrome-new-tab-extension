import type { Ref } from 'vue'

import { defineStore, storeToRefs } from 'pinia'

import type { AppValue } from '@/shared/lib/types'

import { STORAGE_KEY } from '@/shared/config/app'
import { STORAGE_DEFAULT_VALUE } from '@/shared/lib/types'
import useStorage from '@/shared/lib/useStorage'

const useAppSnapshotStore = defineStore('app-snapshot', () => {
  const appValue = useStorage<AppValue>(STORAGE_KEY, STORAGE_DEFAULT_VALUE)

  return { appValue }
})

export function useAppSnapshot(): Ref<AppValue> {
  const store = useAppSnapshotStore()
  return storeToRefs(store).appValue
}
