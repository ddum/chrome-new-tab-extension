<template>
  <div class="time">{{ timeString }}</div>
  <div class="date">{{ dateString }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const timeString = ref('')
const dateString = ref('')
function setTime() {
  let date = new Date()
  let hours = date.getHours()
  let minutes = date.getMinutes()

  timeString.value = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
  dateString.value = date.toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

setTime()
setInterval(() => {
  setTime()
}, 1000 * 30)
</script>

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
