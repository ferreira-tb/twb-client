<script setup lang='ts'>
import { inject, ref } from 'vue';
import * as keys from '@/common/keys.js';
import AllyRankingTable from '@/components/AllyRankingTable.vue';

const { world } = inject(keys.world) as keys.WorldKey;
const badStatus = inject(keys.badStatus) as Readonly<Set<number>>;

const allyRanking = ref<AllyInfo[] | null>(null);
const isLoading = ref<boolean>(true);
(async () => {
    try {
        const response = await fetch(`/api/query/${world.value}/ally`);
        if (badStatus.has(response.status)) return;

        const allies = await response.json() as AllyInfo[];
        allyRanking.value = allies;

    } catch (err) {
        if (err instanceof Error) throw err;
    
    } finally {
        isLoading.value = false;
    };
})();
</script>

<template>
    <div class="ranking-container">
        <table v-if="allyRanking" class="ranking-table">
            <thead class="sticky-table-header">
                <tr>
                    <th>Rank</th>
                    <th>Nome</th>
                    <th>Pontos</th>
                    <th>Pontos totais</th>
                    <th>Membros</th>
                    <th>Média por membro</th>
                    <th>Aldeias</th>
                    <th>Média por aldeia</th>
                </tr>
            </thead>
            <tbody>
                <AllyRankingTable :allies="allyRanking"/>
            </tbody>
        </table>
        <p class="italic" v-else-if="isLoading">Carregando...</p>
        <p class="italic" v-else>Nenhuma tribo foi encontrada.</p>
    </div>
</template>

<style scoped>
.ranking-container {
    margin-top: 0.5em;
    text-align: center;
}

.ranking-table {
    width: 100%;
    margin-bottom: 2em;
}
</style>