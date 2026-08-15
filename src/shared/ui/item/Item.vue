<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

import { Primitive } from 'reka-ui'

import { cn } from '@/shared/lib/utils'

import type { ItemVariants } from '.'

import { itemVariants } from '.'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
  variant?: ItemVariants['variant']
  size?: ItemVariants['size']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
})
</script>

<template>
  <Primitive
    data-slot="item"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="cn(itemVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
