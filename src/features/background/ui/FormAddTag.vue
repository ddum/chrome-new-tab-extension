<script lang="ts" setup>
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/shared/ui/tags-input'

const tags = defineModel<string[]>({ default: () => [] })
</script>

<template>
  <TagsInput v-model="tags">
    <TagsInputItem
      v-for="item in tags"
      :key="item"
      :value="item"
    >
      <TagsInputItemText />
      <TagsInputItemDelete />
    </TagsInputItem>

    <TagsInputInput placeholder="Тег изображения" />
  </TagsInput>
</template>
