<template>
  <div class="wrapper" :style="{ backgroundImage: `url(${backgroundStore.backgroundUrl})` }">
    <div class="header"></div>
    <div class="content">
      <TimeString />
    </div>
    <div class="footer">
      <BackgroundSettings />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TimeString from '@/components/TimeString.vue'
import BackgroundSettings from '@/components/BackgroundSettings.vue'

import { useBackgroundStore } from '@/stores/background'

const backgroundStore = useBackgroundStore()
</script>

<style>
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: transparent;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: 0.3s ease-out;
  transform: scale(1);
  transform-origin: center center;
  position: relative;

  &::before {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    opacity: 1;
    background-image: url('./assets/img/overlay.png');
    background-size: 100% 100%;
    transition: opacity 0.3s ease-out;
  }
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.header {
  z-index: 1;
}
.footer {
  z-index: 1;
}
</style>
