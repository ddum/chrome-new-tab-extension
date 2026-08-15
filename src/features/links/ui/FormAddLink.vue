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
      <Field>
        <FieldLabel for="add-link-url">
          Ссылка
        </FieldLabel>
        <Input id="add-link-url" v-model.trim="link" />
      </Field>
      <Field>
        <FieldLabel for="add-link-title">
          Заголовок
        </FieldLabel>
        <Input id="add-link-title" v-model.trim="title" />
      </Field>
      <Field>
        <Button type="submit" size="sm">
          Добавить
        </Button>
      </Field>
    </FieldGroup>
  </form>
</template>
