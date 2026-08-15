<script lang="ts" setup>
import useDateTime from '@/features/clock/model/useDateTime'

const { timeString, dateString } = useDateTime()
</script>

<template>
  <div class="text-center font-bold text-white">
    <div class="text-[180px] leading-none">
      {{ timeString }}
    </div>
    <div class="text-[23px]">
      {{ dateString }}
    </div>
  </div>
</template>
