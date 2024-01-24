<template>
  <div class="links">
    <div class="links__item" v-for="link in appStore.links" :key="link.url">
      <a :href="link.url" class="links__link" target="_blank">
        <div class="links__favicon"><LinkFavicon :domain="link.url" /></div>
        <div class="links__title">
          {{ link.title }}
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LinkFavicon from '@/components/element/LinkFavicon.vue'

import { useAppStore } from '@/stores'
const appStore = useAppStore()
</script>

<style scoped>
.links {
  display: flex;
  flex-direction: column;
}
.links__item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 3px 0;
}

.links__link {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--c-white);
  text-decoration: none;
}

.links__favicon {
  height: 20px;
  width: 20px;
  margin-right: 10px;
}

.links__title {
  text-shadow: 0px 0px 17px var(--c-black);
}
</style>
