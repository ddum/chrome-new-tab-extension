<template>
  <FormAddLink @submit="appStore.addLink" />
  <div class="links">
    <Table>
      <TableRow v-for="link in appStore.links" :key="link.url">
        <TableCell>
          <div class="links__favicon"><LinkFavicon :domain="link.url" /></div>
        </TableCell>
        <TableCell>{{ link.title }}</TableCell>
        <TableCell align="right">
          <ButtonBase @click="appStore.deleteLink(link.url)">Удалить</ButtonBase>
        </TableCell>
      </TableRow>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores'

import FormAddLink from '@/components/FormAddLink.vue'
import ButtonBase from '@/components/element/ButtonBase.vue'
import LinkFavicon from '@/components/element/LinkFavicon.vue'
import Table from '@/components/element/table/TableBase.vue'
import TableRow from '@/components/element/table/TableRowBase.vue'
import TableCell from '@/components/element/table/TableCellBase.vue'

const appStore = useAppStore()
</script>

<style scoped>
.links {
  margin-top: 15px;
}

.links__favicon {
  height: 20px;
  width: 20px;
}
</style>
