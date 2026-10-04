<script lang="ts" setup>
import { useBackgroundStore } from '@/features/background/model/store'
import BackgroundRefresh from '@/features/background/ui/BackgroundRefresh.vue'
import FormAddTag from '@/features/background/ui/FormAddTag.vue'
import FormUnsplashKey from '@/features/background/ui/FormUnsplashKey.vue'

const backgroundStore = useBackgroundStore()
</script>

<template>
  <div class="flex flex-col gap-3">
    <FormUnsplashKey
      :model-value="backgroundStore.accessKey"
      @update:model-value="backgroundStore.setAccessKey"
    />
    <FormAddTag
      :model-value="backgroundStore.tags"
      @update:model-value="backgroundStore.setTags"
    />
    <BackgroundRefresh />
  </div>
</template>
