<script setup lang="ts">
const model = defineModel<string>({ default: '' })
</script>

<template>
  <input
    v-model.trim="model"
    class="
      w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground
      transition placeholder:text-foreground-muted
      focus-visible:border-foreground-muted focus-visible:outline-none
    "
  >
</template>
