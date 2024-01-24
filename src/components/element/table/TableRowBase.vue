<template>
  <tr class="table__row">
    <slot />
  </tr>
</template>

<script lang="ts" setup></script>

<style scoped>
.table__row {
  border-bottom: 1px solid var(--element-table-border-color);
}
</style>
