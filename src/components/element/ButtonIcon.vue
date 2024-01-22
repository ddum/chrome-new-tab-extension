<template>
  <button class="button" :class="{ button_refresh: props.rotate }">
    <slot />
  </button>
</template>

<script lang="ts" setup>
interface Props {
  rotate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  rotate: false
})
</script>

<style scoped>
.button {
  display: flex;
  background-color: transparent;
  cursor: pointer;
  border: 0;
  border-radius: 50%;
  padding: 5px;
  transition: transform 0.3s ease;
}

.button:hover {
  background-color: rgb(35 34 34 / 61%);
}

.button_refresh:hover {
  transform: rotate(90deg);
}
</style>
