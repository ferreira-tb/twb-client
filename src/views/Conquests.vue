<script setup lang='ts'>
import { world as worldKey, type WorldKey } from '@/common/keys.js';
import { inject, ref } from 'vue';
import ConquestsTable from '@/components/ConquestsTable.vue';

const { world } = inject(worldKey) as WorldKey;

const lastConquests = ref<ConquerInfo[] | null>(null);
const isLoading = ref<boolean>(true);
(async () => {
    const response = await fetch(`/api/interface/${world.value}/get_conquer`);
    const conquests = await response.json() as ConquerInfo[] | null;

    lastConquests.value = conquests;
    isLoading.value = false;
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