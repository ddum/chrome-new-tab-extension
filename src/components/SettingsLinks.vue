<template>
  <div class="form">
    <div class="form__row">
      <div class="form__row-title">Ссылка</div>
      <InputBase v-model="link" />
    </div>
    <div class="form__row">
      <div class="form__row-title">Заголовок</div>
      <InputBase v-model="title" />
    </div>
    <div class="form__row">
      <ButtonBase @click="addLink">Добавить</ButtonBase>
    </div>
  </div>
  <div class="links">
    <Table>
      <TableRow v-for="(link, index) in appStore.links" :key="link.url">
        <TableCell>
          <div class="links__favicon"><LinkFavicon :domain="link.url" /></div>
        </TableCell>
        <TableCell>{{ link.title }}</TableCell>
        <TableCell align="right">
          <ButtonBase @click="deleteLink(index)">Удалить</ButtonBase>
        </TableCell>
      </TableRow>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores'

import InputBase from '@/components/element/InputBase.vue'
import ButtonBase from '@/components/element/ButtonBase.vue'
import LinkFavicon from '@/components/element/LinkFavicon.vue'
import Table from '@/components/element/table/TableBase.vue'
import TableRow from '@/components/element/table/TableRowBase.vue'
import TableCell from '@/components/element/table/TableCellBase.vue'

const link = ref('')
const title = ref('')

const appStore = useAppStore()
function addLink() {
  if (link.value !== '' && title.value !== '') {
    appStore.setLinks([...appStore.links, { url: link.value, title: title.value }])
    link.value = ''
    title.value = ''
  }
}
function deleteLink(index: number) {
  appStore.setLinks(appStore.links.filter((_, i) => i !== index))
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form__row {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.form__row-title {
  width: 30%;
  margin-right: 15px;
  font-size: var(--font-size-base);
  color: var(--c-black);
}

.links {
  margin-top: 15px;
}

.links__favicon {
  height: 20px;
  width: 20px;
}
</style>
