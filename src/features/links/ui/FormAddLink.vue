<script lang="ts" setup>
import { ref } from 'vue'

import { Button } from '@/shared/ui/button'
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
  <form class="form" @submit.prevent="submitHandler">
    <div class="form__row">
      <label class="form__row-title" for="add-link-url">
        Ссылка
      </label>
      <Input id="add-link-url" v-model.trim="link" />
    </div>
    <div class="form__row">
      <label class="form__row-title" for="add-link-title">
        Заголовок
      </label>
      <Input id="add-link-title" v-model.trim="title" />
    </div>
    <div class="form__row">
      <Button type="submit" size="sm">
        Добавить
      </Button>
    </div>
  </form>
</template>

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
</style>
