<script lang="ts" setup>
import { ref } from 'vue'

import { Button } from '@/shared/ui/button'
import InputBase from '@/shared/ui/InputBase.vue'

const emit = defineEmits<{
  submit: [value: string]
}>()

const tagInput = ref('')

function submitHandler() {
  if (tagInput.value !== '') {
    emit('submit', tagInput.value)
    tagInput.value = ''
  }
}
</script>

<template>
  <form class="form" @submit.prevent="submitHandler">
    <InputBase v-model.trim="tagInput" placeholder="Тег изображения" />
    <Button type="submit" size="sm">
      Добавить
    </Button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  align-items: center;
  gap: 15px;
}
</style>
