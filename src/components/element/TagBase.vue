<template>
  <div class="tag">
    <span><slot /></span>
    <button class="tag__button" v-if="props.deleteButton" @click="emit('delete')">
      <IconBase size="s4">
        <IconClose fill="red" />
      </IconBase>
    </button>
  </div>
</template>

<script lang="ts" setup>
import IconBase from '@/components/element/IconBase.vue'
import IconClose from '@/assets/img/icons/close.svg?component'

interface Props {
  deleteButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  deleteButton: true
})

const emit = defineEmits<{
  delete: []
}>()
</script>

<style scoped>
.tag {
  background-color: var(--element-tag--bg-color);
  border-color: var(--element-tag--border-color);
  color: var(--element-tag--text-color);

  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  height: 24px;
  padding: 0 9px;
  font-size: var(--element-font-size);
  line-height: 0;
  border-width: 1px;
  border-style: solid;
  border-radius: var(--element-tag-border-radius);
  box-sizing: border-box;
  white-space: nowrap;
  margin-right: 8px;
  margin-top: 8px;
}

.tag__button {
  height: 14px;
  width: 14px;
  padding: 2px;
  background-color: var(--element-tag--text-color);
  border-radius: 50%;
  border: 0;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
