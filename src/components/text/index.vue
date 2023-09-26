<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useSlots } from 'vue'
import { initTextTextures } from '.'

defineOptions({
  name: 'MText',
})
const props = defineProps<{
  unicode?: boolean
  selectable?: boolean
}>()
initTextTextures()
const slots = useSlots()

const crop_map: number[] = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  4,
  1,
  3,
  5,
  5,
  5,
  5,
  1,
  3,
  3,
  3,
  5,
  1,
  5,
  1,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  1,
  1,
  4,
  5,
  4,
  5,
  6,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  3,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  3,
  5,
  3,
  5,
  5,
  2,
  5,
  5,
  5,
  5,
  5,
  4,
  5,
  5,
  1,
  5,
  4,
  2,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  3,
  5,
  5,
  5,
  5,
  5,
  5,
  3,
  1,
  3,
  6,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  0,
  0,
  5,
  0,
  0,
  0,
  0,
  0,
  0,
  4,
  4,
  0,
  0,
  5,
  0,
  0,
  0,
  6,
  6,
  7,
  8,
  8,
  5,
  5,
  5,
  7,
  7,
  5,
  7,
  7,
  7,
  7,
  7,
  5,
  5,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  5,
  8,
  8,
  8,
  4,
  8,
  8,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  7,
  5,
  0,
  6,
  5,
  5,
  5,
  7,
  4,
  5,
  6,
  4,
  5,
  0,
  6,
  4,
  4,
  5,
  0,
]

const text = computed(() => {
  const textSlot = slots?.default?.()?.[0]
  if (!textSlot)
    return ''
  const text = textSlot?.children
  if (typeof text != 'string')
    throw new Error('MText does not support any element rather than text!')

  return text
})

const words = computed(() => {
  const textStr = text.value
  const r: any[] = []
  for (let i = 0; i < textStr.length; i++) {
    const code = textStr.charCodeAt(i)
    if (code === 32) {
      r.push({
        y: 0,
        x: 0,
        w: 8,
        page: 'space',
        t: ' ',
      })
    }
    else if (!props.unicode && code < 256) {
      r.push({
        x: code % 16,
        y: Math.floor(code / 16),
        w: crop_map[code] * 2,
        page: 'ascii',
        t: textStr.charAt(i),
      })
    }
    else {
      r.push({
        x: code % 256 % 16,
        y: Math.floor(code % 256 / 16),
        w: 16,
        page: `unicode-${Math.floor(code / 256).toString(16).padStart(2, '0')}`,
        t: textStr.charAt(i),
      })
    }
  }
  return r
})

const letters = ref<HTMLSpanElement[]>([])
const textWrapper = ref()

const controller = new AbortController()
document.addEventListener('selectionchange', () => {
  if (props.selectable !== true)
    return
  const sel = window.getSelection()
  if (!sel || !textWrapper.value)
    return
  if (!sel.containsNode(textWrapper.value, true))
    return
  letters.value.forEach((v) => {
    if (sel.type !== 'Caret' && sel.containsNode(v, true))
      v.classList.add('selected')
    else
      v.classList.remove('selected')
  })
}, {
  passive: true,
  signal: controller.signal,
})
onBeforeUnmount(() => {
  controller.abort()
})
</script>

<template>
  <span
    ref="textWrapper" class="m-text" :class="{
      'm-text__selectable': props.selectable,
    }"
  >
    <span
      v-for="(t, i) in words" ref="letters" :key="i" class="m-text__letter" :style="{
        '--y': t.y,
        '--x': t.x,
        '--w': `${t.w}px`,
      }" :class="[t.page]"
    >
      {{ t.t }}
    </span>
  </span>
</template>

<style>
.m-text {
    all: initial;
    overflow: hidden;
    user-select: none;

    line-height: 0;
}

.m-text.m-text__selectable {
    user-select: initial;
    cursor: text;
}

.m-text__letter::selection {
    color: transparent;
    background: transparent;
}

.m-text__letter {
    width: var(--w);
    height: 16px;
    line-height: 0;
    display: inline-block;
    image-rendering: pixelated;
    color: transparent;

    padding: 3px 1px;
    position: relative;
}

.m-text__letter.space {
    white-space: pre;
}

.m-text__letter::before {
    position: absolute;
    top: 3px;
    left: 1px;
    content: '';
    color: transparent;
    width: var(--w);
    overflow: hidden;
    height: 16px;
    line-height: 16px;
    display: block;
    filter: drop-shadow(1px 1px #3f3f3f);

    background-image: var(--bg);
    background-size: 256px 256px;
    background-position-x: calc(var(--x) * -16px);
    background-position-y: calc(var(--y) * -16px);

    pointer-events: none;
}

.selected {
    background-color: white;
}

.selected.m-text__letter::before {
    filter: invert(86%) sepia(100%) saturate(6666%) hue-rotate(247deg) brightness(96%) contrast(112%) drop-shadow(1px 1px #c8c8ff);
}

.selected.m-text__letter.ascii::before {
    filter: invert(86%) sepia(100%) saturate(6666%) hue-rotate(247deg) brightness(96%) contrast(112%) drop-shadow(2px 2px #c8c8ff);
}

.m-text__letter.ascii::before {
    filter: drop-shadow(2px 2px #3f3f3f);
    background-image: url(/textures/font/ascii.png);
}
</style>
