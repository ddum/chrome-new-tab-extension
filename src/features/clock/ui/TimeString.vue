<script lang="ts" setup>
import useDateTime from '@/features/clock/model/useDateTime'

const { timeString, dateString } = useDateTime()
</script>

<template>
  <div class="text-center">
    <div class="text-[148px] leading-none font-bold text-on-image drop-shadow-lg">
      {{ timeString }}
    </div>
    <div class="mt-3 text-lg font-medium text-on-image drop-shadow">
      {{ dateString }}
    </div>
  </div>
</template>
