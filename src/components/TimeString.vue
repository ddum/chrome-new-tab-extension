<template>
  <div class="time">{{ time }}</div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  
  const time = ref('');
  function setTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    time.value = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }
  
  setTime();
  setInterval(() => {
    setTime();
  }, 1000 * 30);

</script>

<style>
  .time {
    font-size: 180px;
    font-weight: bold;
    color: var(--color-text);
  }
</style>