<template>
    <button class="m-button">
        <slot />
    </button>
</template>
<script setup lang="ts">
import { initButtonTextures } from ".";

defineOptions({
    name: "m-button"
});

initButtonTextures();
</script>
<script lang="ts">
</script>
<style scoped>
.m-button {
    all: initial;

    image-rendering: pixelated;
    background-image: var(--texture-button-left), var(--texture-button-right), var(--texture-button-center);
    background-size: contain, contain, auto 100%;
    background-repeat: no-repeat, no-repeat, repeat-x;
    background-position: left, right, center;
    height: 40px;
    padding: 0 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
}
button:hover {
  background-image: var(--texture-button-hover-left), var(--texture-button-hover-right), var(--texture-button-hover-center);
}
</style>