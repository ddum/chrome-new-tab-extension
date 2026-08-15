<script lang="ts" setup>
import { Input } from '@/shared/ui/input'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function updateValue(value: string | number) {
  emit('update:modelValue', String(value))
}
</script>

<template>
  <Input
    :model-value="props.modelValue"
    type="password"
    placeholder="Unsplash Access Key"
    @update:model-value="updateValue"
  />
</template>
