import type { Ref } from 'vue'

import { getCurrentScope, onScopeDispose, ref, watch } from 'vue'

export default function useStorage<T>(key: string, defaultValue: T): Ref<T> {
  const reportError = (operation: 'read' | 'write', error: unknown) => {
    console.error(`Unable to ${operation} localStorage value for "${key}".`, error)
  }

  const read = (): T => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) as T : structuredClone(defaultValue)
    }
    catch (error) {
      reportError('read', error)
      return structuredClone(defaultValue)
    }
  }

  const value = ref(read()) as Ref<T>

  // flush: 'sync' — чтобы изменение было в localStorage сразу после мутации
  watch(value, (next) => {
    try {
      localStorage.setItem(key, JSON.stringify(next))
    }
    catch (error) {
      reportError('write', error)
    }
  }, { deep: true, flush: 'sync' })

  // Синхронизация с изменениями localStorage из других вкладок
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) {
      value.value = read()
    }
  }

  window.addEventListener('storage', onStorage)

  if (getCurrentScope()) {
    onScopeDispose(() => {
      window.removeEventListener('storage', onStorage)
    })
  }

  return value
}
