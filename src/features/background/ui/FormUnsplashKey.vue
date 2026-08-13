<script lang="ts" setup>
import InputBase from '@/shared/ui/InputBase.vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function updateValue(value: string | undefined) {
  emit('update:modelValue', value ?? '')
}
</script>

<template>
  <InputBase
    :model-value="props.modelValue"
    type="password"
    placeholder="Unsplash Access Key"
    @update:model-value="updateValue"
  />
</template>
