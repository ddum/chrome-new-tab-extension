<script lang="ts" setup>
import { useLinksStore } from '@/features/links/model/store'
import FormAddLink from '@/features/links/ui/FormAddLink.vue'
import { Button } from '@/shared/ui/button'
import LinkFavicon from '@/shared/ui/LinkFavicon.vue'
import Table from '@/shared/ui/table/TableBase.vue'
import TableCell from '@/shared/ui/table/TableCellBase.vue'
import TableRow from '@/shared/ui/table/TableRowBase.vue'

const linksStore = useLinksStore()
</script>

<template>
  <FormAddLink @submit="linksStore.addLink" />
  <div class="links">
    <Table>
      <TableRow v-for="link in linksStore.items" :key="link.url">
        <TableCell>
          <div class="links__favicon">
            <LinkFavicon :domain="link.url" />
          </div>
        </TableCell>
        <TableCell>{{ link.title }}</TableCell>
        <TableCell align="right">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            @click="linksStore.deleteLink(link.url)"
          >
            Удалить
          </Button>
        </TableCell>
      </TableRow>
    </Table>
  </div>
</template>

<style scoped>
.links {
  margin-top: 15px;
}

.links__favicon {
  height: 20px;
  width: 20px;
}
</style>
