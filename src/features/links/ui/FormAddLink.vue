<script lang="ts" setup>
import { ref } from 'vue'

import { Button } from '@/shared/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/field'
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
  <form @submit.prevent="submitHandler">
    <FieldGroup>
      <FieldGroup class="flex-row gap-2">
        <Field class="min-w-0">
          <FieldLabel for="add-link-url">
            Ссылка
          </FieldLabel>
          <Input
            id="add-link-url"
            v-model.trim="link"
            placeholder="https://"
          />
        </Field>
        <Field class="min-w-0">
          <FieldLabel for="add-link-title">
            Заголовок
          </FieldLabel>
          <Input
            id="add-link-title"
            v-model.trim="title"
            placeholder="Название"
          />
        </Field>
      </FieldGroup>
      <Field orientation="horizontal">
        <Button type="submit">
          Добавить
        </Button>
      </Field>
    </FieldGroup>
  </form>
</template>
