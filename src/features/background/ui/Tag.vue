<script setup lang="ts">
import { X } from '@lucide/vue'

interface TagProps {
  label: string
}

const props = defineProps<TagProps>()

const emit = defineEmits<{
  remove: []
}>()
</script>

<template>
  <span
    class="
      inline-flex items-center gap-1 rounded-md bg-surface-muted px-2 py-1
      text-xs text-foreground
    "
  >
    <span class="[text-box:trim-both_ex_alphabetic]">{{ props.label }}</span>
    <button
      type="button"
      class="cursor-pointer rounded border border-transparent
      focus-visible:border-foreground-muted focus-visible:outline-none"
      :aria-label="`Удалить ${props.label}`"
      @click="emit('remove')"
    >
      <X :size="12" />
    </button>
  </span>
</template>
