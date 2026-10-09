<script lang="ts" setup>
import { shallowRef } from 'vue'

import { Field } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { Tag } from '@/shared/ui/tag'

const tags = defineModel<string[]>({ default: () => [] })
const draft = shallowRef('')

function addTag() {
  const value = draft.value.trim()
  if (value === '' || tags.value.includes(value)) {
    return
  }

  tags.value = [...tags.value, value]
  draft.value = ''
}

function removeTag(tag: string) {
  tags.value = tags.value.filter(item => item !== tag)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <Field
      label="Теги"
      for="add-tag"
    >
      <Input
        id="add-tag"
        v-model="draft"
        placeholder="Тег изображения"
        @keydown.enter.prevent="addTag"
      />
    </Field>
    <div class="flex flex-wrap gap-1.5">
      <Tag
        v-for="tag in tags"
        :key="tag"
        :label="tag"
        @remove="removeTag(tag)"
      />
    </div>
  </div>
</template>
