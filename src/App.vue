<template>
  <div class="wrapper">
    <div class="header"></div>
    <div class="content">
      <TimeString />
    </div>
    <div class="footer"></div>
  </div>
</template>

<script lang="ts" setup>
  import TimeString from "@/components/TimeString.vue";
</script>

<style>
  .wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>