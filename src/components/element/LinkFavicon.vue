<template>
  <img
    :src="`https://www.google.com/s2/favicons?sz=32&amp;domain=${props.domain}`"
    class="icon-favicon"
  />
</template>

<script lang="ts" setup>
interface Props {
  domain: string
}

const props = defineProps<Props>()
</script>

<style scoped>
.icon-favicon {
  width: 100%;
  height: 100%;
  max-width: 32px;
  max-height: 32px;
}
</style>
