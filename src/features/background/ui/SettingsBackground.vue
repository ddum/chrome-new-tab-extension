<script lang="ts" setup>
import { useBackgroundStore } from '@/features/background/model/store'
import FormAddTag from '@/features/background/ui/FormAddTag.vue'
import FormUnsplashKey from '@/features/background/ui/FormUnsplashKey.vue'

const backgroundStore = useBackgroundStore()
</script>

<template>
  <div class="background-settings">
    <FormUnsplashKey
      :model-value="backgroundStore.accessKey"
      @update:model-value="backgroundStore.setAccessKey"
    />
    <FormAddTag
      :model-value="backgroundStore.tags"
      @update:model-value="backgroundStore.setTags"
    />
  </div>
</template>

<style scoped>
.background-settings {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
