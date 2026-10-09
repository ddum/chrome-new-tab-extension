<script lang="ts" setup>
import { shallowRef, watch } from 'vue'

import { Field } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

const model = defineModel<string>({ default: '' })
const draft = shallowRef(model.value)

watch(model, (value) => {
  draft.value = value
})

function commit() {
  model.value = draft.value
}
</script>

<template>
  <Field
    label="API-ключ Unsplash"
    for="unsplash-key"
  >
    <Input
      id="unsplash-key"
      v-model="draft"
      type="password"
      placeholder="Unsplash Access Key"
      @blur="commit"
    />
  </Field>
</template>
