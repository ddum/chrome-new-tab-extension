<template>
  <form class="form" @submit.prevent="addTag">
    <InputBase placeholder="Тег изображения" v-model="tagInput" />
    <ButtonBase type="submit" class="form__button">Добавить</ButtonBase>
  </form>
  <div class="tags">
    <TagBase
      v-for="(tag, index) in appStore.backgroundTags"
      :key="tag"
      @delete="deleteTag(index)"
      >{{ tag }}</TagBase
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores'

import InputBase from '@/components/element/InputBase.vue'
import ButtonBase from '@/components/element/ButtonBase.vue'
import TagBase from '@/components/element/TagBase.vue'

const tagInput = ref('')

const appStore = useAppStore()
function addTag() {
  if (tagInput.value !== '' && !appStore.backgroundTags.includes(tagInput.value)) {
    appStore.setBackgroundTags([...appStore.backgroundTags, tagInput.value])
  }
  tagInput.value = ''
}
function deleteTag(index: number) {
  appStore.setBackgroundTags(appStore.backgroundTags.filter((_, i) => i !== index))
}
</script>

<style scoped>
.form {
  display: flex;
  align-items: center;
}
.form__button {
  margin-left: 15px;
}
.tags {
  margin-top: 15px;
}
</style>
