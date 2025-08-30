<script lang="ts" setup>
import { ref } from 'vue'

import ButtonBase from '@/components/element/ButtonBase.vue'
import InputBase from '@/components/element/InputBase.vue'

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
    <ButtonBase type="submit" class="form__button">
      Добавить
    </ButtonBase>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  align-items: center;
}
.form__button {
  margin-left: 15px;
}
</style>
