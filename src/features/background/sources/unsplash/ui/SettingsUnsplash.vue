<script lang="ts" setup>
import type { UnsplashSettings } from '../settings'

import RefreshUnsplashButton from './RefreshUnsplashButton.vue'
import UnsplashAccessKeyField from './UnsplashAccessKeyField.vue'
import UnsplashTagsField from './UnsplashTagsField.vue'

const emit = defineEmits<{
  apply: [url: string]
}>()

const settings = defineModel<UnsplashSettings>({ required: true })

function setAccessKey(accessKey: string) {
  settings.value = { ...settings.value, accessKey }
}

function setTags(tags: string[]) {
  settings.value = { ...settings.value, tags }
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <UnsplashAccessKeyField :model-value="settings.accessKey" @update:model-value="setAccessKey" />
    <UnsplashTagsField :model-value="settings.tags" @update:model-value="setTags" />
    <RefreshUnsplashButton
      :access-key="settings.accessKey"
      :tags="settings.tags"
      @apply="(url) => emit('apply', url)"
    />
  </div>
</template>
