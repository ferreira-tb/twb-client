<script setup lang='ts'>
import { ref } from 'vue';

const props = defineProps<{
    world: string
    id: string
}>();

const ally = ref<AllyInfo | null>(null);
(async () => {
    const response = await fetch(`/api/query/${props.world}/ally/${props.id}`);
    if (response.status === 404) return;
    ally.value = await response.json() as AllyInfo | null;

    console.log(ally.value);
})();
</script>

<template>

</template>

<style scoped>

</style>