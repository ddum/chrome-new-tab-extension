<script setup lang="ts">
import { Label } from '@/shared/ui/label'

interface FieldProps {
  label: string
  for: string
}

const props = defineProps<FieldProps>()

defineSlots<{
  default: () => unknown
}>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <Label :for="props.for">{{ props.label }}</Label>
    <slot />
  </div>
</template>
