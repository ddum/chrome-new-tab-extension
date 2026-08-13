<script lang="ts" setup>
import FloatingVue from 'floating-vue'

import { useBackgroundStore } from '@/features/background/model/store'
import BackgroundRefresh from '@/features/background/ui/BackgroundRefresh.vue'
import TimeString from '@/features/clock/ui/TimeString.vue'
import { useLinksStore } from '@/features/links/model/store'
import LinksList from '@/features/links/ui/LinksList.vue'
import SettingsButton from '@/features/settings/ui/SettingsButton.vue'

FloatingVue.options.overflowPadding = 12

const backgroundStore = useBackgroundStore()
const linksStore = useLinksStore()
</script>

<template>
  <div class="wrapper" :style="{ backgroundImage: `url(${backgroundStore.url})` }">
    <div class="center">
      <TimeString />
    </div>
    <div class="header">
      <div class="layout">
        <div class="layout__left">
          <LinksList :links="linksStore.items" />
        </div>
        <div class="layout__right" />
      </div>
    </div>
    <div class="footer">
      <div class="layout">
        <div class="layout__left">
          <SettingsButton />
        </div>
        <div class="layout__right">
          <BackgroundRefresh />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  background-image:
    radial-gradient(
      22% 18% at 50% 50%,
      rgb(0 0 0 / 26%) 0%,
      rgb(0 0 0 / 24%) 30%,
      rgb(0 0 0 / 19%) 50%,
      rgb(0 0 0 / 10%) 72%,
      transparent 100%
    ),
    radial-gradient(
      30% 30% at 0% 0%,
      rgb(0 0 0 / 35%) 0%,
      rgb(0 0 0 / 20%) 33%,
      rgb(0 0 0 / 8%) 60%,
      transparent 100%
    ),
    radial-gradient(
      30% 30% at 100% 0%,
      rgb(0 0 0 / 35%) 0%,
      rgb(0 0 0 / 20%) 33%,
      rgb(0 0 0 / 8%) 60%,
      transparent 100%
    ),
    radial-gradient(
      30% 30% at 0% 100%,
      rgb(0 0 0 / 35%) 0%,
      rgb(0 0 0 / 20%) 33%,
      rgb(0 0 0 / 8%) 60%,
      transparent 100%
    ),
    radial-gradient(
      30% 30% at 100% 100%,
      rgb(0 0 0 / 35%) 0%,
      rgb(0 0 0 / 20%) 33%,
      rgb(0 0 0 / 8%) 60%,
      transparent 100%
    );
  transition: opacity 0.3s ease-out;
}

.center {
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
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
