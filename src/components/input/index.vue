<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'MInput',
})

const props = defineProps<{
  modelValue: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', v: string): void
}>()

const v = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits('update:modelValue', v)
  },
})
</script>

<template>
  <div class="m-input">
    <input v-model="v">
  </div>
</template>
