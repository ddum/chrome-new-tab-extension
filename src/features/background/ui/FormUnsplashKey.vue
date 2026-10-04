<script lang="ts" setup>
import { Field } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

const model = defineModel<string>({ default: '' })
</script>

<template>
  <Field
    label="API-ключ Unsplash"
    for="unsplash-key"
  >
    <Input
      id="unsplash-key"
      v-model="model"
      type="password"
      placeholder="Unsplash Access Key"
    />
  </Field>
</template>
