<script lang="ts" setup>
import useDateTime from '@/composables/useDateTime'

const { timeString, dateString } = useDateTime()
</script>

<template>
  <div class="time">
    {{ timeString }}
  </div>
  <div class="date">
    {{ dateString }}
  </div>
</template>

<style scoped>
.time {
  text-align: center;
  line-height: 1;
  font-size: 180px;
  font-weight: bold;
  color: var(--color-text);
}
.date {
  text-align: center;
  font-size: 23px;
  font-weight: bold;
}
</style>
