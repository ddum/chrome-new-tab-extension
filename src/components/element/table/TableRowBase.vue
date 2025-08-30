<script lang="ts" setup></script>

<template>
  <tr class="table__row">
    <slot />
  </tr>
</template>

<style scoped>
.table__row {
  border-bottom: 1px solid var(--element-table-border-color);
}
</style>
