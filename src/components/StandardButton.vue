<script setup lang='ts'>
const props = defineProps<{
    text: string
}>();
</script>

<template>
    <button class="standard-button">{{ props.text }}</button>
</template>

<style scoped>
.standard-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    font-weight: 500;

    border-color: var(--sec-color-darker);
    border-width: 2px;
    border-radius: 2px;

    margin: 0.3em;
    padding: 0.3em;
    min-width: fit-content;

    background-color: var(--sec-color);
    color: var(--main-bg-color);
    transition: 200ms all ease-in-out;
}

.standard-button:hover, .standard-button:active {
    background-color: var(--sec-color-lighter);
}
</style>