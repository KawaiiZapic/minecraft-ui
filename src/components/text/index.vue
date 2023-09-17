<template>
        <span class="m-text">
            <span class="m-text__inner">{{ text }}</span>
            <span class="m-text__letter" v-for="(t,i) in words" :key="i" :style="{
                '--y': t[1],
                '--x': t[2],
                '--w': t[4] + 'px'
            }" :class="{
                'ascii': t[3],
                [t[0]]: true
            }"></span>
        </span>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { initTextTextures } from '.';

initTextTextures();
defineOptions({
    name: "m-text"
});

const slots = useSlots();

const props = defineProps<{
    unicode?: boolean
}>();

let crop_map: number[] = [
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
    0
];

const text = computed(() => {
    const textSlot = slots?.default?.()?.[0];
    if (!textSlot) return "";
    const text = textSlot?.children;
    if (typeof text != "string") {
        throw Error("MText does not support any element rather than text!");
    };
    return text;
});

const words = computed(() => {
    const textStr = text.value;
    const r: any[][] = [];
    for (let i = 0; i < textStr.length; i++) {
        const code = textStr.charCodeAt(i);
        if (code === 32) {
            r.push(['','','', !props.unicode, 8, ' ']);
        } else if (!props.unicode && code < 256) {
            r.push([
                `ascii`,
                Math.floor(code / 16),
                code % 16, true,
                crop_map[code] * 2,
                textStr.charAt(i)
            ]);
        }else {
            r.push([
                `unicode-${Math.floor(code / 256).toString(16).padStart(2, '0')}`, 
                Math.floor(code % 256 / 16), 
                code % 256 % 16, false,
                16,
                textStr.charAt(i)
            ]);
        }
    }
    return r;
});
</script>
<style>
.m-text {
    all: initial;
    user-select: none;

    font-size: 0;
    overflow: hidden;
}

.m-text__letter {
    width: var(--w);
    height: 16px;
    line-height: 16px;
    display: inline-block;
    filter: drop-shadow(1px 1px #3f3f3f);

    background-image: var(--bg);
    background-size: 256px 256px;
    background-position-x: calc(var(--x) * -16px);
    background-position-y: calc(var(--y) * -16px);

    image-rendering: pixelated;
    margin-right: 2px;

}

.m-text__letter.ascii {
    filter: drop-shadow(2px 2px #3f3f3f);
    background-image: url(/textures/font/ascii.png);
}
</style>