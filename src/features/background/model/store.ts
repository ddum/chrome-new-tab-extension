import { defineStore } from 'pinia'
import { computed } from 'vue'

import { useSnapshotSection } from '@/shared/model/app-snapshot/useAppSnapshot'

import type { BackgroundSourceId, BackgroundSourceSettings, BackgroundValue } from './types'

import { UNSPLASH_DEFAULT_SETTINGS } from '../sources/unsplash'

const DEFAULT_VALUE: BackgroundValue = {
  url: '',
  source: 'unsplash',
  sources: {
    unsplash: UNSPLASH_DEFAULT_SETTINGS,
  },
}

export const useBackgroundStore = defineStore('background', () => {
  const background = useSnapshotSection('background', DEFAULT_VALUE)

  const url = computed(() => background.value.url)
  const source = computed(() => background.value.source)
  const sources = computed(() => background.value.sources)

  function setUrl(value: string) {
    background.value.url = value
  }

  function setSourceSettings<Id extends BackgroundSourceId>(
    id: Id,
    value: BackgroundSourceSettings[Id],
  ) {
    background.value.sources[id] = value
  }

  return {
    url,
    source,
    sources,
    setUrl,
    setSourceSettings,
  }
})
