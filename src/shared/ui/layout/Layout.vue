<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  imageUrl?: string
}>()

const layoutStyle = computed(() => ({
  '--layout-image': props.imageUrl ? `url(${props.imageUrl})` : 'none',
}))
</script>

<template>
  <div
    data-slot="layout"
    class="
      relative flex min-h-screen origin-center flex-col justify-between
      bg-transparent bg-center bg-no-repeat p-5
      transition duration-300 ease-out
    "
    :style="layoutStyle"
  >
    <slot />
  </div>
</template>

<style scoped>
[data-slot='layout'] {
  background-image:
    radial-gradient(
      22% 18% at 50% 50%,
      rgb(0 0 0 / 26%) 0%,
      rgb(0 0 0 / 24%) 30%,
      rgb(0 0 0 / 19%) 50%,
      rgb(0 0 0 / 10%) 72%,
      transparent 100%
    ),
    radial-gradient(
      30% 30% at 0% 0%,
      rgb(0 0 0 / 35%) 0%,
      rgb(0 0 0 / 20%) 33%,
      rgb(0 0 0 / 8%) 60%,
      transparent 100%
    ),
    radial-gradient(
      30% 30% at 100% 0%,
      rgb(0 0 0 / 35%) 0%,
      rgb(0 0 0 / 20%) 33%,
      rgb(0 0 0 / 8%) 60%,
      transparent 100%
    ),
    radial-gradient(
      30% 30% at 0% 100%,
      rgb(0 0 0 / 35%) 0%,
      rgb(0 0 0 / 20%) 33%,
      rgb(0 0 0 / 8%) 60%,
      transparent 100%
    ),
    radial-gradient(
      30% 30% at 100% 100%,
      rgb(0 0 0 / 35%) 0%,
      rgb(0 0 0 / 20%) 33%,
      rgb(0 0 0 / 8%) 60%,
      transparent 100%
    ),
    var(--layout-image, none);
  background-size: auto, auto, auto, auto, auto, cover;
}
</style>
