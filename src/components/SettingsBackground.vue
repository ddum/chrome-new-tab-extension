<script lang="ts" setup>
import TagBase from '@/components/element/TagBase.vue'
import FormAddTag from '@/components/FormAddTag.vue'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
</script>

<template>
  <FormAddTag @submit="appStore.addTag" />
  <div class="tags">
    <TagBase v-for="tag in appStore.backgroundTags" :key="tag" @delete="appStore.deleteTag(tag)">
      {{
        tag
      }}
    </TagBase>
  </div>
</template>

<style scoped>
.tags {
  margin-top: 15px;
}
</style>
