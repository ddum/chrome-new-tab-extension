<template>
  <span class="icon" :class="`icon_${props.size}`">
    <slot />
  </span>
</template>

<script lang="ts" setup>
interface Props {
  size?: 's1' | 's2' | 's3' | 's4'
}

const props = withDefaults(defineProps<Props>(), {
  size: 's1'
})
</script>

<style scoped>
.icon {
  display: inline-block;
}
.icon_s1 {
  width: var(--size-icon-s1);
  height: var(--size-icon-s1);
}
.icon_s2 {
  width: var(--size-icon-s2);
  height: var(--size-icon-s2);
}
.icon_s3 {
  width: var(--size-icon-s3);
  height: var(--size-icon-s3);
}
.icon_s4 {
  width: var(--size-icon-s4);
  height: var(--size-icon-s4);
}

.icon ::v-deep(svg) {
  fill: var(--color-icon);
  height: 100%;
  width: 100%;
}
</style>
