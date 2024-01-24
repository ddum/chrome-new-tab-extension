<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang="ts" setup></script>

<style scoped>
.button {
  display: inline-flex;
  background-color: var(--element-button-background);
  color: var(--element-button-color);
  border: 1px solid var(--element-button-border-color);
  border-radius: var(--element-border-radius);
  cursor: pointer;
  padding: var(--element-padding);
  font-size: var(--element-font-size);
  line-height: 1;
  height: 32px;
}

.button:hover {
  background-color: var(--element-button-background-hover);
}
</style>
