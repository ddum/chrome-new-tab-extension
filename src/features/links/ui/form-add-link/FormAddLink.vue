<script lang="ts" setup>
import { Plus } from '@lucide/vue'
import { ref } from 'vue'

import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

const emit = defineEmits<{
  submit: [url: string, title: string]
}>()

const link = ref('')
const title = ref('')

function submitHandler() {
  if (link.value !== '' && title.value !== '') {
    emit('submit', link.value, title.value)
    link.value = ''
    title.value = ''
  }
}
</script>

<template>
  <form class="flex flex-col gap-3" @submit.prevent="submitHandler">
    <div class="flex gap-2">
      <Field class="flex-1" label="Ссылка" for="add-link-url">
        <Input id="add-link-url" v-model="link" placeholder="https://" />
      </Field>
      <Field class="flex-1" label="Заголовок" for="add-link-title">
        <Input id="add-link-title" v-model="title" placeholder="Название" />
      </Field>
    </div>
    <Button type="submit" class="self-start">
      <Plus :size="14" />
      Добавить
    </Button>
  </form>
</template>
