<script lang="ts" setup>
interface Props {
  rotateHover?: boolean
  rotate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  rotate: false,
  rotateHover: true,
})
</script>

<template>
  <button
    class="button"
    :class="{ button_rotate: props.rotate, button_rotate_hover: props.rotateHover }"
  >
    <slot />
  </button>
</template>

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

.button_rotate {
  animation: rotation 1s infinite linear;
}

.button_rotate_hover:hover {
  transform: rotate(90deg);
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
