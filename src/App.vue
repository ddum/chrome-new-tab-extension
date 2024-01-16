<template>
  <div class="wrapper" :style="{ backgroundImage: `url(${backgroundStore.backgroundUrl})` }">
    <div class="header"></div>
    <div class="content">
      <TimeString />
    </div>
    <div class="footer">
      <div class="layout">
        <div class="layout__left"></div>
        <div class="layout__right">
          <BackgroundRefresh />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TimeString from '@/components/TimeString.vue'
import BackgroundRefresh from '@/components/BackgroundRefresh.vue'

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
}

.wrapper::before {
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
.layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.layout__left,
.layout__right {
  flex: 1;
  display: flex;
  align-items: center;
}
.layout__left {
  justify-content: flex-start;
}
.layout__right {
  justify-content: flex-end;
}
</style>
