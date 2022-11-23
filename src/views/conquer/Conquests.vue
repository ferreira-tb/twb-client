<script setup lang='ts'>
import { world as worldKey, type WorldKey } from '@/keys';
import { inject, ref } from 'vue';
import ConquestsTable from '@/components/conquer/ConquestsTable.vue';

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
        <table v-if="lastConquests" class="conquests-table">
            <thead class="sticky-table-header">
                <tr>
                    <th>Hora</th>
                    <th>Aldeia</th>
                    <th>Pontos</th>
                    <th>Proprietário anterior</th>
                    <th>Novo proprietário</th>
                </tr>
            </thead>
            <tbody>
                <ConquestsTable :conquests="lastConquests"/>
            </tbody>
        </table>
        <p class="italic" v-else-if="isLoading">Carregando...</p>
        <p class="italic" v-else>Nenhuma conquista registrada.</p>
    </div>
</template>

<style scoped>
.conquests-container {
    margin-top: 0.5em;
    text-align: center;
}

.conquests-table {
    width: 100%;
    margin-bottom: 2em;
}
</style>