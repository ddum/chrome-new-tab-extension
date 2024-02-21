<template>
  <input :type="type" class="input" :placeholder="props.placeholder" v-model.trim="inputValue" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
interface Props {
  modelValue?: string
  type?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: ''
})
const emit = defineEmits<{
  (e: 'update:model-value', value: string): void
}>()

const inputValue = ref('')

watch(inputValue, () => {
  emit('update:model-value', inputValue.value)
})
watch(
  () => props.modelValue,
  () => {
    inputValue.value = props.modelValue
  },
  {
    immediate: true
  }
)
</script>

<style scoped>
.input {
  border-radius: var(--element-border-radius);
  padding: var(--element-padding);

  border: 1px solid var(--element-input-border-color);
  font-size: var(--element-font-size);
  line-height: 1;
  width: 100%;
  height: 32px;
}
</style>
