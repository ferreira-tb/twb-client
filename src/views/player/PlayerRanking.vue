<script setup lang='ts'>
import { world as worldKey, type WorldKey } from '@/keys';
import { inject, ref } from 'vue';
import PlayerRankingTable from '@/components/player/PlayerRankingTable.vue';

const { world } = inject(worldKey) as WorldKey;

const playerRanking = ref<PlayerInfo[] | null>(null);
const isLoading = ref<boolean>(true);
(async () => {
    const response = await fetch(`/api/query/${world.value}/player`);
    const players = await response.json() as PlayerInfo[] | null;

    playerRanking.value = players;
    isLoading.value = false;
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