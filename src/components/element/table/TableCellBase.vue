<template>
  <td class="table__cell" :class="`table__cell_${props.align}`">
    <slot />
  </td>
</template>

<script lang="ts" setup>
interface Props {
  align?: 'left' | 'right' | 'center'
}

const props = withDefaults(defineProps<Props>(), {
  align: 'left'
})
</script>

<style scoped>
.table__cell {
  padding: 5px 10px;
}
.table__cell_left {
  text-align: left;
}
.table__cell_right {
  text-align: right;
}
.table__cell_center {
  text-align: center;
}
</style>
