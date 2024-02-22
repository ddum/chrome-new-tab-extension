<template>
  <input :type="type" class="input" :placeholder="props.placeholder" v-model.trim="inputValue" />
</template>

<script lang="ts" setup>
interface Props {
  type?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: ''
})

const inputValue = defineModel<string>({ type: String })
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
