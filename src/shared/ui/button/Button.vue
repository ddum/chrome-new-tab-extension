<script setup lang="ts">
import type { ButtonVariantProps } from './Button.style'

import { buttonVariants } from './Button.style'

interface ButtonProps {
  variant?: ButtonVariantProps['variant']
  size?: ButtonVariantProps['size']
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
})
</script>

<template>
  <button
    :type="props.type"
    :class="buttonVariants({ variant: props.variant, size: props.size })"
  >
    <slot />
  </button>
</template>
