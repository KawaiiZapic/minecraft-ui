<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({
  name: 'MInput',
});

const InputRef = ref<HTMLInputElement>();

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
});

const coContent = ref("");

const focusToInput = () => {
  InputRef.value!.focus();
}

let isCompositing = false;

const handleInput = () => {
  if (isCompositing) return;
  v.value += InputRef.value!.value;
  InputRef.value!.value = "";
}

const handleCoEnd = () => {
  isCompositing = false;
  v.value += InputRef.value!.value;
  InputRef.value!.value = "";
  coContent.value = "";
}

const handleCoUpdate = (e: CompositionEvent) => {
  coContent.value = e.data;
}

const handleCoStart = () => {
  isCompositing = true;
}

const handleKeyPress: HTMLInputElement["onkeydown"] = (e) => {
  if (e.key === "Backspace") {
    v.value = v.value.substring(0, v.value.length - 1);
  }
}

</script>

<template>
  <div class="m-input" @click="focusToInput">
    <m-text class="m-input__text-renderer" selectable>{{ v }}</m-text>
    <m-text class="m-input__text-renderer" selectable>{{ coContent }}</m-text>
    <input ref="InputRef" @input="handleInput" @compositionstart="handleCoStart" @compositionend="handleCoEnd" @compositionupdate="handleCoUpdate" @keydown="handleKeyPress" />
  </div>
</template>

<style scoped>
.m-input {
  background: black;
  outline: none;
  color: transparent;
  border: 2px white solid;
  height: 36px;
  font-size: 18px;
  padding: 5px 4px;
  box-sizing: border-box;

  font-family: monospace;
}

.m-input__text-renderer {
  pointer-events: none;
  line-height: 1rem;
}

input {
  display: inline-block;
  width: 8px;
  height: 0px;
  outline: none;
  border: none;
  background-color: transparent;
  color: transparent;
  user-select: none;
  margin-left: 1px;
  transform: translateY(3px);
}

input:focus {
  border-bottom: white 2px solid;
  animation: cursor-blinking 1s steps(1) infinite;
}

@keyframes cursor-blinking {
  0% {
    border-bottom-color: white;
  }
  50% {
    border-bottom-color: transparent;
  }
  100% {
    border-bottom-color: white;
  }
}
</style>
