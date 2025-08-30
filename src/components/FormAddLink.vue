<script lang="ts" setup>
import { ref } from 'vue'

import ButtonBase from '@/components/element/ButtonBase.vue'
import InputBase from '@/components/element/InputBase.vue'

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
      <div class="form__row-title">
        Ссылка
      </div>
      <InputBase v-model.trim="link" class="link" />
    </div>
    <div class="form__row">
      <div class="form__row-title">
        Заголовок
      </div>
      <InputBase v-model.trim="title" class="title" />
    </div>
    <div class="form__row">
      <ButtonBase type="submit">
        Добавить
      </ButtonBase>
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
