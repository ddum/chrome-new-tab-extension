<script setup lang="ts">
import { computed } from 'vue'

interface LayoutProps {
  imageUrl?: string
}

const props = defineProps<LayoutProps>()

const layoutStyle = computed(() => ({
  '--layout-image': props.imageUrl ? `url(${props.imageUrl})` : 'none',
}))
</script>

<template>
  <div
    data-slot="layout"
    class="relative isolate size-full overflow-hidden bg-cover bg-center bg-no-repeat"
    :style="layoutStyle"
  >
    <slot />
  </div>
</template>

<style scoped>
[data-slot='layout'] {
  --vignette-26: rgb(0 0 0 / 26%);
  --vignette-24: rgb(0 0 0 / 24%);
  --vignette-19: rgb(0 0 0 / 19%);
  --vignette-10: rgb(0 0 0 / 10%);
  --vignette-0: rgb(0 0 0 / 0%);
  --vignette-center-size: 420px 200px;
  --vignette-side-width: 300px;

  background-image: var(--layout-image, none);
}

[data-slot='layout']::after {
  content: '';
  pointer-events: none;
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(
      var(--vignette-center-size) at 50% 50%,
      var(--vignette-26) 0%,
      var(--vignette-24) 30%,
      var(--vignette-19) 50%,
      var(--vignette-10) 72%,
      transparent 100%
    ),
    linear-gradient(
      to right in srgb,
      var(--vignette-24) 0,
      var(--vignette-0) var(--vignette-side-width)
    ),
    linear-gradient(
      to left in srgb,
      var(--vignette-24) 0,
      var(--vignette-0) var(--vignette-side-width)
    );
}
</style>
