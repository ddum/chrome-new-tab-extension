<template>
  <ul class="menu">
    <li v-for="item in appStore.categoryItems" :key="item.code">
      <button
        class="menu__button"
        :class="{ menu__button_active: item.code === props.activeMenuItem }"
        @click="emit('set-menu-item', item.code)"
      >
        {{ item.title }}
      </button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores'

const emit = defineEmits<{
  (e: 'set-menu-item', code: string): void
}>()

const props = defineProps<{
  activeMenuItem: string
}>()

const appStore = useAppStore()
</script>

<style scoped>
.menu {
  padding: 0;
  list-style: none;
}
.menu__button {
  border: 0;
  background-color: transparent;
  display: flex;
  padding: 10px;
  color: var(--settings-text-color);
  cursor: pointer;
  font-size: var(--font-size-base);
}
.menu__button:hover,
.menu__button_active {
  color: var(--settings-text-color-hover);
}
</style>
