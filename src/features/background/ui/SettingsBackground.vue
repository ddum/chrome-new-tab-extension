<script lang="ts" setup>
import { useBackgroundStore } from '@/features/background/model/store'
import FormAddTag from '@/features/background/ui/FormAddTag.vue'
import TagBase from '@/shared/ui/TagBase.vue'

const backgroundStore = useBackgroundStore()
</script>

<template>
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
</template>

<style scoped>
.tags {
  margin-top: 15px;
}
</style>
