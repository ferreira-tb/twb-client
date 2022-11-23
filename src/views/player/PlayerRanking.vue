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
    <div>
        <table v-if="playerRanking">
            <tr>
                <th>Rank</th>
                <th>Nome</th>
                <th>Tribo</th>
                <th>Pontos</th>
                <th>Aldeias</th>
                <th>Média por aldeia</th>
            </tr>
            <PlayerRankingTable :players="playerRanking"/>
        </table>
        <p class="italic" v-else-if="isLoading">Carregando...</p>
        <p class="italic" v-else>Nenhum jogador foi encontrado.</p>
    </div>
</template>

<style scoped>
div {
    margin-top: 5px;
    text-align: center;
}

table {
    width: 100%;
}

th {
    font-weight: bold;
}
</style>