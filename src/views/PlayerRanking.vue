<script setup lang='ts'>
import { inject, ref } from 'vue';
import * as keys from '@/common/keys.js';
import PlayerRankingTable from '@/components/PlayerRankingTable.vue';

const { world } = inject(keys.world) as keys.WorldKey;
const badStatus = inject(keys.badStatus) as Readonly<Set<number>>;

const playerRanking = ref<PlayerInfo[] | null>(null);
const isLoading = ref<boolean>(true);
(async () => {
    try {
        const response = await fetch(`/api/query/${world.value}/player`);
        if (badStatus.has(response.status)) return;

        const players = await response.json() as PlayerInfo[];
        playerRanking.value = players;

    } catch (err) {
        if (err instanceof Error) throw err;
    
    } finally {
        isLoading.value = false;
    };
})();
</script>

<template>
    <div class="ranking-container">
        <table v-if="playerRanking" class="ranking-table">
            <thead class="sticky-table-header">
                <tr>
                    <th>Rank</th>
                    <th>Nome</th>
                    <th>Tribo</th>
                    <th>Pontos</th>
                    <th>Aldeias</th>
                    <th>Média por aldeia</th>
                </tr>
            </thead>
            <tbody>
                <PlayerRankingTable :players="playerRanking"/>
            </tbody>
        </table>
        <p class="italic" v-else-if="isLoading">Carregando...</p>
        <p class="italic" v-else>Nenhum jogador foi encontrado.</p>
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