<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'MProvider',
})
const props = withDefaults(defineProps<{
  zoom: number
}>(), {
  zoom: 1,
})

const computedZoom = computed(() => {
  return (1 / window.devicePixelRatio) * props.zoom
})
</script>

<template>
  <div
    :style="{
      zoom: computedZoom,
    }"
  >
    <slot />
  </div>
</template>
