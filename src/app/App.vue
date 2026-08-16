<script setup lang="ts">
import { useBackgroundStore } from '@/features/background/model/store'
import BackgroundRefresh from '@/features/background/ui/BackgroundRefresh.vue'
import TimeString from '@/features/clock/ui/TimeString.vue'
import { useLinksStore } from '@/features/links/model/store'
import LinksList from '@/features/links/ui/LinksList.vue'
import SettingsButton from '@/features/settings/ui/SettingsButton.vue'
import {
  Layout,
  LayoutBar,
  LayoutCenter,
  LayoutFooter,
  LayoutHeader,
  LayoutLeft,
  LayoutRight,
} from '@/shared/ui/layout'

const backgroundStore = useBackgroundStore()
const linksStore = useLinksStore()
</script>

<template>
  <Layout :image-url="backgroundStore.url">
    <LayoutCenter>
      <TimeString />
    </LayoutCenter>
    <LayoutHeader>
      <LayoutBar>
        <LayoutLeft>
          <LinksList :links="linksStore.items" />
        </LayoutLeft>
        <LayoutRight />
      </LayoutBar>
    </LayoutHeader>
    <LayoutFooter>
      <LayoutBar>
        <LayoutLeft>
          <SettingsButton />
        </LayoutLeft>
        <LayoutRight>
          <BackgroundRefresh />
        </LayoutRight>
      </LayoutBar>
    </LayoutFooter>
  </Layout>
</template>
