<template>
  <span class="icon" :class="`icon_${props.size}`">
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'small',
    validator: (value: string) => {
      return ['small', 'big'].includes(value)
    }
  }
})
</script>

<style>
.icon {
  display: inline-block;
}
.icon_small {
  width: var(--size-icon-small);
  height: var(--size-icon-small);
}
.icon_big {
  width: var(--size-icon-big);
  height: var(--size-icon-big);
}

.icon svg {
  fill: var(--color-icon);
  height: 100%;
  width: 100%;
}
</style>
