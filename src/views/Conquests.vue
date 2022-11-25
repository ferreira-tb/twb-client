<script setup lang='ts'>
import { inject, ref } from 'vue';
import * as keys from '@/common/keys.js';
import ConquestsTable from '@/components/ConquestsTable.vue';

const { world } = inject(keys.world) as keys.WorldKey;
const badStatus = inject(keys.badStatus) as Readonly<Set<number>>;

const lastConquests = ref<ConquerInfo[] | null>(null);
const isLoading = ref<boolean>(true);
(async () => {
    try {
        const response = await fetch(`/api/interface/${world.value}/get_conquer`);
        if (badStatus.has(response.status)) return;

        const conquests = await response.json() as ConquerInfo[];
        lastConquests.value = conquests;

    } catch (err) {
        if (err instanceof Error) throw err;

    } finally {
        isLoading.value = false;
    };
})();
</script>

<template>
    <div class="conquests-container">
        <template v-if="lastConquests">
            <ConquestsTable :conquests="lastConquests"/>
        </template>
        
        <p class="italic" v-else-if="isLoading">Carregando...</p>
        <p class="italic" v-else>Nenhuma conquista registrada.</p>
    </div>
</template>

<style scoped>
.conquests-container {
    margin-top: 0.5em;
    text-align: center;
}
</style>