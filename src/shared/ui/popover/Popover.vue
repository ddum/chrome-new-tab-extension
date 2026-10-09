<script setup lang="ts">
import type { Placement } from '@floating-ui/vue'

import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import { onMounted, onUnmounted, toRef, useTemplateRef } from 'vue'

interface PopoverProps {
  placement?: Placement
}

const props = withDefaults(defineProps<PopoverProps>(), {
  placement: 'top-start',
})

const open = defineModel<boolean>('open', { default: false })

const reference = useTemplateRef<HTMLElement>('reference')
const floating = useTemplateRef<HTMLElement>('floating')

const { floatingStyles } = useFloating(reference, floating, {
  placement: toRef(props, 'placement'),
  middleware: [offset(8), flip(), shift({ padding: 8 })],
  whileElementsMounted: autoUpdate,
  open,
})

function toggle() {
  open.value = !open.value
}

function onPointerDown(event: PointerEvent) {
  if (!open.value) {
    return
  }

  const target = event.target
  if (!(target instanceof Node)) {
    return
  }

  if (reference.value?.contains(target) || floating.value?.contains(target)) {
    return
  }

  open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div>
    <div ref="reference" @click="toggle">
      <slot name="trigger" />
    </div>
    <Teleport to="body">
      <div
        v-if="open"
        ref="floating"
        class="z-20"
        :style="floatingStyles"
      >
        <slot />
      </div>
    </Teleport>
  </div>
</template>
