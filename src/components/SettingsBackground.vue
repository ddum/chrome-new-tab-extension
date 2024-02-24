<template>
  <FormAddTag @submit="appStore.addTag" />
  <div class="tags">
    <TagBase v-for="tag in appStore.backgroundTags" :key="tag" @delete="appStore.deleteTag(tag)">{{
      tag
    }}</TagBase>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores'

import FormAddTag from '@/components/FormAddTag.vue'
import TagBase from '@/components/element/TagBase.vue'

const appStore = useAppStore()
</script>

<style scoped>
.tags {
  margin-top: 15px;
}
</style>
