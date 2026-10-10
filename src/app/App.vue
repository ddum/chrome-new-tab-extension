<script setup lang="ts">
import { SETTINGS_TABS } from '@/app/settings-tabs'
import { useBackgroundStore } from '@/features/background/model/store'
import { TimeString } from '@/features/clock/ui/time-string'
import { useLinksStore } from '@/features/links/model/store'
import { LinksList } from '@/features/links/ui/links-list'
import { provideSettingsTabs } from '@/features/settings/model/useSettingsTabs'
import { SettingsButton } from '@/features/settings/ui/settings-button'
import { Layout } from '@/shared/ui/layout'

const backgroundStore = useBackgroundStore()
const linksStore = useLinksStore()

provideSettingsTabs(SETTINGS_TABS)
</script>

<template>
  <Layout :image-url="backgroundStore.url">
    <template #center>
      <TimeString />
    </template>
    <template #header-left>
      <LinksList :links="linksStore.items" />
    </template>
    <template #footer-left>
      <SettingsButton />
    </template>
  </Layout>
</template>
