<script lang="ts" setup>
import { useBackgroundStore } from '@/features/background/model/store'
import FormAddTag from '@/features/background/ui/FormAddTag.vue'
import FormUnsplashKey from '@/features/background/ui/FormUnsplashKey.vue'
import TagBase from '@/shared/ui/TagBase.vue'

const backgroundStore = useBackgroundStore()
</script>

<template>
  <div class="background-settings">
    <FormUnsplashKey
      :model-value="backgroundStore.accessKey"
      @update:model-value="backgroundStore.setAccessKey"
    />
    <FormAddTag @submit="backgroundStore.addTag" />
    <div class="tags">
      <TagBase
        v-for="tag in backgroundStore.tags"
        :key="tag"
        @delete="backgroundStore.deleteTag(tag)"
      >
        {{ tag }}
      </TagBase>
    </div>
  </div>
</template>

<style scoped>
.background-settings {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
